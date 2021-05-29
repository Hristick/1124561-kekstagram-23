// Получает положительное рандомное целое число > или = 0
function getRandomIntInclusive(min, max) {
  if ((min >= 0) && (min < max)){
    min = Math.ceil(min);
    max = Math.floor(max);
 return Math.floor(Math.random() * (max - min + 1)) + min;
} else {alert('Введите правильный диапазон чисел!!!');}
}
getRandomIntInclusive();

// Проверяет длину коментария
function checkCommentLength(str, maxCommentLength) {
  let result = (str.length <= maxCommentLength) ? true : false;
  return result
}
checkCommentLength();
