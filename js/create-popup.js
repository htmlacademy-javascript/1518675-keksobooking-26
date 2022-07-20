import {OBJECT_TYPES} from './form.js';
import {getNounPluralForm} from './utils.js';

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
  if (offer.features) {
    offer.features.forEach((feature) => {
      featuresContainer.innerHTML += `<li class="popup__feature popup__feature--${feature}"></li>`;
    });
  }

  popup.querySelector('.popup__description').textContent = `${offer.description}`;

  const photosContainer = popup.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      photosContainer.innerHTML += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
    });
  }


  return popup;
};

export {createPopup};
