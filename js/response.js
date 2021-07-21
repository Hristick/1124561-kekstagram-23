const getData = (onSuccess, onError) => {

  fetch()
    .then((response) => {
      if (response.ok) {
        onSuccess(response);
      }
      onError();
    })
    .then((result) => {
      if (onSuccess) {
        onSuccess(result);
      }
    })
    .catch(onError);
};


export { getData };
