import {OBJECT_TYPES} from './form.js';
import {createMarkers, markerGroup} from './map.js';
import {MAX_OBJECTS, filterObjects} from './filter.js';
import {debounce} from './utils.js';

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
const filterMap = document.querySelector('.map__filters');

const debounceFilter = (cb) => {
  debounce(cb, 1000);
};

const filterMapHandler = () => {
  filterMap.addEventListener('change', function() {
    markerGroup.clearLayers();

    createMarkers(filterObjects(objectsData));
  });
};


// Код генерации элементов
let objectsData = [];
const generateObjects = (objects) => {

  objectsData = objects.slice();
  let filteredObjects = objects.slice(0, MAX_OBJECTS);

  createMarkers(filteredObjects);

  filterMap.addEventListener('change', filterMapHandler);
};


export {createCards, generateObjects};
