import { debounce } from './util.js';
import { getShareData } from './api.js';
import { renderPhotos } from './render-photos.js';

const DEBOUNCE_DELAY = 500;
const SLAIDE_SLICE_COUNT = 15;
const pictureList = document.querySelector('.pictures');
const filterList = document.querySelector('.img-filters');
const appendPhotos = document.querySelector('.pictures');

const removePictures = () => pictureList.querySelectorAll('.picture').forEach((item) => item.remove());

const applyFilterDefault = () => getShareData();

const applyFilterRandom = () => {
  const data = getShareData();
  data.sort(() => Math.random() - 0.5 );
  return data.slice(SLAIDE_SLICE_COUNT);
};

const applyFilterDiscussed = () => {
  const data = getShareData();
  data.sort((current, next) => next.comments.length - current.comments.length);
  return data;
};

const getFilteredArray = (filter) => {
  switch (filter) {
    case 'filter-default':
      return applyFilterDefault();
    case 'filter-random':
      return applyFilterRandom();
    case 'filter-discussed':
      return applyFilterDiscussed();
    default:
      return [];
  }
};

const setFilterActive = (evt) => {
  if (evt.target.closest('.img-filters__button')) {
    const filterBtn = evt.target;

    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    filterBtn.classList.add('img-filters__button--active');
  }
};

const onFilterClick = debounce((evt) => {
  if (evt.target.closest('.img-filters__button')) {
    const filterCurrent = evt.target.id;
    const filteredPictures = getFilteredArray(filterCurrent);


    removePictures();
    appendPhotos.appendChild(renderPhotos(filteredPictures));
  }
}, DEBOUNCE_DELAY);

const filterListClickHandler = (evt) => {
  setFilterActive(evt);
  onFilterClick(evt);
};

const activateFilters = () => {
  filterList.classList.remove('img-filters--inactive');
  filterList.addEventListener('click', filterListClickHandler);
};

export {activateFilters};

