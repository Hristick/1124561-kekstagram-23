// Получает положительное рандомное целое число > или = 0
let ERROR = 'Введите правильный диапазон чисел!!!';

function getRandomIntInclusive(min, max) {
  const result = ((min >= 0) && (min < max)) ? Math.floor(Math.random() * (max - min + 1)) + min : ERROR;
    return result;
}

//  Проверяет длину коментария
function checkCommentLength(str, maxCommentLength) {
  const result = (str.length <= maxCommentLength);
  return result;
}

getRandomIntInclusive();
checkCommentLength();
