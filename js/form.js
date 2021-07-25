import { isEscEvent } from './util.js';
import { resetScale } from './scale-photo.js';
import { resetEffects, createNoUiSlider } from './no-ui-slider.js';

const HASHTAG_REGEX = /[^A-Za-zА-ЯЁа-яё0-9]+/g;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

const upload = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');


const isUploadFormActiveField = () => document.activeElement === textHashtags || document.activeElement === textDescription;


const onClosePopup = () => {

  upload.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  uploadCancel.removeEventListener('click', onClosePopup);
  upload.removeEventListener('keypress', onClosePopup);
};

const onCloseIfEscPress = (evt) => {
  if (isEscEvent(evt) && !isUploadFormActiveField) {
    evt.preventDefault();
    onClosePopup();
  }
};

/*
const renderPopup = () => {
  upLoadFile.addEventListener('change', onOpenPopup());
  uploadCancel.addEventListener('click', onClosePopup);
};
*/
const setInputInvalid = (errorMsg) => {
  textHashtags.style.outline = '2px solid red';
  textHashtags.setCustomValidity(errorMsg);
};

const setInputValid = () => {
  textHashtags.style.outline = 'revert';
  textHashtags.setCustomValidity('');
};

const validateHashtag = (hashtagString) => {
  const  hashtags = hashtagString.replace(/ +/g, ' ').trim().split(' ');

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    setInputInvalid(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хештегов`);
    return;
  }

  const uniqHashtags = [...new Set(hashtags.toLowerCase())];

  for (let index = 0; index < hashtags.length; index++) {

    const hashtag = hashtags[index];
    const hashtagValid = HASHTAG_REGEX.test(hashtag);

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      setInputInvalid(`Максимальная длина одного хештега ${MAX_HASHTAG_LENGTH} символов`);
    }

    if (!hashtagValid) {
      setInputInvalid('Не верный формат хештега');
      return;
    }

    if (!HASHTAG_REGEX.test(hashtag.slice(1))) {
      setInputInvalid('Не верный формат хештега');
    }

    if (hashtag.charAt(0) !== '#') {
      setInputInvalid('Хештег должен начинаться с #');
    }

    if ((hashtag.length === 1) && (hashtag === '#')) {
      setInputInvalid('Хештег не может состоять только из #');
    }

    if (hashtags.length !== uniqHashtags.length) {
      setInputInvalid('Один и тот же хэштег не может быть использован дважды. Хештеги нечувствительны к регистру');
      return;
    }
  }
};

const onHashtegValidate = () => {
  const hashtagString = textHashtags.value;

  setInputValid();
  if (hashtagString !== '') {
    validateHashtag(hashtagString);
  }
  textHashtags.reportValidity();
};


const onOpenPopup = () => {
  resetScale();
  resetEffects();
  upload.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  createNoUiSlider();
  uploadForm.addEventListener('submit', onHashtegValidate);
  uploadFile.addEventListener('keydown', onClosePopup);
  document.addEventListener('keydown', onCloseIfEscPress);
};

export { onOpenPopup };
