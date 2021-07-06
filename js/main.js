
import { MAX_POST, getArrayMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';

const moksPostsArray = getArrayMocks(MAX_POST);

const renderedPhoto = renderPhotos(moksPostsArray);
document.querySelector('.pictures').appendChild(renderedPhoto);
