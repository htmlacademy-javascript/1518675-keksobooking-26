const formInfo = document.querySelector('.ad-form');
const formFieldsets = document.querySelectorAll('.ad-form fieldset');

const disableForm = () => {
  formInfo.classList.toggle('ad-form--disabled');
  formFieldsets.forEach((item) => { item.disabled = true; });
};

const enableForm = () => {
  formInfo.classList.toggle('ad-form--disabled');
  formFieldsets.forEach((item) => { item.disabled = false; });
};

export {disableForm, enableForm};
