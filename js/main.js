import { getArrayMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';
import { onOpenFullsize } from './full-size-render.js';


const appendPhotos = document.querySelector('.pictures');
const MAX_POST = 25;

//const moksCommentsArray = getCommentsMocks(MAX_POST);
const moksPostsArray = getArrayMocks(MAX_POST);
const renderedPhoto = renderPhotos(moksPostsArray);
appendPhotos.appendChild(renderedPhoto);

//createFragmentComments(moksCommentsArray);
//renderFullsizePhoto(moksPostsArray);
//appendPhotos.addEventListener('click', onOpenFullsize);


onOpenFullsize();

