const upload = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const upLoadFile = document.querySelector('#upload-file');
const textHashtags = document.querySelector('.text__hashtags');

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

const userNameInput = document.querySelector('.setup-user-name');

textHashtags.addEventListener('input', () => {
  const valueLength = textHashtags.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    textHashtags.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    textHashtags.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    textHashtags.setCustomValidity('');
  }

  textHashtags.reportValidity();
});

export { onRenderPopup };
