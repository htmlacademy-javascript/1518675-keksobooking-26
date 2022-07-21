const ERROR_SHOW_TIME = 5000;

const hideSendDataError = () => {
  document.querySelector('.error').remove();
};

const hideSendDataErrorHandler = (evt) => {
  if (evt.type === 'keydown' && evt.key !== 'Escape') {
    return;
  }

  hideSendDataError();

  window.removeEventListener('keydown', hideSendDataErrorHandler);
};

const showSendDataError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);
  document.body.appendChild(errorElement);

  window.addEventListener('keydown', hideSendDataErrorHandler);
  errorElement.addEventListener('click', hideSendDataErrorHandler);
};

const showGetDataError = (message) => {
  const promoContainer = document.querySelector('.promo');
  const errorElement = document.createElement('div');
  errorElement.textContent = `${message}`;
  errorElement.style = 'position: absolute; top: 0; color: darkred; text-decoration: underline; font-weight: 600; font-size: 22px;';
  promoContainer.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, ERROR_SHOW_TIME);
};

export {showSendDataError, showGetDataError};
