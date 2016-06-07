angular.module("freestyle").controller("playerController", function($rootScope, $scope, $http, $window, $cookies) {
    
    $scope.playerInfo = {};
    
    var init = function() {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/players";
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.get(url)
            .success(function(playerInfo) {
                $scope.playerInfo = buildYoutubeUrl(playerInfo);
                $rootScope.authenticated = true;
            })
            .error(function() {
                $rootScope.authenticated = false;
                alert("Debes loguearte");
                $window.location.href = '#/login';
            });
    }
    
    $scope.sendVideo = function() {
        $window.location.href = '#/send-video';
    }
    
    var buildYoutubeUrl = function(playerInfo) {
        if (playerInfo.videos.length > 0) {
            for (var i = 0; i < playerInfo.videos.length; i++) {
                playerInfo.videos[i].youtubeUrl = "http://www.youtube.com/embed/" + playerInfo.videos[i].youtubeUrl;
            }
        }
        return playerInfo;
    }
    
    init();
    
});