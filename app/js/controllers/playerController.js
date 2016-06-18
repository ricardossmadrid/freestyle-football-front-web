angular.module("freestyle").controller("playerController", function($rootScope, $scope, $http, $window, $cookies, $route) {
    
    $scope.playerInfo = {};
    
    $scope.ownPlayer = false;
    
    var init = function() {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/players?playerName=" + $rootScope.playerNameToShow;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.get(url)
            .success(function(playerInfo) {
                $scope.playerInfo = buildYoutubeUrl(playerInfo);
                $rootScope.authenticated = true;
                $scope.ownPlayer = $scope.playerInfo.ownPlayer;
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
    
    $scope.battleChallenge = function() {
        $rootScope.userChallenged = $scope.playerInfo.userName;
        $window.location.href = '#/battle-challenge';
    }
    
    var buildYoutubeUrl = function(playerInfo) {
        if (playerInfo.videos.length > 0) {
            for (var i = 0; i < playerInfo.videos.length; i++) {
                playerInfo.videos[i].youtubeUrl = "http://www.youtube.com/embed/" + playerInfo.videos[i].youtubeUrl;
            }
        }
        if (playerInfo.battles.length > 0) {
            for (var i = 0; i < playerInfo.battles.length; i++) {
                playerInfo.battles[i].youtubeUrlChallenger = "http://www.youtube.com/embed/" + playerInfo.battles[i].youtubeUrlChallenger;
                playerInfo.battles[i].youtubeUrlChallenged = playerInfo.battles[i].youtubeUrlChallenged !== null ? "http://www.youtube.com/embed/" + playerInfo.battles[i].youtubeUrlChallenged : null;
            }
        }
        return playerInfo;
    }
    
    $scope.sendChallengedVideo = function(battleId) {
        if (document.getElementById("challengedVideo" + battleId).value.trim() === "") {
            return;
        } else {
            var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/battles/response",
                datos = {
                    "id": battleId,
                    "youtubeUrlChallenged": document.getElementById("challengedVideo" + battleId).value
                };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
            $http.post(url, datos)
                .success(function() {
                    $route.reload();
                })
                .error(function() {
                    alert("Ha habido un error al publicar la respuesta");
                });
        }
    }
    
    $scope.battleVote = function(battleId, battleUserChallenged) {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/battles/vote",
            datos = {
                "id": battleId,
                "playerVoted": battleUserChallenged
            };
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.post(url, datos)
            .success(function() {
                $route.reload();
            })
            .error(function() {
                alert("No puedes votar este video si es tuyo o ya lo has votado");
            });
    }
    
    init();
    
});