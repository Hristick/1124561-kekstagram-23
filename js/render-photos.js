
const pictureTemplate = document.querySelector('#picture').content;
const copyPicture = pictureTemplate.querySelector('.picture');

const renderPhotos = (array = []) => {
  const result = document.createDocumentFragment();
  for (let index = 0; index < array.length; index++) {
    copyPicture.cloneNode(true);
    copyPicture.querySelector('.picture__img').src = array[index].url;
    copyPicture.querySelector('.picture__likes').textContent = array[index].likes;
    copyPicture.querySelector('.picture__comments').textContent = array[index].comments;
  }
  return result;
};

export{renderPhotos};
