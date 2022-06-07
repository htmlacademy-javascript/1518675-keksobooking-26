// Максимальное количество точек после запятой
const AMOUNT_SEMICOLONS = 10;

function getRandomNumber (min, max, range) {

  if (min > max) {
    [min, max] = [max, min];
  }

  if (min < max && min >= 0 && max >= 0 && (range % 1) === 0) {

    let number;
    let correctRange;

    ((min % 1) !== 0 || (max & 1) !== 0) ? number = min + Math.random() * (max + 0.1 - min) : number = min + Math.random() * (max + 1 - min);

    if (range === 0 || range === undefined || range < 0) {
      correctRange = 0;
    } else if (range > AMOUNT_SEMICOLONS) {
      correctRange = AMOUNT_SEMICOLONS;
    } else {
      correctRange = range;
    }

    return number.toFixed(correctRange);
  }

  return -1;
}

getRandomNumber(2, 40, 1);
