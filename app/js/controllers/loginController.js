angular.module("freestyle").controller("loginController", function($rootScope, $scope, $http, $window, $cookies) {
    
    $rootScope.authenticated = false;
    
    $scope.credentials = {};
    
    $scope.showInfo = false;
    $scope.message = "";
    
    $scope.login = function() {
        if (!$scope.credentials.username || !$scope.credentials.password) {
            $scope.showInfo = true;
            $scope.message = 'Debes rellenar correctamente todos los campos';
        } else {
            $scope.showInfo = true;
            $scope.message = 'Procesando...';
            var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/tokens";
            $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($scope.credentials.username + ':' + $scope.credentials.password);
            $http.post(url)
                .success(function(token) {
                    $cookies.put('accessToken', token.token);
                    $rootScope.authenticated = true;
                    $rootScope.playerNameToShow = $scope.credentials.username;
                    $window.sessionStorage.setItem("playerLogged", $scope.credentials.username);
                    $rootScope.playerLogged = $scope.credentials.username;
                    $window.location.href = '#/player';
                })
                .error(function() {
                    $scope.showInfo = true;
                    $scope.message = 'Usuario o contraseña incorrectos';
                    $rootScope.authenticated = false;
                });
        }
    }
});