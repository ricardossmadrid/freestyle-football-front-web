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

freestyle.controller('indexController', function($scope, $http, $cookies) {

  $scope.searchName = "";

  $scope.names = [];
  
  $scope.getSuggestions = function() {
      if ($scope.searchName.length >= 3) {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/players/suggestions?playerName=" + $scope.searchName;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.get(url)
            .success(function(suggestions) {
                $scope.names = suggestions;
            })
            .error(function() {
                $scope.names = [];
            });
      }
  }

});