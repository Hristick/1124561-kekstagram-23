// Получает положительное рандомное целое число > или = 0
const getRandomInt = (min = 0, max = 0) => ((min >= 0) && (min < max)) ? Math.floor(Math.random() * (max - min + 1)) + min : 0;

//  Проверяет длину коментария
const checkCommentLength = (str = '', maxCommentLength = 140) => str.length <= maxCommentLength;

getRandomInt();
checkCommentLength();
