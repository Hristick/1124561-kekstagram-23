import { isEscEvent } from './util.js';
import { resetScale } from './scale-photo.js';
import { createNoUiSlider} from './no-ui-slider.js';
import { sendData } from './api.js';

const HASHTAG_REGEX = /[^A-Za-zА-ЯЁа-яё0-9]+/g;
const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const upload = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');
const uploadFormEffectPreviews = uploadForm.querySelectorAll('.effects__preview');
const success = document.querySelector('#success').content.querySelector('.success');
const error = document.querySelector('#error').content.querySelector('.error');
const uploadFile = uploadForm.querySelector('#upload-file');


const popupTemplates = {
  success: success,
  error: error,
};


const isUploadFormActiveField = () => document.activeElement === textHashtags || document.activeElement === textDescription;


const onClosePopup = () => {

  document.body.classList.remove('modal-open');
  upload.classList.add('hidden');
  uploadCancel.removeEventListener('click', onClosePopup);
  upload.removeEventListener('keydown', onClosePopup);
};

const onCloseIfEscPress = (evt) => {
  if (isEscEvent(evt) && !isUploadFormActiveField()) {
    evt.preventDefault();
    onClosePopup();
  }
};


const setInputInvalid = (errorMsg) => {
  textHashtags.style.outline = '2px solid red';
  textHashtags.setCustomValidity(errorMsg);
};

const setInputValid = () => {
  textHashtags.style.outline = 'revert';
  textHashtags.setCustomValidity('');
};

const validateHashtag = (hashtagString) => {
  const  hashtags = hashtagString.replace(/ +/g, ' ').trim().split(' ').map((item) => item.toLowerCase());

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    setInputInvalid(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хештегов`);
    return;
  }
  const uniqHashtags = [...new Set(hashtags)];

  for (let index = 0; index < hashtags.length; index++) {

    const hashtag = hashtags[index].toLowerCase();
    const hashtagValid = HASHTAG_REGEX.test(hashtag);

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      setInputInvalid(`Максимальная длина одного хештега ${MAX_HASHTAG_LENGTH} символов`);
    }

    if (!hashtagValid) {
      setInputInvalid('Не верный формат хештега');
      return;
    }

    if (HASHTAG_REGEX.test(hashtag.slice(1))) {
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
  upload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadForm.addEventListener('input', onHashtegValidate);
  document.addEventListener('keydown', onCloseIfEscPress);
  uploadCancel.addEventListener('click', onClosePopup);
  createNoUiSlider();
  resetScale();
};

const resetUploadImage = () => {
  uploadFormImg.src = '';
  uploadFormEffectPreviews.forEach((item) => item.style.backgroundImage = 'none');
};

const uploadImage = () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const result = reader.result;
      uploadFormImg.src = result;
      uploadFormEffectPreviews.forEach((item) => item.style.backgroundImage = `url(${result})`);
    });
    reader.readAsDataURL(file);
  } else {
    uploadFile.value = '';
    resetUploadImage();
  }
};


const removePopup = () => {
  const popup = document.querySelector('.success') || document.querySelector('.error');
  if (popup) {
    popup.remove();
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', onDocumentClick);
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removePopup();
  }
};

const onDocumentClick = (evt) => {
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    removePopup();
  }
};

const onPopupBtnClick = () => removePopup();


const renderPopup = (type) => {
  const popup = popupTemplates[type].cloneNode(true);
  document.body.appendChild(popup);

  const popupBtn = popup.querySelector('button');

  popupBtn.addEventListener('click', onPopupBtnClick);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};


const onUploadFileChange = () => {
  onOpenPopup();
  uploadImage();
};

uploadFile.addEventListener('change', onUploadFileChange);

const onSendSuccess = () => {
  onClosePopup();
  renderPopup('success');
};

const onSendError = () => {
  onClosePopup();
  renderPopup('error');
};

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData =  new FormData(evt.target);
  sendData(onSendSuccess, onSendError, formData);
});


export { onOpenPopup };
