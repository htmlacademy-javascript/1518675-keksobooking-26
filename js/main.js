import './slider.js';
import {closePopup} from './map.js';
import {setUserFormSubmit} from './form.js';
import './upload-pictures.js';
import './filter.js';
import {filterMapHandler} from './create-elements.js';
import {resetFormPosition} from './map.js';

setUserFormSubmit(filterMapHandler, closePopup, resetFormPosition);
