function televizoare() {
  get = function () {
    return axios.get('http://localhost:3000/televizoare');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/televizoare/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
