import { getArrayMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';
import { renderPopup } from './validation-form.js';
import { onOpenFullsize } from './full-size-render.js';
import { getData } from './response.js';


const upLoadFile = document.querySelector('#upload-file');
const appendPhotos = document.querySelector('.pictures');
const MAX_POST = 25;


const moksPostsArray = getArrayMocks(MAX_POST);
const renderedPhoto = renderPhotos(moksPostsArray);
appendPhotos.appendChild(renderedPhoto);


upLoadFile.addEventListener('click', renderPopup);

getData();

onOpenFullsize();

