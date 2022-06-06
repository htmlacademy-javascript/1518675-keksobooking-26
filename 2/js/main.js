// Максимальное количество точек после запятой
const AMOUNT_SEMICOLONS = 10;

function getRandomNumber (min, max, range) {
  if ((typeof min) === 'number' && (typeof max) === 'number' && (typeof range) === 'number') {

    if (min < max && min >= 0 && max >= 0 && (range % 1) === 0) {

      let number;
      let correctRange;

      if ((min % 1) !== 0 || (max & 1) !== 0) {
        number = min + Math.random() * (max + 0.1 - (min + 0.1));
      } else {
        number = min + Math.random() * (max + 1 - min);
      }

      if (range === 0 || range === undefined || range < 0) {
        correctRange = 0;
      } else if (range > AMOUNT_SEMICOLONS) {
        correctRange = AMOUNT_SEMICOLONS;
      } else {
        correctRange = range;
      }

      return Math.floor(number * Math.pow(10, correctRange)) / Math.pow(10, correctRange);
    }

  }
  return 0;
}

getRandomNumber(2, 100, 4);
