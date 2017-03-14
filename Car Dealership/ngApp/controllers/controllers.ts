namespace myapp.Controllers {

    const apiUrl = '/api/cars/search/';

    export class HomeController {
      public cars;
      public search;

      public fetch() {
        this.$http.get(apiUrl + this.search).then((res) => {
          console.log(res);
          this.cars = res.data;
        })
      }

      constructor(private $http: ng.IHttpService) {
          this.$http.get('/api/cars')
              .then((response) => {
                  this.cars = response.data;
              })
              .catch((response) => {
                  console.error('Could not retrieve movies.');
              });
      }

    }

    angular.module('myapp').controller('homeController', HomeController);

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
