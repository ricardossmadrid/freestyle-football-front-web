var freestyle = angular.module ('freestyle', ['ngRoute', 'ngCookies']);

freestyle.config(function($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        }).when("/register", {
            templateUrl: 'views/register.html',
            controller: 'registerController'
        }).when("/player", {
            templateUrl: 'views/player.html',
            controller: 'playerController'
        })
        .otherwise({ redirectTo: "/login" });
});