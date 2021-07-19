// Получает положительное рандомное целое число > или = 0
const getRandomInt = (min = 0, max = 0) => ((min >= 0) && (min < max)) ? Math.floor(Math.random() * (max - min + 1)) + min : 0;

//  Проверяет длину коментария
const checkCommentLength = (str = '', maxCommentLength = 140) => str.length <= maxCommentLength;

const getUnquiArray = (count = 0) => {
  const result = new Set();
  while (result.size < count) {
    result.add(getRandomInt(1,300));
  }
  return Array.from(result);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {getRandomInt, checkCommentLength, getUnquiArray, isEscEvent};
