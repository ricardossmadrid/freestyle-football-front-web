angular.module("freestyle").controller("registerController", function($rootScope, $scope, $http, $window) {
    
    $rootScope.authenticated = false;
    
    $scope.showInfo = false;
    $scope.message = "";
    
    $scope.userName = "";
    $scope.email = "";
    $scope.password = "";
    $scope.repeatPassword = "";
    $scope.birthDate = null;
    $scope.startingYear = "";
    $scope.summary = "";
    
    $scope.register = function () {
        if (!$scope.userName || !$scope.email || !$scope.password || !$scope.birthDate || !$scope.startingYear || !$scope.summary) {
            $scope.showInfo = true;
            $scope.message = 'Debes rellenar correctamente todos los campos';
        } else if ($scope.password === $scope.repeatPassword) {
            $scope.showInfo = true;
            $scope.message = 'Procesando...';
            var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/users",
                datos = {
                    "userName": $scope.userName,
                    "email": $scope.email,
                    "password": $scope.password,
                    "birthDate": $scope.birthDate,
                    "startingYear": $scope.startingYear,
                    "summary": $scope.summary
                };
            $http.defaults.headers.common['Authorization'] = '';
            $http.post(url, datos)
                .success(function(){
                    alert("Usuario creado")
                    $window.location.href = '#/login';
                })
                .error(function(){
                    $scope.message = 'El nombre de usuario o el correo electrónico ya existen en el sistema';
                });
            
        } else {
            $scope.showInfo = true;
            $scope.message = 'Los campos "Clave" y "Repetir clave" deben coincidir';
        }
    }
    
    $scope.open = function() {
      $scope.popup.opened = true;
    };
    
    $scope.popup = {
      opened: false
    };
});