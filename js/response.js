
const DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';


const getData = (DATA_URL, ) => {

  fetch(DATA_URL, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onError();
    })
    .then((result) => {
      if (onSuccess) {
        onSuccess(result);
      }
    })
    .catch(() => {
      onError();
    });
};


export { getData };
