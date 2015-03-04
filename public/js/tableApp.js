var app = angular.module('tableApp', ['ui.bootstrap']);

app.controller("MainCtrl", ['$scope', function ($scope) {
	$scope.visualisationContext = {
        customers : [
            {
                "Prénom": "Vivian",
                "Nom": "Madesclair",
                "Age": "28"
            },
            {
                "Prénom": "Pascal",
                "Nom": "Madesclair",
                "Age": "25"
            },
            {
                "Prénom": "Loic",
                "Nom": "Kaemmerlen",
                "Age": "24"
            }
        ],
        functions : {
            fCreate : function () {
                if (!confirm("Test create")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fUpdate : function (oldItem, newItem) {
                if (!confirm("Test update")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fDelete : function () {
                if (!confirm("Test delete")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fRead : function () {
                alert("Test read");
            }
        }
    };
    $scope.nb = 0;
    $scope.reload = function () {
        $scope.nb++;
        $scope.visualisationContext.customers[2].Nom = "reloaded " + $scope.nb;
    }
    
}]);

