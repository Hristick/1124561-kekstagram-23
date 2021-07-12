import { getArrayMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';

const MAX_POST = 25;
const moksPostsArray = getArrayMocks(MAX_POST);
const renderedPhoto = renderPhotos(moksPostsArray);

const appendPhotos = document.querySelector('.pictures');
appendPhotos.appendChild(renderedPhoto);
console.log(renderedPhoto);
