// Константы
const OBJECT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_TIME = ['12:00', '13:00', '14:00'];
const CHECK_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const MAX_PRICE = 6000000;
const lat = { MIN: 35.65000, MAX: 35.70000 };
const lng = { MIN: 139.70000, MAX: 139.80000 };
const DIGITS_COORDINATE = 5;
const OBJECTS_AMOUNT = 10;

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

// Функция генерирует объект с описанием авторов
let i = 0;
const generateAuthorObj = () => {
  i++;
  return {
    avatar: `img/avatars/user${(i < OBJECTS_AMOUNT) ? `0${i}` : i}.png`
  };
};

// Функция генерирует объект с информацией об объявлениях
const generateOfferObj = () => ({
  title: 'Кликбейт заголовок',
  address: `${getRandomCoordinate(lat, DIGITS_COORDINATE)}, ${getRandomCoordinate(lng, DIGITS_COORDINATE)}`,
  price: getRandomPositiveFloat(0, MAX_PRICE, 0),
  type: getRandomArrayElement(OBJECT_TYPES),
  rooms: getRandomPositiveFloat(0, 6, 0),
  guests: getRandomPositiveFloat(0, 25, 0),
  checkin: getRandomArrayElement(CHECK_IN_TIME),
  checkout: getRandomArrayElement(CHECK_OUT_TIME),
  features: FEATURES.slice(getRandomPositiveFloat(0, FEATURES.length - 1, 0)).sort(() => Math.random() - 0.5),
  description: 'Супер крутое жильё',
  photos: ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg']
});

// Функция генерирует объект с информацией о местоположении в виде географических координат
const generateLocationObj = () => ({
  lat: getRandomCoordinate(lat, DIGITS_COORDINATE),
  lng: getRandomCoordinate(lng, DIGITS_COORDINATE)
});

const authorsObj = Array.from({length: OBJECTS_AMOUNT}, generateAuthorObj);
const offersObj = Array.from({length: OBJECTS_AMOUNT}, generateOfferObj);
const locationsObj = Array.from({length: OBJECTS_AMOUNT}, generateLocationObj);

console.log(authorsObj); // eslint-disable-line no-console
console.log(offersObj); // eslint-disable-line no-console
console.log(locationsObj); // eslint-disable-line no-console
