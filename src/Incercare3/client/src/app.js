function run() {
  let indexComponent = new Vue({
    el: '#app',
    data: {
      televizoare: [],
      televizoareService: null,
      message: ''
    },
    created: function () {
      this.televizoareService = televizoare();
      this.televizoareService.get().then(response => (this.televizoare = response.data));
    },
    methods: {
      deleteTelevizor: function(id) {
        console.log('HTTP DELETE spre backend, televizor: '+id);
        this.televizoareService.remove(id).then(response => {
          this.televizoareService.get().then(response => (this.televizoare = response.data));
        });
      },
    }
  });

  //indexComponent.use(VueMaterial);

}

document.addEventListener('DOMContentLoaded', () => {
  run();
});
