// Функция возвращает корректную форму множественного числа
const getNounPluralForm = (number, one, two, many) => {
  const mod10 = number % 10;
  const mod100 = number % 100;

  switch (true) {
    case (mod100 >= 11 && mod100 <= 20):
      return many;

    case (mod10 > 5):
      return many;

    case (mod10 === 1):
      return one;

    case (mod10 >= 2 && mod10 <= 4):
      return two;

    default:
      return many;
  }
};

// Функция debounce для устранения дребезга
const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

// Функция обработчика клавиши Escape
const checkNotEsc = (evt) => evt.type === 'keydown' && evt.key !== 'Escape';

export {getNounPluralForm, debounce, checkNotEsc};
