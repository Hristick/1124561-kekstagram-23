const upload = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const upLoadFile = document.querySelector('#upload-file');

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
  window.addEventListener('keydown', )
};

export { onRenderPopup };
