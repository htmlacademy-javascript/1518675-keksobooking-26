// Функция возвращающает случайное число с плавающей точкой из переданного диапазона включительно
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

// Функция возвращает случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveFloat(0, elements.length - 1, 0)];

// Функция возвращает случайные координаты из заданного диапазона
const getRandomCoordinate = (coordinate, digits) => getRandomPositiveFloat(coordinate.MIN, coordinate.MAX, digits);

export {getRandomPositiveFloat, getRandomArrayElement, getRandomCoordinate};
