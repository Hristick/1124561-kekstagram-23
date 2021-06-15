const moksPostsArray = [];
const moksCommentsArray = [];
const DESCRIPTIONS = ['Хороший ракурс', 'Отметили так отметили', 'No comments', 'Закат на Балли', 'Утро в Сочи', 'Милая фотка', 'Огонь'];
const MAXPOSTS = 25;
const COMMENTS_NAMES = ['James', 'Julia', 'Alex', 'Michel', 'Grag', 'John'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];


// Получает положительное рандомное целое число > или = 0
const getRandomInt = (min = 0, max = 0) => ((min >= 0) && (min < max)) ? Math.floor(Math.random() * (max - min + 1)) + min : 0;

//  Проверяет длину коментария
const checkCommentLength = (str = '', maxCommentLength = 140) => str.length <= maxCommentLength;

getRandomInt();
checkCommentLength();

// Получает не повторяющееся число из диапазона
const getRandomNonRepeatingNumbers = (min, max) => {
  const previousValues = [];
  let currentValue = getRandomInt(min, max);
  if (previousValues.length >= (max - min + 1)) {
    throw new Error(`Перебраны все числа из диапазона от ${  min  } до ${  max}`);
  }
  while (previousValues.includes(currentValue)) {
    currentValue = getRandomNumber(min, max);
  }
  previousValues.push(currentValue);
  return currentValue;
};

const getArrayMocks = () => {
  for (let i = 1; i <= MAXPOSTS; i++) {
    moksCommentsArray.push({
      id: getRandomNonRepeatingNumbers(1,300),
      avatar: 'img/avatar-' + getRandomInt(0, 6) + '.svg',
      message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
      name: COMMENTS_NAMES[getRandomInt(0, COMMENTS_NAMES.length - 1)],
    })
    moksPostsArray.push({
      id: i,
      url: 'photos/' + i + '.jpg',
      description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInt(15, 200),
      comments: moksCommentsArray[getRandomInt(0, moksCommentsArray.length - 1)]
    }
    )
  }
}
getArrayMocks();
