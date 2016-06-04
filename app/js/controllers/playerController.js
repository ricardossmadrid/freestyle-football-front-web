angular.module("freestyle").controller("playerController", function($rootScope, $scope, $http, $window, $cookies) {
    
    $scope.playerInfo = {};
    
    var init = function() {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/players";
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.get(url)
            .success(function(playerInfo) {
                $scope.playerInfo = playerInfo;
                $rootScope.authenticated = true;
            })
            .error(function() {
                $rootScope.authenticated = false;
                alert("Debes loguearte");
                $window.location.href = '#/login';
            });
    }
    
    init();
    
});