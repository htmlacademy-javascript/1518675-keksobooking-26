import {OBJECT_TYPES} from './data.js';
import {createMarker, markerGroup} from './map.js';

const createCards = (cards) => {
  const cardTemplate = document.querySelector('#card').content;
  const mapCanvas = document.querySelector('#map-canvas');
  const cardListFragment = document.createDocumentFragment();

  cards.forEach(({author, offer}) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽ / ночь`;
    cardElement.querySelector('.popup__type').textContent = OBJECT_TYPES[offer.type].name;
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    cardElement.querySelector('.popup__description').textContent = offer.description;
    cardElement.querySelector('.popup__avatar').src = author.avatar;

    const featuresContainer = cardElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';
    offer.features.forEach((feature) => {
      featuresContainer.innerHTML += `<li class="popup__feature popup__feature--${feature}"></li>`;
    });

    const photosContainer = cardElement.querySelector('.popup__photos');
    photosContainer.innerHTML = '';
    offer.photos.forEach((photo) => {
      photosContainer.innerHTML += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    });

    cardListFragment.appendChild(cardElement);
  });

  mapCanvas.appendChild(cardListFragment);
};


// Код фильтра
const setUserFormFilter = (cb) => {
  const filterMap = document.querySelector('.map__filters');
  filterMap.addEventListener('change', function() {
    markerGroup.clearLayers();

    cb();
  });
};

const priceFormRange = {
  any: { start: 0, end: 50000000 },
  middle: { start: 10000, end: 50000 },
  low: { start: 0, end: 10000 },
  high: { start: 50000, end: 50000000 }
};

const filterType = (object) => {
  const type = document.querySelector('#housing-type').value;
  return object.offer.type === type || type === 'any';
};

const filterPrice = (object) => {
  const price = document.querySelector('#housing-price').value;
  return object.offer.price <= priceFormRange[price].start && object.offer.price >= priceFormRange[price].end;
};

const filterObjects = (objects) => {

  const filteredObjects = [];

  console.log('Объекты, приходящие в filterObjects:');
  console.log(objects);

  const copy = objects.slice();

  for (let i = 0; i <= copy.length; i++) {

    if (filteredObjects.length < LIMIT_OF_OBJECTS) {
      if (filterType(copy[i])) {
        filteredObjects.push(copy[i]);
      }
    }
  }

  console.log('Отфильтрованные объекты:');
  console.log(filteredObjects);

  return filteredObjects;
}


const LIMIT_OF_OBJECTS = 15;


// Код генерации элементов
const generateObjects = (objects) => {

  const filteredObjects = filterObjects(objects);


  filteredObjects.forEach((object) => {
    createMarker(object);
  });
};


const generatedFilteredObjects = (objects) => {
  setUserFormFilter(() => generateObjects(objects));


};


export {createCards, generateObjects};
