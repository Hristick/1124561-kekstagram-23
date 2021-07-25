const DEFAULT_EFFECT = 'none';

const sliderOptionsDefault = {
  start: 1,
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100,
  },
};

const sliderOptionsConfig = {
  chrome: {
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    settings: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    settings: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    settings: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    settings: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'brightness',
    unit: '',
  },
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadFormImg = uploadForm.querySelector('.img-upload__preview img');

const sliderWrap = uploadForm.querySelector('.img-upload__effect-level');
const slider = sliderWrap.querySelector('.effect-level__slider');

const effectsList = uploadForm.querySelector('.effects__list');
const effectsLevelInput = uploadForm.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;

const createNoUiSlider = () => {
  noUiSlider.create(slider, sliderOptionsDefault);
};

const changeEffectClassName = (name) => {
  uploadFormImg.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = name;
  uploadFormImg.classList.add(`effects__preview--${currentEffect}`);
};

const setEffectFilter = (filterName, value, unit) => {
  uploadFormImg.style.filter = `${filterName}(${value}${unit})`;
};

const destroySlider = () => {
  if (slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  uploadFormImg.style.filter = '';
  uploadFormImg.className = '';
  effectsLevelInput.value = '';
  sliderWrap.classList.add('hidden');
};

const updateSlider = (values, handle) => {

  const effectFilter = sliderOptionsConfig[currentEffect].filter;
  const effectUnit = sliderOptionsConfig[currentEffect].unit;

  effectsLevelInput.value = values[handle];
  setEffectFilter(effectFilter, effectsLevelInput.value, effectUnit);
};

const configureSlider = (options = {}) => {
  sliderWrap.classList.remove('hidden');
  slider.noUiSlider.updateOptions(options);
  effectsLevelInput.value = options.start;
};


const onEffectsListClick = (evt) => {
  if (evt.target.closest('[type=radio]')) {
    const effectName = evt.target.value;
    changeEffectClassName(effectName);
    if (currentEffect !== DEFAULT_EFFECT) {
      configureSlider(sliderOptionsConfig[currentEffect].settings);
      slider.noUiSlider.on('update', updateSlider);
    } else {
      resetEffects();
    }
  }
};


effectsList.addEventListener('click', onEffectsListClick);

export {resetEffects, createNoUiSlider, destroySlider};

