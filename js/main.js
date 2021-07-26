import { showAlert } from './util.js';
import { getData } from './api.js';
import { renderPhotos } from './render-photos.js';
import { onPictureList} from './full-size-render.js';
import { onOpenPopup} from './form.js';
import { activateFilters } from './filters.js';


const ALERT_MESSAGE_TEXT = 'Ошибка загрузки данных!!!';
const ALERT_TIMEOUT = 7000;
const appendPhotos = document.querySelector('.pictures');
const pictureList = document.querySelector('.pictures');
const uploadFile = document.querySelector('#upload-file');

const onSuccess = (response) => {
  const data = [...response];
  appendPhotos.appendChild(renderPhotos(data));
  pictureList.addEventListener('click', onPictureList);
  activateFilters();
};

const onError = () => {
  showAlert(ALERT_MESSAGE_TEXT, ALERT_TIMEOUT);
};


getData(onSuccess, onError);

uploadFile.addEventListener('change', onOpenPopup);
