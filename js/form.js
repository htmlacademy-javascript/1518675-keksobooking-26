import {makeRequest} from './api.js';
import {showSendDataError} from './errors.js';

const MAX_PRICE = 6000000;
const SUCCESS_SHOW_TIME = 5000;

const OBJECT_TYPES = {
  palace: {
    name: 'Дворец',
    minPrice: 10000
  },
  house: {
    name: 'Дом',
    minPrice: 5000
  },
  flat: {
    name: 'Квартира',
    minPrice: 1000
  },
  bungalow: {
    name: 'Бунгало',
    minPrice: 0
  },
  hotel: {
    name: 'Отель',
    minPrice: 3000
  }
};

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

// Функция возврата полей формы в первоначальное состояние
const resetForm = () => {
  formInfo.reset();
};

document.querySelector('.ad-form-header__info').addEventListener('click', resetForm);

// Функция разблокирует кнопку отправки
const unblockSubmitButton = () => {
  const button = document.querySelector('.ad-form__submit');
  button.disabled = false;
  button.style.color = 'black';
  button.style.pointerEvents = 'auto';
  button.textContent = 'Опубликовать';
};

// Функция блокирует кнопку отправки
const blockSubmitButton = () => {
  const button = document.querySelector('.ad-form__submit');
  button.disabled = true;
  button.style.pointerEvents = 'none';
  button.style.color = 'grey';
  button.textContent = 'Выполнение...';

  setTimeout(() => {
    unblockSubmitButton();
  }, SUCCESS_SHOW_TIME);
};

// Функции показа успешной отправки формы
const showSendDataSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);
  document.body.appendChild(successElement);

  setTimeout(() => {
    successElement.remove();
  }, SUCCESS_SHOW_TIME);
};

// Функция отправки формы пользователя
const setUserFormSubmit = (onSuccess) => {
  formInfo.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      blockSubmitButton();
      makeRequest(
        () => {
          blockSubmitButton();
          resetForm();
          onSuccess();
        },
        () => {
          showSendDataError();
          unblockSubmitButton();
        },
        'POST',
        new FormData(evt.target),
      );
    }
  });
};

export {MAX_PRICE, OBJECT_TYPES, disableForm, enableForm, validateFormPrice, setUserFormSubmit, resetForm, showSendDataSuccess};
