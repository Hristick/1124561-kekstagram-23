import { getArrayMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';
import { onRenderPopup } from './validation-form.js';
import { onOpenFullsize } from './full-size-render.js';

const upLoadFile = document.querySelector('#upload-file');
const appendPhotos = document.querySelector('.pictures');
const MAX_POST = 25;

//const moksCommentsArray = getCommentsMocks(MAX_POST);
const moksPostsArray = getArrayMocks(MAX_POST);
const renderedPhoto = renderPhotos(moksPostsArray);
appendPhotos.appendChild(renderedPhoto);


upLoadFile.addEventListener('click', onRenderPopup);
//createFragmentComments(moksCommentsArray);
//renderFullsizePhoto(moksPostsArray);
//appendPhotos.addEventListener('click', onOpenFullsize);


onOpenFullsize();

