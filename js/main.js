// Функция возвращающает случайное число с плавающей точкой из переданного диапазона включительно

const getRandomPositiveFloat = (a, b, digits = 1) => {

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
};

// Функция генерирует объект с описанием авторов
const generateAuthorObj = (obj = {}) => {
  for (let i = 1; i <= 10; i++) {
    obj[i] = {};
    obj[i].avatar = `img/avatars/user${(i < 10) ? `0${i}` : i}.png`;
  }

  return obj;
};

// Функция генерирует объект с информацией об объявлениях
const OBJECT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_IN_TIME = ['12:00', '13:00', '14:00'];
const CHECK_OUT_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const generateOfferObj = (obj = {}) => {
  for (let i = 1; i <= 10; i++) {
    obj[i] = {};
    obj[i].title = 'Кликбейт заголовок';
    obj[i].address = {};
    obj[i].address.location = {};
    obj[i].address.location.lat = '8582162';
    obj[i].address.location.lng = '2186005';
    obj[i].price = getRandomPositiveFloat(0, 20000, 0);
    obj[i].type = OBJECT_TYPES[getRandomPositiveFloat(0, OBJECT_TYPES.length - 1, 0)];
    obj[i].rooms = getRandomPositiveFloat(0, 6, 0);
    obj[i].guests = getRandomPositiveFloat(0, 25, 0);
    obj[i].checkin = CHECK_IN_TIME[getRandomPositiveFloat(0, CHECK_IN_TIME.length - 1, 0)];
    obj[i].checkout = CHECK_OUT_TIME[getRandomPositiveFloat(0, CHECK_OUT_TIME.length - 1, 0)];

    // Клонирование массива, чтобы объекты features были разные в каждой итерации
    const cloneFeatures = Object.assign([], FEATURES);
    obj[i].features = cloneFeatures.sort(() => Math.random() - 0.5);
    obj[i].description = 'Супер крутое жильё. 10/10';
    obj[i].photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
  }

  return obj;
};

// Функция генерирует объект с информации о местоположении в виде географических координат
const generateLocationObj = (obj = {}) => {
  for (let i = 1; i <= 10; i++) {
    obj[i] = {};
    obj[i].lat = `35.${getRandomPositiveFloat(65, 70, 0)}00`;
    obj[i].lng = `139.${getRandomPositiveFloat(70, 80, 0)}00`;
  }

  return obj;
};

const authorObj = generateAuthorObj();
const offerObj = generateOfferObj();
const locationObj = generateLocationObj();

console.log(authorObj); // eslint-disable-line no-console
console.log(offerObj); // eslint-disable-line no-console
console.log(locationObj); // eslint-disable-line no-console
