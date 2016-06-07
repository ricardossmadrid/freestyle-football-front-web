var freestyle = angular.module ('freestyle', ['ngRoute', 'ngCookies']);

freestyle.config(function($routeProvider, $sceDelegateProvider) {
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
        }).when("/send-video", {
            templateUrl: 'views/sendVideo.html',
            controller: 'sendVideoController'
        })
        .otherwise({ redirectTo: "/login" });
        
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://www.youtube.com/**'
    ]);
});