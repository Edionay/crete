angular.module("crete", []);
angular.module("crete").controller("creteController", function ($scope) {
    $scope.remetente = {
        "nome": "",
        "cep": ""
    };
    $scope.destinatario = {
        "nome": "",
        "cep": ""
    };

})