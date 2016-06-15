angular.module("freestyle").controller("battleChallengeController", function($rootScope, $scope, $http, $window, $cookies) {
    
    
    $scope.showInfo = false;
    $scope.message = "";
    
    $scope.title = "";
    $scope.description = "";
    $scope.youtubeUrl = "";
    
    var init = function() {
        if (!$rootScope.authenticated) {
            $window.location.href = '#/player';
        }
    }
    
    $scope.battleChallenge = function() {
        if (!$scope.title || !$scope.description || !$scope.youtubeUrl) {
            $scope.showInfo = true;
            $scope.message = 'Debes rellenar correctamente todos los campos';
        } else {
            $scope.showInfo = true;
            $scope.message = 'Procesando...';
            var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/battles/challenge",
                datos = {
                    "title": $scope.title,
                    "description": $scope.description,
                    "youtubeUrl": $scope.youtubeUrl,
                    "userChallenged": $rootScope.userChallenged
                };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
            $http.post(url, datos)
                .success(function(respuesta){
                    alert("Batalla creada");
                    $rootScope.userChallenged = "";
                    $window.location.href = '#/player';
                })
                .error(function(respuesta){
                    $scope.message = 'Ha ocurrido un error al crear la batalla, prueba de nuevo';
                });
        }
    }
    
    init();
    
});