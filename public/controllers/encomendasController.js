const creteApp = angular.module('creteApp', []);
creteApp.controller('encomendasController', ['$scope', '$http', function($scope, $http) {


    $http.get('./encomendas').then(function (response) {
        $scope.encomendas = response.data;
        console.log('edionay')
    }, function (error) {

    });
    
    $scope.consultaFrete = function () {
        console.log($scope.remetente);

        $http.get(`/encomendas/${$scope.remetente.cep}/${$scope.destinatario.cep}`).then(function (response) {
            console.log(response.data);
        }, function (error) {

        });
    }

}]);