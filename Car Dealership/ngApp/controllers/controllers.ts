namespace myapp.Controllers {

    const apiUrl = '/api/cars/search/';

    class DialogController {
        public pickColor(favoriteColor: string) {
          this.$mdDialog.hide(favoriteColor);
        }

        constructor(private $mdDialog: angular.material.IDialogService) { }
      }
    export class HomeController {
      public cars;
      public search;
      public favoriteColor: string

      public openDialog() {
            this.$mdDialog.show({
              controller: DialogController,
              controllerAs: 'dialog',
              templateUrl: '/ngApp/dialog.html',
              clickOutsideToClose: true
            }).then((favoriteColor: string) => {
                this.favoriteColor = favoriteColor;
            }, () => {
                this.favoriteColor = 'You cancelled the dialog.';
            });
          }

      public displayDetail(car) {
         console.log(car);
      }

      public fetch() {
        console.log("called fetch with " + apiUrl + " " + this.search);
        this.$http.get('/api/cars/search/' + this.search).then((res) => {
          console.log(res.data);
          this.cars = res.data;
        })
        this.search = ""; // reset search
        console.log("done with fetch");
      }

      //static $inject = ['$mdDialog'];

      constructor(private $http: ng.IHttpService, private $mdDialog: angular.material.IDialogService) {
          this.$http.get('/api/cars/')
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
