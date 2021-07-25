import { isEscEvent } from './util.js';
import { getShareData } from './api.js';

const MAX_COMMENT_SHOW = 5;
const COMMENTS_STEP = 5;
const AVATAR_SIZE = 35;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentLoader = bigPicture.querySelector('.comments-loader');
const closeFullsizeButton = bigPicture.querySelector('.big-picture__cancel');
const fullsizeFooter = bigPicture.querySelector('.social__footer');
const pictureList = document.querySelector('.pictures');
const commentsStartCount = document.querySelector('.comments-start');

let commentsStart = 0;

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  const commentImg = document.createElement('img');
  const commentText = document.createElement('p');

  comment.classList.add('social__comment');
  commentImg.classList.add('social__picture');
  commentText.classList.add('social__text');
  commentImg.src = avatar;
  commentImg.alt = name;
  commentImg.width = AVATAR_SIZE;
  commentImg.height = AVATAR_SIZE;
  commentText.textContent = message;
  comment.appendChild(commentImg);
  comment.appendChild(commentText);
  return comment;
};


const showCommentsDomElements = () => {
  commentList.innerHTML = '';
  commentList.classList.remove('hidden');
  commentsCount.classList.remove('hidden');
  commentLoader.classList.remove('hidden');
  fullsizeFooter.style.border = '1px solid #cccccc';
};

const hideCommentsDomElements = () => {
  commentList.classList.add('hidden');
  commentsCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  fullsizeFooter.style.border = 0;
};


const renderComments = (array) => {
  if (array.length < MAX_COMMENT_SHOW) {
    commentsStartCount.textContent = array.length;
  }

  const commentsToLoad = array.slice(commentsStart, commentsStart + COMMENTS_STEP);

  const fragment = document.createDocumentFragment();
  for (let index = 0; index < commentsToLoad.length; index++) {
    const singleComent = createComment(commentsToLoad[index]);
    fragment.appendChild(singleComent);
  }
  commentList.appendChild(fragment);


  if (array.length === commentsToLoad.length) {
    commentLoader.classList.add('hidden');
  }

  commentsStart += COMMENTS_STEP;
};


const onCloseFullsize = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  //document.removeEventListener('keydown', onCloseIfEscPress);
  closeFullsizeButton.removeEventListener('click', onCloseFullsize);
};

const onCloseIfEscPress = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onCloseFullsize();
  }
};

const onFullsizeCommentsLoader = () => renderComments();

const renderFullsizePhoto = ({url = '', likes = 0, comments = [], description = ''}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  if (comments.length !== 0) {
    showCommentsDomElements();
    const commentsData = [...comments];
    renderComments(commentsData);
  } else {
    hideCommentsDomElements();
  }
};

commentLoader.addEventListener('click', onFullsizeCommentsLoader);

const removePictures = () => pictureList.querySelectorAll('.picture').forEach((item) => item.remove());


const onOpenFullsize = (element) => {
  renderFullsizePhoto(element);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFullsizeButton.addEventListener('click', onCloseFullsize);
  document.addEventListener('keydown', onCloseIfEscPress);
};


const onPictureList = (evt) => {
  const pictures = getShareData();


  const picture = evt.target.closest('.picture');
  if (picture) {
    evt.preventDefault();
    const pictureId = +picture.dataset.id;
    const dataElement = pictures.find(({id}) => id === pictureId);
    if (dataElement) {
      onOpenFullsize(dataElement);
    }
  }
};


export {onOpenFullsize, renderFullsizePhoto, createComment, onPictureList};

