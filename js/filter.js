const MAX_OBJECTS = 10;
const DEFAULT_VALUE = 'any';

const PRICE_RANGE = {
  any: { start: 0, end: Infinity },
  middle: { start: 10000, end: 50000 },
  low: { start: 0, end: 10000 },
  high: { start: 50000, end: Infinity }
};

const filterType = (object) => {
  const type = document.querySelector('#housing-type').value;
  return object.offer.type === type || type === DEFAULT_VALUE;
};

const filterPrice = (object) => {
  const price = document.querySelector('#housing-price').value;
  return object.offer.price >= PRICE_RANGE[price].start && object.offer.price <= PRICE_RANGE[price].end;
};

const filterRooms = (object) => {
  const rooms = document.querySelector('#housing-rooms').value;
  return object.offer.rooms.toString() === rooms || rooms === DEFAULT_VALUE;
};

const filterGuests = (object) => {
  const guests = document.querySelector('#housing-guests').value;
  return object.offer.rooms.toString() === guests || guests === DEFAULT_VALUE;
};

const filterFeatures = (object) => {
  const checkedFeatures = Array.from(document.querySelectorAll('#housing-features [name="features"]:checked'));

  if (object.offer.features !== undefined) {
    return checkedFeatures.every((checkbox) => object.offer.features.includes(checkbox.value));
  }

  return false;
};

const filterObjects = (objects) => {

  const filteredObjects = [];

  for (const object of objects) {
    if (filteredObjects.length >= MAX_OBJECTS) {
      break;
    }

    if (
      filterType(object) &&
      filterPrice(object) &&
      filterRooms(object) &&
      filterGuests(object) &&
      filterFeatures(object)
    ) {
      filteredObjects.push(object);
    }
  }

  return filteredObjects;
};

export {MAX_OBJECTS, filterObjects};
