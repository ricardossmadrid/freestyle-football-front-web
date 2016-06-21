angular.module("freestyle").controller("conversationController", function($rootScope, $scope, $http, $window, $cookies) {
    
    $scope.message = "";
    $scope.chatDiv = $window.document.getElementsByClassName("panel-body")[0];
    
    var init = function() {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/conversations?conversationalist=" + $rootScope.playerNameToShow;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.get(url)
            .success(function(conversation) {
                $scope.conversation = conversation;
            })
            .error(function() {
                alert("Ha ocurrido un problema al abrir la conversación");
                $window.location.href = '#/player';
            });
            
    }
    
    $scope.sendMessage = function() {
        var url = "http://localhost:8080/freestyle-football.0.0.1-SNAPSHOT/api/v0/conversations/message",
            datos = {
                "conversationId": $scope.conversation.conversationId,
                "message": $scope.message
            }   
        $http.defaults.headers.common['Authorization'] = 'Basic ' + btoa($cookies.get('accessToken') + ':');
        $http.post(url, datos)
            .success(function(conversation) {
                init();
                $scope.message = "";
            })
            .error(function() {
                alert("Ha ocurrido un problema al enviar el mensaje");
            })
    }
    
    $scope.refresh = function() {
        init();
    }
    
    init();
})