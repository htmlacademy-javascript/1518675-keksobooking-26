const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobooking/dat2a')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Ошибка загрузки данных');
    })
    .then((objects) => {
      onSuccess(objects);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/keksobooking', { method: 'POST', body })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }

      throw new Error('Ошибка отправки данных');
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
