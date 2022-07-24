import {enableForm, resetFormButton} from './form.js';
import {createPopup} from './create-popup.js';
import {makeRequest} from './api.js';
import {generateObjects} from './create-elements.js';
import {showGetDataError} from './errors.js';

const CENTER_OF_TOKYO = {
  lat: 35.68950,
  lng: 139.69171,
};

const MAX_DIGIT = 5;

const address = document.querySelector('#address');

// Создание карты
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
    makeRequest(generateObjects, showGetDataError, 'GET');
    address.value = `${CENTER_OF_TOKYO.lat.toFixed(MAX_DIGIT)}, ${CENTER_OF_TOKYO.lng.toFixed(MAX_DIGIT)}`;
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

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
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
  address.value = `${obj.lat.toFixed(MAX_DIGIT)}, ${obj.lng.toFixed(MAX_DIGIT)}`;
};

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  fillAddressInput(coordinates);
});

const markerGroup = L.layerGroup().addTo(map);

// Функция создания всплывающего попапа
const createMarkers = (items) => {
  items.forEach((item) => {
    const {lat, lng} = item.location;

    const markerObj = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );

    markerObj
      .addTo(markerGroup)
      .bindPopup(createPopup(item));
  });
};

const resetFormPosition = () => {
  map.setView({
    lat: CENTER_OF_TOKYO.lat,
    lng: CENTER_OF_TOKYO.lng,
  }, 10);

  marker.setLatLng({
    lat: CENTER_OF_TOKYO.lat,
    lng: CENTER_OF_TOKYO.lng,
  });
};

const closePopup = () => {
  map.closePopup();
};

resetFormButton.addEventListener('click', resetFormPosition);

export {createMarkers, createPopup, markerGroup, closePopup, resetFormPosition};
