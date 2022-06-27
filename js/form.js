const formInfo = document.querySelector('.ad-form');
const formFieldsets = document.querySelectorAll('.ad-form fieldset');
const mapFilters = document.querySelector('.map__filters');

const disableForm = () => {
  formInfo.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  mapFilters.querySelectorAll('select').forEach((item) => { item.disabled = true; });
  mapFilters.querySelector('fieldset').disabled = true;
  formFieldsets.forEach((item) => { item.disabled = true; });
};

const enableForm = () => {
  formInfo.classList.toggle('ad-form--disabled');
  mapFilters.classList.toggle('map__filters--disabled');
  mapFilters.querySelectorAll('select').forEach((item) => { item.disabled = false; });
  mapFilters.querySelector('fieldset').disabled = false;
  formFieldsets.forEach((item) => { item.disabled = false; });
};

export {disableForm, enableForm};
