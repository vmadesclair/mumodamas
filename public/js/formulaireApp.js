var app = angular.module('formulaire', ['ui.bootstrap']);

app.controller("DomainCtrl", function ($scope){
	$scope.currentDomain = {
		"domain" : {
			"parent": "http://localhost:8080/Mumodamas/Data",
			"name": "",
			"subDomains": ["Vivian","Test"],
			"datas": [
				{
					"name": "NomdeDonneeUnitaire",
					"unit": true,
					"values" : []
				},
				{
					"name": ["NomdeDonneeAggregee", "colonne1", "colVMA2"],
					"unit": false,
					"values" : [
						{
							"id" : 1,
							"value" : ["v1","bla bla bla"]
						},
						{
							"id" : 2,
							"value" : ["v2 test","prout VMA"]
						}
					]
				},
				{
					"name" : "test",
					"unit" : true,
					"values" : [
						{
							"id" : 1,
							"value" : "v1"
						},
						{
							"id" : 2,
							"value" : "v2"
						}
					]
				},
				{
					"name" : "test vma 2",
					"unit" : true,
					"values" : [
						{
							"id" : 1,
							"value" : "val1"
						},
						{
							"id" : 3,
							"value" : "prout"
						}
					]
				}
			]
		},
		"isLoaded" : true,
		"isLoading" : false,
		"lastResponse" : "",
		"displayedDatas" : []
	};
});

app.controller("DomainTabsCtrl", function ($scope, $http){
	$scope.userLoading = false;
	$scope.loadData = function() {
		if (!$scope.currentDomain.isLoaded){
			$scope.currentDomain.isLoading = true;
			$scope.url = "http://localhost:8080/Mumodamas/Data";
			$http.get($scope.url)
				.success(function(response) {
					$scope.currentDomain.domain = response;
					$scope.currentDomain.lastResponse = "OK - " + response;
					$scope.currentDomain.isLoading = false;
					$scope.currentDomain.isLoaded = true;
				})
				.error(function(response) {
					alert("erreur : " + response);
					$scope.currentDomain.lastResponse = "FAIL - " + response;
					$scope.currentDomain.isLoading = false;
					$scope.currentDomain.isLoaded = false;
				});
		}
	}
	$scope.loadUsers = function() {
		alert("Prout");
		$scope.userLoading = true;
	}
});

app.controller("UnitDataTabCtrl", function ($scope, $http){
	$scope.destroyingUnitDataTab = [];
	$scope.buildingUnitData = false;
	$scope.newUnitDataName = "";
	$scope.buildUnitData = function() {
		if ($scope.newUnitDataName == ""){
			alert("Bad name");
		}else{
			$scope.buildingUnitData = true;
/*			$scope.url = $scope.currentDomain.domain.parent + "/"
						+ $scope.currentDomain.domain.name + "/"
						+ $scope.newUnitDataName + ".build";
			alert("Calling " + $scope.url);
			$http.get($scope.url)
				.success(function(response) {*/
					$scope.clonedUnitData = {
							"name": $scope.newUnitDataName,
							"unit": true,
							"values": []
						};
					$scope.currentDomain.domain.datas.push($scope.clonedUnitData);
					/*$scope.currentDomain.lastResponse = "OK - " + response;*/
					$scope.newUnitDataName = "";
					$scope.buildingUnitData = false;
					$scope.viewUnitData($scope.clonedUnitData);
/*				})
				.error(function(response) {
					$scope.currentDomain.lastResponse = "FAIL - " + response;
					$scope.buildingUnitData = false;
				});*/
		}
	}
	$scope.destroyUnitData = function(unitData) {
		$scope.loaderIndex = $scope.destroyingUnitDataTab.push(unitData.name) - 1;
		$scope.index = $scope.currentDomain.domain.datas.indexOf(unitData);
		//$scope.currentDomain.domain.datas.splice($scope.index, 1);
		//$scope.destroyingUnitDataTab.splice($scope.loaderIndex, 1);
		/* TODO : fermer la consultation
		$scope.index = $scope.currentDomain.displayedDatas.indexOf(??);
		$scope.currentDomain.displayedDatas.splice??*/
	}
	$scope.viewUnitData = function(dataItem) {
		$scope.currentDomain.displayedDatas.push(dataItem);
	}
});

app.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

app.controller("UnitDataCtrl", function ($scope, $http){
	$scope.newValueItem = {"id": "N/C", "value": ""};
	$scope.hideData = function($id) {
		$scope.currentDomain.displayedDatas.splice($id, 1);
	}
	$scope.createUnitValue = function(dataItem){
		$scope.clonedNewValueItem = {
			"id" : "N/C",
			"value" : $scope.newValueItem.value
		};
		dataItem.values.push($scope.clonedNewValueItem);
		$scope.newValueItem.value = "";
	}
});

app.controller("UnitValueCtrl", function ($scope, $http){
	$scope.updateUnitValue = function(dataItem, valueItem){
		// dataItem already up to date
		$scope.oldValue = valueItem.value;
		/*var position = $scope.modifiedIndexes.indexOf($index);
		$scope.modifiedIndexes.splice(position, 1);
		$scope.modifiedOldValues.splice(position, 1);*/
	}
	$scope.revertUnitValue = function(dataItem, valueItem){
		$scope.index = dataItem.values.indexOf(valueItem);
		dataItem.values[index] = $scope.oldValue;
	}
	$scope.deleteUnitValue = function(dataItem, valueItem){
		$scope.index = dataItem.values.indexOf(valueItem);
		dataItem.values.splice(index, 1);
	}
});
