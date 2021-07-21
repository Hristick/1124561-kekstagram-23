import { isEscEvent } from './util.js';


const COMMENTS_STEP = 5;
const AVATAR_SIZE = 35;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentLoader = bigPicture.querySelector('.comments-loader');
const closeFullsizeButton = bigPicture.querySelector('.big-picture__cancel');
const fullsizeFooter = bigPicture.querySelector('.social__footer');
const commentsShown = bigPicture.querySelector('.comments-shown');
const pictureList = document.querySelector('.pictures');
//const commentsListFragment = document.createDocumentFragment();

let commentsData = [];
let commentsStart = 0;
let pictures;

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


/*const createFragmentComments = (comments) => {
  const result = document.createDocumentFragment();
  for (let index = 0; index < comments.length; index++) {
    const copyComment = comment.cloneNode(true);
    result.appendChild(copyComment[index]);
  }

  return result;

};*/
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


const renderComments = () => {

  const commentsToLoad = commentsData.slice(commentsStart, commentsStart + COMMENTS_STEP);

  const fragment = document.createDocumentFragment();
  commentsToLoad.forEach((comment) => {
    fragment.appendChild(createComment(comment));
  });
  commentList.appendChild(fragment);

  commentsShown.textContent = commentList.children.length;

  if (commentsData.length === commentList.children.length) {
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

const renderFullsizePhoto = ({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments;
  socialCaption.textContent = description;

  if (comments.length !== 0) {
    commentsData = [...comments];
    renderComments(commentsData);

  } else {
    hideCommentsDomElements();
  }
};

commentLoader.addEventListener('click', onFullsizeCommentsLoader);

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();


  removePictures();

  pictures.forEach((item) => pictureListFragment.appendChild(renderPictures(item)));

  pictureList.appendChild(pictureListFragment);
  pictureList.addEventListener('click', onPictureList);
};

const onOpenFullsize = () => {
  renderPictures();
  showCommentsDomElements();
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFullsizeButton.addEventListener('click', onCloseFullsize);
  document.addEventListener('keydown', onCloseIfEscPress);
};

const onPictureList = (evt) => {
  const picture = evt.target.closest('.picture');
  if (picture) {
    evt.preventDefault();
    const pictureId = +picture.dataset.id;
    const dataElement = pictures.find(({id}) => id === pictureId);

    if (dataElement) {
      onOpenFullsize(dataElement);
  }
};

const removePictures = () => pictureList.querySelectorAll('.picture').forEach((item) => item.remove());


export {onOpenFullsize, renderFullsizePhoto, createComment};

