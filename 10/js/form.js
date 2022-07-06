import {OBJECT_TYPES} from './data.js';

const formInfo = document.querySelector('.ad-form');
const formFieldsets = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');

const disableForm = () => {
  if (!formInfo.classList.contains('ad-form--disabled')) {
    formInfo.classList.add('ad-form--disabled');
  }
  mapFilters.classList.toggle('map__filters--disabled');
  mapFilters.querySelectorAll('select').forEach((item) => { item.disabled = true; });
  mapFilters.querySelector('fieldset').disabled = true;
  formFieldsets.forEach((item) => { item.disabled = true; });
};

const enableForm = () => {
  if (formInfo.classList.contains('ad-form--disabled')) {
    formInfo.classList.remove('ad-form--disabled');
  }
  mapFilters.classList.toggle('map__filters--disabled');
  mapFilters.querySelectorAll('select').forEach((item) => { item.disabled = false; });
  mapFilters.querySelector('fieldset').disabled = false;
  formFieldsets.forEach((item) => { item.disabled = false; });
};

const formData = {
  title: {
    min: 30,
    max: 100
  },
  price: {
    min: 0,
    max: 100000
  },
  rooms: {
    1: [1],
    2: [2, 1],
    3: [3, 2, 1],
    100: [0]
  }
};

const pristine = new Pristine(formInfo, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

// Валидация заголовка
const validateFormTitle = (value) => value.length >= formData.title.min && value.length <= formData.title.max;
const validateFormTitleMessage = (value) => value.length === 0 ? 'Поле обязательно для заполнения' : `От ${formData.title.min} до ${formData.title.max} символов`;

const formInfoTitle = document.querySelector('#title');
pristine.addValidator(formInfoTitle, validateFormTitle, validateFormTitleMessage);

// Валидация цены
const validateFormPrice = (value) => value.length !== 0 && value >= OBJECT_TYPES[formInfo.querySelector('#type option:checked').value].minPrice && value <= formData.price.max;

const validateFormPriceMessage = (value) => {
  const actualMinPrice = OBJECT_TYPES[formInfo.querySelector('#type option:checked').value].minPrice;

  if (value.length === 0) {
    return 'Поле обязательно для заполнения';
  } else if (value <= actualMinPrice) {
    return `Минимальное значение ${actualMinPrice}`;
  }

  return `Максимальное значение ${formData.price.max}`;
};

const formInfoPrice = document.querySelector('#price');
pristine.addValidator(formInfoPrice, validateFormPrice, validateFormPriceMessage);


// Синхронизация плейсхолдера с ценой
const typeChangeHandler = (evt) => {
  formInfoPrice.placeholder = OBJECT_TYPES[evt.target.querySelector('option:checked').value].minPrice;
};

formInfo.querySelector('[name="type"]').addEventListener('change', typeChangeHandler);

// Синхронизация количества комнат и количество мест
const roomNumber = formInfo.querySelector('#room_number');
const roomsAmountHandler = (evt) => {
  const roomsArray = formData.rooms[evt.target.value];
  const optionsCapacity = formInfo.querySelectorAll('[name="capacity"] option');

  optionsCapacity.forEach((item) => {
    item.disabled = false;
    item.selected = true;

    if (!roomsArray.includes(parseInt(item.value, 10))) {
      item.disabled = true;
      item.selected = false;
    }
  });
};

roomNumber.addEventListener('change', roomsAmountHandler);

// Синхронизация времени заезда и выезда
const timeIn = formInfo.querySelector('#timein');
const timeOut = formInfo.querySelector('#timeout');

const timeInHandler = () => {
  timeOut.value = timeIn.value;
};

timeIn.addEventListener('change', timeInHandler);

const timeOutHandler = () => {
  timeIn.value = timeOut.value;
};

timeOut.addEventListener('change', timeOutHandler);

formInfo.addEventListener('submit', () => {
  pristine.validate();
});

export {disableForm, enableForm, validateFormPrice};
