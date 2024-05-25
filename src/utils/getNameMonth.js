import months from '../constants/months';

function getNameMonth(number) {
  return months[number - 1];
}

export default getNameMonth;
