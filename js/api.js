import {enableForm, disableForm} from './form.js';

const Urls = {
  GET: 'https://26.javascript.pages.academy/keksobooking/data',
  POST: 'https://26.javascript.pages.academy/keksobooking',
};

const makeRequest = (onSuccess, onError, method, body) => {
  fetch(
    Urls[method],
    {
      method: method,
      body: body,
    },
  )
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
      enableForm();
    })
    .catch(() => {
      disableForm();
      onError('Проблема при загрузке с сервера');
    });
};

export {makeRequest, Urls};
