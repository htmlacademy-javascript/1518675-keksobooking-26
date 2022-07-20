import {OBJECT_TYPES, MAX_PRICE} from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const typeOption = document.querySelector('#type');
const priceInput = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: OBJECT_TYPES[typeOption.value].minPrice,
    max: MAX_PRICE,
  },
  start: 0,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

typeOption.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: OBJECT_TYPES[evt.target.value].minPrice,
      max: MAX_PRICE,
    },
    start: OBJECT_TYPES[evt.target.value].minPrice,
    step: 1,
  });
});
