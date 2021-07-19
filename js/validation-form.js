const HASHTAG_REGEX = /[^#[A-Za-zА-я0-9]{1,19}[ ]{0,1}]{0,5}$/;
const MAX_HASHTAG_COUNT = 5;

const upload = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const upLoadFile = document.querySelector('#upload-file');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const isUploadFormActiveField = () => document.activeElement === textHashtags || document.activeElement === textDescription;


const openPopup = () => {
  upload.classList.remove('hidden');
  document.body.classList.add('.modal-open');
};

const closePopup = () => {
  upload.classList.add('hidden');
  document.body.classList.remove('.modal-open');
};

const onRenderPopup = () => {
  upLoadFile.addEventListener('change', openPopup());
  uploadCancel.addEventListener('click', closePopup);
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
  const hashtags = hashtagString.trim().split(' ').map((item) => item.toLowerCase());

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    setInputInvalid(`Нельзя указать больше чем ${MAX_HASHTAG_COUNT} хештегов`);
    return;
  }

  for (let index = 0; index < hashtags.length; index++) {
    const hashtag = hashtags[index];
    const hashtagValid = HASHTAG_REGEX.test(hashtag);

    if (!hashtagValid) {
      setInputInvalid('Максимальная длина одного хештега 20 символов, включая решётку, должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д');
      return;
    }
    if (hashtags.includes(hashtag, index + 1)) {
      setInputInvalid('Один и тот же хэштег не может быть использован дважды. Хештеги нечувствительны к регистру');
      return;
    }
  }
};

/*
textHashtags.addEventListener('input', () => {
  const valueLength = textHashtags.value.length;

  if (valueLength < MIN_HASHTAG_LENGTH) {
    textHashtags.setCustomValidity(`Ещё ${  MIN_HASHTAG_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_HASHTAG_LENGTH) {
    textHashtags.setCustomValidity(`Удалите лишние ${  valueLength - MAX_HASHTAG_LENGTH } симв.`);
  } else {
    textHashtags.setCustomValidity('');
  }

  textHashtags.reportValidity();
});*/

export { onRenderPopup };
/*
Хэш-теги:

если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.


2.4. Комментарий:

если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
*/
