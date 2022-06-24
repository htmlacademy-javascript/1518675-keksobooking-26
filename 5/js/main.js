import {createData} from './data.js';
import {createCards} from './create-elements.js';

const mocks = createData();

createCards(mocks.slice(0, 1));
