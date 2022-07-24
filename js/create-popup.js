import {OBJECT_TYPES} from './form.js';
import {getNounPluralForm} from './utils.js';

const PPEVIEW_WIDTH = '45px';
const PREVIEW_HEIGTH = '40px';

// Функция создания разметки из шаблона для всплывающего попапа
const createPopup = ({author, offer}) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popup = popupTemplate.cloneNode(true);

  popup.querySelector('.popup__avatar').src = `${author.avatar}`;
  popup.querySelector('.popup__title').textContent = offer.title;
  popup.querySelector('.popup__text--address').textContent = `${offer.address}`;
  popup.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
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

      const featuresItem = document.createElement('li');
      featuresItem.className = `popup__feature popup__feature--${feature}`;
      featuresContainer.append(featuresItem);
    });
  } else {
    featuresContainer.remove();
  }

  const descriptionContainer = popup.querySelector('.popup__description');
  if (offer.description) {
    descriptionContainer.textContent = `${offer.description}`;
  } else {
    descriptionContainer.remove();
  }

  const photosContainer = popup.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (offer.photos) {
    offer.photos.forEach((photo) => {

      const photoImage = document.createElement('img');
      photoImage.className = 'popup__photo';
      photoImage.style.width = PPEVIEW_WIDTH;
      photoImage.style.height = PREVIEW_HEIGTH;
      photoImage.alt = 'Фотография жилья';
      photoImage.src = `${photo}`;

      photosContainer.append(photoImage);
    });
  } else {
    photosContainer.remove();
  }

  return popup;
};

export {createPopup};
