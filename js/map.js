import {enableForm} from './form.js';
import {createPopup} from './create-popup.js';

const CENTER_OF_TOKYO = {
  lat: 35.68950,
  lng: 139.69171,
};

const MAX_DIGIT = 5;

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
  address.value = `${obj.lat.toFixed(MAX_DIGIT)}, ${obj.lng.toFixed(MAX_DIGIT)}`;
};

marker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  fillAddressInput(coordinates);
});

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
