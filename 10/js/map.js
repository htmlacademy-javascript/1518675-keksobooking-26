import {enableForm} from './form.js';
import {getNounPluralForm} from './utils.js';
import {OBJECT_TYPES} from './data.js';

const CENTER_OF_TOKYO = {
  lat: 35.68950,
  lng: 139.69171,
};

// Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView({
    lat: CENTER_OF_TOKYO.lat,
    lng: CENTER_OF_TOKYO.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Создание кастомных пинов
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon =({
  iconUrl: './img/pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
});

// Добавление главного пина
const marker = L.marker(
  {
    lat: CENTER_OF_TOKYO.lat,
    lng: CENTER_OF_TOKYO.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

marker.addTo(map);

// Функция подставновки координт главного пина в значение input
const fillAddressInput = (obj) => {
  const address = document.querySelector('#address');
  address.value = `${obj.lat}, ${obj.lng}`;
};

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  fillAddressInput(coordinates);
});

// Функция создания разметки из шаблона для всплывающего попапа
const createPopup = ({author, offer}) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__avatar').src = `${author.avatar}`;
  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = `${offer.address}`;
  popup.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  popup.querySelector('.popup__type').textContent = OBJECT_TYPES[offer.type].name;
  popup.querySelector('.popup__text--capacity').textContent = `
    ${offer.rooms} ${getNounPluralForm(offer.rooms, 'комната', 'комнаты', 'комнат')} для
    ${offer.guests} ${getNounPluralForm(offer.guests, 'гостя', 'гостей', 'гостей')}
  `;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainer = popup.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  offer.features.forEach((feature) => {
    featuresContainer.innerHTML += `<li class="popup__feature popup__feature--${feature}"></li>`;
  });

  popup.querySelector('.popup__description').textContent = `${offer.description}`;

  const photosContainer = popup.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  offer.photos.forEach((photo) => {
    photosContainer.innerHTML += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  });

  return popup;
};

const markerGroup = L.layerGroup().addTo(map);

// Функция создания всплывающего попапа
const createMarker = (item) => {
  const {lat, lng} = item.location;

  const markerObj = L.marker(
    {
      lat,
      lng,
    },
    {
      pinIcon,
    },
  );

  markerObj
    .addTo(markerGroup)
    .bindPopup(createPopup(item));
};

export {createMarker, createPopup};
