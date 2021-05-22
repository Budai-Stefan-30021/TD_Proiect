function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        televizor: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/televizoare/'+this.id).then(
            (response) => {
                this.televizor = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.televizor);

            return axios.post('http://localhost:3000/televizoare', this.televizor).then(
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
  