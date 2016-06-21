var freestyle = angular.module ('freestyle', ['ngRoute', 'ngCookies', 'ui.bootstrap']);

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
        }).when("/battle-challenge", {
            templateUrl: 'views/battleChallenge.html',
            controller: 'battleChallengeController'
        }).when("/conversation", {
            templateUrl: 'views/conversation.html',
            controller: 'conversationController'
        })
        .otherwise({ redirectTo: "/login" });
        
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '*://www.youtube.com/**'
    ]);
});

freestyle.controller('indexController', function($rootScope, $scope, $http, $cookies, $window, $route) {
    
  $rootScope.playerNameToShow = "";
    
  $scope.nameSuggestionsError = false;

  $scope.searchName = "";

  $scope.names = [];
  
  var init = function() {
      $rootScope.playerLogged = $window.sessionStorage.getItem("playerLogged");
  }
  
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
  
  $scope.showOtherUser = function() {
      if ($scope.names.indexOf($scope.searchName) !== -1) {
          $scope.nameSuggestionsError = false;
          this.showProfile($scope.searchName);
      } else {
          $scope.nameSuggestionsError = true;
      }
  }
  
  $scope.showProfile = function(searchName) {
    $rootScope.playerNameToShow = searchName;
    if ($window.location.href.match(/#\/player/g) === null) {
        $window.location.href = '#/player';
    } else {
        $route.reload();
    }
  }
  
  init();

});