import {createData} from './data.js';
import {createCards} from './create-elements.js';
import {disableForm, enableForm} from './form.js';

const mocks = createData();

createCards(mocks.slice(0, 1));

disableForm();
enableForm();
