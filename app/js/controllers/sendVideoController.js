angular.module("freestyle").controller("sendVideoController", function($rootScope, $scope, $http, $window, $cookies) {
    
    
    $scope.showInfo = false;
    $scope.message = "";
    
    $scope.title = "";
    $scope.place = "";
    $scope.youtubeUrl = "";
    
    var init = function() {
        if (!$rootScope.authenticated) {
            $window.location.href = '#/player';
        }
    }
    
    $scope.sendVideo = function() {
        if (!$scope.title || !$scope.place || !$scope.youtubeUrl) {
            $scope.showInfo = true;
            $scope.message = 'Debes rellenar correctamente todos los campos';
        } else {
            $scope.showInfo = true;
            $scope.message = 'Procesando...';
            var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/videos",
                datos = {
                    "title": $scope.title,
                    "place": $scope.place,
                    "youtubeUrl": $scope.youtubeUrl
                };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
            $http.post(url, datos)
                .success(function(respuesta){
                    alert("Video subido")
                    $window.location.href = '#/player';
                })
                .error(function(respuesta){
                    $scope.message = 'Ha ocurrido un error al subir el video, prueba de nuevo';
                });
        }
    }
    
    init();
    
});