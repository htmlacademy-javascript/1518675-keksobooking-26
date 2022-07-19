import './slider.js';
import {makeRequest} from './api.js';
import {showGetDataError} from './errors.js';
import {setUserFormSubmit, resetForm} from './form.js';
import {generateObjects} from './create-elements.js';
import './upload-pictures.js';

import './filter.js';

makeRequest(generateObjects, showGetDataError, 'GET');

setUserFormSubmit(resetForm);
