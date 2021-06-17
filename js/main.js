const COMMENTS_NAMES = ['James', 'Julia', 'Alex', 'Michel', 'Grag', 'John'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.', 'Как можно было поймать такой неудачный момент?!'];
const DESCRIPTIONS = ['Хороший ракурс', 'Отметили так отметили', 'No comments', 'Закат на Балли', 'Утро в Сочи', 'Милая фотка', 'Огонь'];
const MAX_POST = 25;
const AVATAR_SRC = 'img/avatar-';
const AVATAR_FORMAT = '.svg';
const PHOTO_SRC = 'photos/';
const PHOTO_FORMAT = '.jpg';
const MIN_LIKE = 15;
const MAX_LIKE = 200;
let moksPostsArray = [];


// Получает положительное рандомное целое число > или = 0
const getRandomInt = (min = 0, max = 0) => ((min >= 0) && (min < max)) ? Math.floor(Math.random() * (max - min + 1)) + min : 0;

//  Проверяет длину коментария
const checkCommentLength = (str = '', maxCommentLength = 140) => str.length <= maxCommentLength;

const getUnquiArray = () => {
  const result = new Set;
  while (result.size < 25) {
    result.add(getRandomInt(1,300));
  }
  return Array.from(result);
};

const getArrayMocks = () => {
  const result = [];
  const moksCommentsArray = [];
  const UNIQUI_ELEMENTS = getUnquiArray();

  for (let index = 0; index < MAX_POST; index++) {
    moksCommentsArray.push({
      id: UNIQUI_ELEMENTS[index],
      avatar: AVATAR_SRC + getRandomInt(0, 6) + AVATAR_FORMAT,
      message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
      name: COMMENTS_NAMES[getRandomInt(0, COMMENTS_NAMES.length - 1)],
    });
    result.push({
      id: index + 1,
      url: PHOTO_SRC + index + 1 + PHOTO_FORMAT,
      description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
      likes: getRandomInt(MIN_LIKE, MAX_LIKE),
      comments: moksCommentsArray[getRandomInt(0, moksCommentsArray.length - 1)],
    });
  } return result;
};
moksPostsArray = getArrayMocks(MAX_POST);
