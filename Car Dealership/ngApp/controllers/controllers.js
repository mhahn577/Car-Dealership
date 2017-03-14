var myapp;
(function (myapp) {
    var Controllers;
    (function (Controllers) {
        var apiUrl = '/api/cars/search/';
        var HomeController = (function () {
            function HomeController($http) {
                var _this = this;
                this.$http = $http;
                this.$http.get('/api/cars')
                    .then(function (response) {
                    _this.cars = response.data;
                })
                    .catch(function (response) {
                    console.error('Could not retrieve movies.');
                });
            }
            HomeController.prototype.fetch = function () {
                var _this = this;
                this.$http.get(apiUrl + this.search).then(function (res) {
                    console.log(res);
                    _this.cars = res.data;
                });
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
