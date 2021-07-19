import { getArrayMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';
import { onRenderPopup } from './validation-form.js';


const appendPhotos = document.querySelector('.pictures');
const MAX_POST = 25;
const moksPostsArray = getArrayMocks(MAX_POST);
const renderedPhoto = renderPhotos(moksPostsArray);
appendPhotos.appendChild(renderedPhoto);


onRenderPopup();
