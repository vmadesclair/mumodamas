/*jslint vars: true*/
/*global angular,alert,confirm */

var app = angular.module('tableApp', ['ui.bootstrap']);

app.controller("MainCtrl", ['$scope', function ($scope) {
    'use strict';
	$scope.visualisationContext = {
        customers : {
            headers : [
                {"dataName": "Prénom", "test": "test!!"},
                {"dataName": "Nom"},
                {"dataName": "Age"}
            ],
            content : [
                /*{
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
                }*/
            ]
        },
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
            fRead : function (dataItem) {
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
    $scope.errorLoad = function () {
        $scope.$broadcast("load-error");
    };
    
}]);

app.directive('ngEnableLoader', ['$timeout', function ($timeout) {
    'use strict';
    return {
        restrict: 'A',
        transclude: true,
        replace: false,
		scope: { },
        templateUrl: '../../loadable-template.htm',
        link: function ($scope, element, attrs) {
            element.addClass("loaded");
            $scope.$on("loading", function (event) {
                element.removeClass("load-error");
                element.removeClass("loaded");
                element.addClass("loading");
                $timeout.cancel($scope.tmr);
                $scope.tmr = $timeout(function () {
                    element.removeClass("loading");
                    element.removeClass("load-error");
                    element.addClass("loaded");
                }, 10000); //timeout on the loader : 10s
            });
            $scope.$on("loaded", function (event) {
                $timeout.cancel($scope.tmr);
                element.removeClass("loading");
                element.removeClass("load-error");
                element.addClass("loaded");
            });
            $scope.$on("load-error", function (event) {
                $timeout.cancel($scope.tmr);
                element.removeClass("loading");
                element.removeClass("loaded");
                element.addClass("load-error");
            });
        }
    };
}]);

