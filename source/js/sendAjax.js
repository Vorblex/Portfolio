export default (url, data) => {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${url}?${new Date().getTime()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      resolve(xhr.response);
    });
    xhr.addEventListener('error', (e) => {
      reject(e);
    });
    xhr.send(data);
  });
};