// Получает положительное рандомное целое число > или = 0
let error = '';

function getRandomIntInclusive(min, max) {
  if ((min >= 0) && (min < max)){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {error = 'Введите правильный диапазон чисел!!!' ;}
}
getRandomIntInclusive();

//  Проверяет длину коментария
function checkCommentLength(str, maxCommentLength) {
  const result = (str.length <= maxCommentLength);
  return result;
}
checkCommentLength();
