import { isEscEvent } from './util.js';

const AVATAR_SIZE = 35;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentList = document.querySelector('.social__comments');
const socialCaption = document.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const closeFullsizeButton = document.querySelector('.big-picture__cancel');


const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentText = document.createElement('p');

  comment.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentImg.width = AVATAR_SIZE;
  commentImg.height = AVATAR_SIZE;
  commentText.textContent = message;
  commentText.classList.add('social__text');
  comment.appendChild(commentImg);
  comment.appendChild(commentText);
  return comment;
};

const hideCommentCount = () => {
  socialCommentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
};


const onCloseFullsize = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onCloseIfEscPress);
};

const onCloseIfEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onCloseFullsize();
  }
};


const renderFullsizePhoto = ({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  socialCaption.textContent = description;
  commentList.appendChild(createComment());
};

const onOpenFullsize = () => {
  renderFullsizePhoto();
  hideCommentCount();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFullsizeButton.addEventListener('click', onCloseFullsize());
  document.addEventListener('keydown', onCloseIfEscPress);
};

export {onOpenFullsize};
