const formInfo = document.querySelector('.ad-form');
const formFieldsets = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');

const disableForm = () => {
  formInfo.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  formFieldsets.forEach((item) => { item.disabled = true; });
};

const enableForm = () => {
  formInfo.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  formFieldsets.forEach((item) => { item.disabled = false; });
};

export {disableForm, enableForm};
