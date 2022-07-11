import {createMarker} from './map.js';
import './slider.js';
import {getData, sendData} from './api.js';
import {showGetDataError} from './errors.js';
import {setUserFormSubmit} from './form.js';

getData((objects) => {
  objects.forEach((object) => {
    createMarker(object);
  });
}, showGetDataError);

setUserFormSubmit(sendData);
