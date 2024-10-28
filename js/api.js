let data = [];

const getShareData = () => {
  const copyData = [...data];
  return copyData;
};


const getData = (onSuccess, onError) => {

  fetch('https://zoo-arm.ru/data/', {mode:'no-cors'})
    .then((response) => response.json())
    .then((response) => {
      data = [...response];
      if (onSuccess) {
        onSuccess(response);
      }
    })
    .catch(onError);
};

const sendData = (onSuccess, onFail, formData) => {
  fetch('https://23.javascript.pages.academy/kekstagram', { method: 'POST', body: formData })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch((error) => onFail(error));
};


export { getData, sendData, getShareData};
