const pictureTemplate = document.querySelector('#picture').content;
const copyPicture = pictureTemplate.querySelector('.picture');

const renderPhotos = (array = []) => {
  const result = document.createDocumentFragment();
  for (let index = 0; index < array.length; index++) {
    const renderedPicture = copyPicture.cloneNode(true);
    renderedPicture.querySelector('.picture__img').src = array[index].url;
    renderedPicture.querySelector('.picture__likes').textContent = array[index].likes;
    renderedPicture.querySelector('.picture__comments').textContent = array[index].comments.length;
  }
  return result;
};

export{renderPhotos};
