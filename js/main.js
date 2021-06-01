// Получает положительное рандомное целое число > или = 0
function getRandomIntInclusive(min, max) {
  return ((min >= 0) && (min < max)) ? Math.floor(Math.random() * (max - min + 1)) + min : 0;
}

//  Проверяет длину коментария
const checkCommentLength = (str, maxCommentLength) => str.length <= maxCommentLength;

getRandomIntInclusive();
checkCommentLength();
