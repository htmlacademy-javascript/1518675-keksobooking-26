import {OBJECT_TYPES} from './data.js';

const createCards = (cards) => {
  const cardTemplate = document.querySelector('#card').content;
  const mapCanvas = document.querySelector('#map-canvas');
  const cardListFragment = document.createDocumentFragment();

  cards.forEach(({author, offer}) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽ / ночь`;
    cardElement.querySelector('.popup__type').textContent = OBJECT_TYPES[offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    cardElement.querySelector('.popup__description').textContent = offer.description;
    cardElement.querySelector('.popup__avatar').src = author.avatar;

    const featuresContainer = cardElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';
    offer.features.forEach((feature) => {
      const newIcon = document.createElement('li');
      newIcon.className = `popup__feature popup__feature--${feature}`;
      newIcon.innerHTML = newIcon;

      featuresContainer.append(newIcon);
    });

    const photosContainer = cardElement.querySelector('.popup__photos');
    offer.photos.forEach((photo) => {
      const photosImage = photosContainer.querySelector('.popup__photo').cloneNode(true);
      photosImage.src = photo;
      photosContainer.appendChild(photosImage);
    });

    cardListFragment.appendChild(cardElement);
  });

  mapCanvas.appendChild(cardListFragment);
};

export {createCards};
