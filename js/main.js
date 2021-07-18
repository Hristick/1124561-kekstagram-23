import { getArrayMocks, getCommentsMocks } from './render-moks-data.js';
import { renderPhotos } from './render-photos.js';
import { onOpenFullsize,  createComment, createFragmentComments, renderFullsizePhoto,} from './full-size-render.js';


const appendPhotos = document.querySelector('.pictures');
const MAX_POST = 25;

const moksCommentsArray = getCommentsMocks(MAX_POST);
const moksPostsArray = getArrayMocks(MAX_POST);
const renderedPhoto = renderPhotos(moksPostsArray);
appendPhotos.appendChild(renderedPhoto);

//createFragmentComments(createComment(moksCommentsArray));
//renderFullsizePhoto(moksPostsArray);
//appendPhotos.addEventListener('click', onOpenFullsize);



