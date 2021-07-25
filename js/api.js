let data = [];

const getShareData = () => {
  const copyData = [...data];
  return copyData;
};


const getData = (onSuccess, onError) => {

  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((response) => {
      data = [...response];
      if (onSuccess) {
        onSuccess(response);
      }
    })
    .catch(onError);
};


export { getData, getShareData};
