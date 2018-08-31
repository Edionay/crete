const creteApp = angular.module('creteApp', ['ngMask']);
creteApp.controller('encomendasController', ['$scope', '$http', function($scope, $http) {

    $scope.remetente = "";


    $scope.consultaFrete = function () {

        $http.get(`/encomendas/${$scope.remetente}/${$scope.destinatario}`).then(function (response) {
            console.log(response.data);
            $scope.encomenda = response.data;
            console.log($scope.encomenda.dataDeEntrega);
            const dataDeEntrega = new Date($scope.encomenda.dataDeEntrega);
            $scope.diaDeEntrega =  dataDeEntrega.getDate();
            $scope.mesDeEntrega =  dataDeEntrega.getMonth();
            $scope.anoDeEntrega =  dataDeEntrega.getFullYear();
            exibirResultado();
        }, function (error) {

        });
    };

    function exibirResultado() {
        let survivorInfo = document.getElementById('resultado');
        survivorInfo.style.display = 'block';
    }
    function ocultarResultado() {
        const survivorInfo = document.getElementById('resultado');
        survivorInfo.style.display = 'none';
    }

    function exibirLoader() {
        const loader = document.getElementById('loader');
        survivorInfo.style.display = 'none';
    }

    function ocultarLoader() {
        const loader = document.getElementById('loader');
        survivorInfo.style.display = 'none';
    }

    ocultarResultado();


}]);