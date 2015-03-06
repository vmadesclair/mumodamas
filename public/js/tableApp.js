/*jslint vars: true*/
/*global angular,alert,confirm */

var app = angular.module('tableApp', ['ui.bootstrap']);

app.controller("MainCtrl", ['$scope', function ($scope) {
    'use strict';
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
        $scope.nb = $scope.nb + 1;
        $scope.visualisationContext.customers[2].Nom = "reloaded " + $scope.nb;
    };
    
    $scope.startLoad = function () {
        $scope.$broadcast("loading");
    };
    $scope.stopLoad = function () {
        $scope.$broadcast("loaded");
    };
    
}]);

