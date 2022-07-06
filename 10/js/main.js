import {createData} from './data.js';
import {createMarker} from './map.js';
import './slider.js';

const mocks = createData();

mocks.forEach((item) => {
  createMarker(item);
});
