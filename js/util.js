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

const showAlert = (message, timeoutDelay) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 50;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 30px';
  alertContainer.style.fontSize = '50px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, timeoutDelay);
};


export {getRandomInt, checkCommentLength, getUnquiArray, isEscEvent, showAlert};
