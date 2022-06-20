import {OBJECTS_AMOUNT, generateAuthorObj, generateOfferObj, generateLocationObj} from './data.js';

const createData = (array = []) => {
  for (let j = 0; j < OBJECTS_AMOUNT; j++) {
    array[j] = {};

    array[j].author = generateAuthorObj();
    array[j].offer = generateOfferObj();
    array[j].location = generateLocationObj();
  }

  return array;
};

export {createData};
