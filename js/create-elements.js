import {createMarkers, markerGroup} from './map.js';
import {MAX_OBJECTS, filterObjects} from './filter.js';
import {debounce} from './utils.js';
import {resetForm, resetFormButton} from './form.js';

const DEBOUNCE_TIME = 500;

// Код обработчика фильтра
const filterMap = document.querySelector('.map__filters');

let objectsData = [];

const filterMapHandler = () => {
  markerGroup.clearLayers();
  createMarkers(filterObjects(objectsData));
};

// Код генерации элементов
const generateObjects = (objects) => {

  objectsData = objects.slice();
  const filteredObjects = objects.slice(0, MAX_OBJECTS);

  createMarkers(filteredObjects);
  filterMap.addEventListener('change', debounce(filterMapHandler, DEBOUNCE_TIME));

  resetFormButton.addEventListener('click', () => {
    markerGroup.clearLayers();
    createMarkers(filteredObjects);

    resetForm();
  });
};

export {generateObjects, filterMapHandler};
