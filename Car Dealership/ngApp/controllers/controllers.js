var myapp;
(function (myapp) {
    var Controllers;
    (function (Controllers) {
        var apiUrl = '/api/cars/search/';
        var DialogController = (function () {
            function DialogController($mdDialog) {
                this.$mdDialog = $mdDialog;
            }
            DialogController.prototype.pickColor = function (favoriteColor) {
                this.$mdDialog.hide(favoriteColor);
            };
            return DialogController;
        }());
        var HomeController = (function () {
            function HomeController($http, $mdDialog) {
                var _this = this;
                this.$http = $http;
                this.$mdDialog = $mdDialog;
                this.$http.get('/api/cars/')
                    .then(function (response) {
                    _this.cars = response.data;
                })
                    .catch(function (response) {
                    console.error('Could not retrieve movies.');
                });
            }
            HomeController.prototype.openDialog = function () {
                var _this = this;
                this.$mdDialog.show({
                    controller: DialogController,
                    controllerAs: 'dialog',
                    templateUrl: '/ngApp/dialog.html',
                    clickOutsideToClose: true
                }).then(function (favoriteColor) {
                    _this.favoriteColor = favoriteColor;
                }, function () {
                    _this.favoriteColor = 'You cancelled the dialog.';
                });
            };
            HomeController.prototype.displayDetail = function (car) {
                console.log(car);
            };
            HomeController.prototype.fetch = function () {
                var _this = this;
                console.log("called fetch with " + apiUrl + " " + this.search);
                this.$http.get('/api/cars/search/' + this.search).then(function (res) {
                    console.log(res.data);
                    _this.cars = res.data;
                });
                this.search = "";
                console.log("done with fetch");
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module('myapp').controller('homeController', HomeController);
        var AboutController = (function () {
            function AboutController() {
                this.message = 'Hello from the about page!';
            }
            return AboutController;
        }());
        Controllers.AboutController = AboutController;
    })(Controllers = myapp.Controllers || (myapp.Controllers = {}));
})(myapp || (myapp = {}));
