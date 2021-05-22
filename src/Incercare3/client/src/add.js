function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        televizor: {}
      },
      created: function () {
      },
      methods: {
       add: function(){
            console.dir(this.televizor);
            return axios.put('http://localhost:3000/televizoare', this.televizor).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );

        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });