const creteApp = angular.module('creteApp', []);
creteApp.controller('encomendasController', ['$scope', '$http', function($scope, $http) {

    
    $scope.consultaFrete = function () {
        // console.log($scope.remetente);

        $http.get(`/encomendas/${$scope.remetente.cep}/${$scope.destinatario.cep}`).then(function (response) {
            console.log(response.data);
            $scope.encomenda = response.data;
            console.log($scope.encomenda.dataDeEntrega);
            const dataDeEntrega = new Date($scope.encomenda.dataDeEntrega);
            $scope.diaDeEntrega =  dataDeEntrega.getDate();
            $scope.mesDeEntrega =  dataDeEntrega.getMonth();
            $scope.anoDeEntrega =  dataDeEntrega.getFullYear();
        }, function (error) {

        });
    }

}]);