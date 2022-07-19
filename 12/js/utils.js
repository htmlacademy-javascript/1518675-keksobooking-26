// Функция возвращающает случайное число с плавающей точкой из переданного диапазона включительно
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

// Функция возвращает случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveFloat(0, elements.length - 1, 0)];

// Функция возвращает случайный ключ из объекта
const getRandomObjectKey = (object) => Object.keys(object)[getRandomPositiveFloat(0, Object.keys(object).length - 1, 0)];

// Функция возвращает случайные координаты из заданного диапазона
const getRandomCoordinate = (coordinate, digits) => getRandomPositiveFloat(coordinate.MIN, coordinate.MAX, digits);

export {getRandomPositiveFloat, getRandomArrayElement, getRandomCoordinate, getRandomObjectKey};

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
function debounce (callback, timeoutDelay = 500) {
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
}

// Функция throttle для пропуска кадров
function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getNounPluralForm};
