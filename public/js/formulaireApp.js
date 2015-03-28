/*jslint vars: true*/
/*global angular,alert,confirm */

var app = angular.module('formulaire', ['ui.bootstrap']);

app.controller("DomainCtrl", function ($scope) {
    'use strict';
    /*$scope.visualisationContext = {
        customers : {
            *headers : [
                {"dataName": "Prénom", "test": "test!!"},
                {"dataName": "Nom"},
                {"dataName": "Age"}
            ],*
            content : [
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
            fRead : function () {
                alert("Test read");
            }
        }
    };*/
	$scope.currentDomain = {
		"domain" : {
			"parent": "http://localhost:8080/Mumodamas/Data",
			"name": "",
			"subDomains": ["Vivian", "Test"],
			"datas": {
                content : [
                    {
                        "name": "NomdeDonneeUnitaire",
                        "domain": "domainTest",
                        "size" : 0,
                        "values" : { "headers" : ["id", "D1"], "content" : [] }
                    },
                    {
                        "name": "NomdeDonneeAggregee",
                        "domain": "domainTest2",
                        "size" : 2,
                        "values" : { "headers" : ["id", "colonne1", "colVMA2"], "content" : [
                            {
                                "id" : 1,
                                "colonne1" : "v1",
                                "colVMA2" : "bla bla bla"
                            },
                            {
                                "id" : 2,
                                "colonne1" : "v2 test",
                                "colVMA2" : "prout VMA"
                            }
                        ]}
                    },
                    {
                        "name" : "test",
                        "domain": "domainTest2",
                        "size" : 2,
                        "values" : { "headers" : ["id", "D1"], "content" : [
                            {
                                "id" : 1,
                                "value" : "v1"
                            },
                            {
                                "id" : 2,
                                "value" : "v2"
                            }
                        ]}
                    },
                    {
                        "name" : "test vma 2",
                        "domain": "domainTest2",
                        "size" : 2,
                        "values" : { "headers" : ["id", "D1"], "content" : [
                            {
                                "id" : 1,
                                "value" : "val1"
                            },
                            {
                                "id" : 3,
                                "value" : "prout"
                            }
                        ]}
                    },
                    {
                        "name" : "customers",
                        "domain": "domainTest",
                        "size" : 3,
                        "values" : {
                            headers : [
                                {"dataName": "id"},
                                {"dataName": "Prénom", "test": "test!!"},
                                {"dataName": "Nom"},
                                {"dataName": "Age"}
                            ],
                            content : [
                                {
                                    "id": 1,
                                    "Prénom": "Vivian",
                                    "Nom": "Madesclair",
                                    "Age": "28"
                                },
                                {
                                    "id": 2,
                                    "Prénom": "Pascal",
                                    "Nom": "Madesclair",
                                    "Age": "25"
                                },
                                {
                                    "id": 3,
                                    "Prénom": "Loic",
                                    "Nom": "Kaemmerlen",
                                    "Age": "24"
                                }
                            ]
                        }
                    }
                ]
            }
		},
		"lastResponse" : "",
		"displayedDatas" : []
	};
    $scope.functions = {
        domain : {
            fCreate : function () {
                if (!confirm("Test data create")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fUpdate : function (oldItem, newItem) {
                if (!confirm("Test data update")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fDelete : function () {
                if (!confirm("Test data delete")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fRead : function (dataItem) {
                alert("Test data read");
                $scope.currentDomain.displayedDatas.push(dataItem);
            }
        },
        data : {
            fCreate : function () {
                if (!confirm("Test value create")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fUpdate : function (oldItem, newItem) {
                if (!confirm("Test value update")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fDelete : function () {
                if (!confirm("Test value delete")) {
                    $scope.$broadcast("DynamicTableCancel");
                }
            },
            fRead : function (dataItem) {
                alert("Test value read");
                $scope.currentDomain.displayedDatas.push(dataItem);
            }
        }
    };
});

app.controller("DomainTabsCtrl", function ($scope, $http) {
    'use strict';
	/*$scope.userLoading = false;
	$scope.loadData = function () {
		if (!$scope.currentDomain.isLoaded) {
			$scope.currentDomain.isLoading = true;
			$scope.url = "http://localhost:8080/Mumodamas/Data";
			$http.get($scope.url)
				.success(function (response) {
					$scope.currentDomain.domain = response;
					$scope.currentDomain.lastResponse = "OK - " + response;
					$scope.currentDomain.isLoading = false;
					$scope.currentDomain.isLoaded = true;
				})
				.error(function (response) {
					alert("erreur : " + response);
					$scope.currentDomain.lastResponse = "FAIL - " + response;
					$scope.currentDomain.isLoading = false;
					$scope.currentDomain.isLoaded = false;
				});
		}
	};
	$scope.loadUsers = function () {
		alert("Prout");
		$scope.userLoading = true;
	};*/
});

app.controller("UnitDataTabCtrl", function ($scope, $http) {
    'use strict';
	/*$scope.destroyingUnitDataTab = [];
	$scope.buildingUnitData = false;
	$scope.newUnitDataName = "";
	$scope.buildUnitData = function () {
		if ($scope.newUnitDataName === "") {
			alert("Bad name");
		} else {
			$scope.buildingUnitData = true;
*			$scope.url = $scope.currentDomain.domain.parent + "/"
						+ $scope.currentDomain.domain.name + "/"
						+ $scope.newUnitDataName + ".build";
			alert("Calling " + $scope.url);
			$http.get($scope.url)
				.success(function(response) {*
					$scope.clonedUnitData = {
							"name": $scope.newUnitDataName,
							"unit": true,
							"values": []
						};
					$scope.currentDomain.domain.datas.push($scope.clonedUnitData);
*					$scope.currentDomain.lastResponse = "OK - " + response;*
					$scope.newUnitDataName = "";
					$scope.buildingUnitData = false;
					$scope.viewUnitData($scope.clonedUnitData);
*				})
				.error(function(response) {
					$scope.currentDomain.lastResponse = "FAIL - " + response;
					$scope.buildingUnitData = false;
				});*
		}
	};
	$scope.destroyUnitData = function (unitData) {
		$scope.loaderIndex = $scope.destroyingUnitDataTab.push(unitData.name) - 1;
		$scope.index = $scope.currentDomain.domain.datas.indexOf(unitData);
		//$scope.currentDomain.domain.datas.splice($scope.index, 1);
		//$scope.destroyingUnitDataTab.splice($scope.loaderIndex, 1);
*		 TODO : fermer la consultation
		$scope.index = $scope.currentDomain.displayedDatas.indexOf(??);
		$scope.currentDomain.displayedDatas.splice??*
	};
	$scope.viewUnitData = function (dataItem) {
		$scope.currentDomain.displayedDatas.push(dataItem);
	};*/
});

app.filter('checkmark', function () {
    'use strict';
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});

app.filter('unitData', function () {
    'use strict';
    return function (input) {
        return input.values.headers.length <= 2 ? input : undefined;
    };
});

app.controller("UnitDataCtrl", function ($scope, $http) {
    'use strict';
    $scope.hideData = function ($id) {
		$scope.currentDomain.displayedDatas.splice($id, 1);
	};
	/*$scope.newValueItem = {"id": "N/C", "value": ""};
	$scope.hideData = function ($id) {
		$scope.currentDomain.displayedDatas.splice($id, 1);
	};
	$scope.createUnitValue = function (dataItem) {
		$scope.clonedNewValueItem = {
			"id" : "N/C",
			"value" : $scope.newValueItem.value
		};
		dataItem.values.push($scope.clonedNewValueItem);
		$scope.newValueItem.value = "";
	};*/
});

app.controller("UnitValueCtrl", function ($scope, $http) {
    'use strict';
	/*$scope.updateUnitValue = function (dataItem, valueItem) {
		// dataItem already up to date
		$scope.oldValue = valueItem.value;
*		var position = $scope.modifiedIndexes.indexOf($index);
		$scope.modifiedIndexes.splice(position, 1);
		$scope.modifiedOldValues.splice(position, 1);*
	};
	$scope.revertUnitValue = function (dataItem, valueItem) {
		$scope.index = dataItem.values.indexOf(valueItem);
		dataItem.values[$scope.iindex] = $scope.oldValue;
	};
	$scope.deleteUnitValue = function (dataItem, valueItem) {
		$scope.index = dataItem.values.indexOf(valueItem);
		dataItem.values.splice($scope.index, 1);
	};*/
});

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
