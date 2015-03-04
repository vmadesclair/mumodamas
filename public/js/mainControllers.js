
app.controller("mainController", function ($scope){
	$scope.globalProperties={logged:true,lastResponse:'no request yet',username:'Vivian',password:''};
});

app.controller('AlertCtrl', function ($scope) {
  $scope.selected = undefined;
  $scope.types = ['danger','warning','success','info'];
  $scope.alerts = [];

  $scope.addAlert = function(type) {
    $scope.alerts.push({type: type, msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});

app.controller("loginController", function ($scope, $http){
	$scope.login = function() {
        $scope.url = "http://localhost:8080/Mumodamas/Login?login=" + $scope.$parent.globalProperties.username + "&password=" + $scope.$parent.globalProperties.password;
		$http.get($scope.url)
			.success(function(response) {
				$scope.$parent.globalProperties.lastResponse="Call succeeded : " + response;
				$scope.$parent.globalProperties.logged=true;
			})
			.error(function(response) {
				$scope.$parent.globalProperties.lastResponse="Call failed : " + response;
			});
	}
});

app.controller("dataController", function ($scope, $http){
	$scope.data={domain:'http://localhost:8080/Mumodamas/RootData',name:'Prout',values:['test1','test2']};
	$scope.dataRequestInProgress = false;
	$scope.insert = function() {
		$scope.dataRequestInProgress = true;
        $scope.url = $scope.data.domain + "/" + $scope.data.name + "=" + $scope.insertValue + "?login=" + $scope.$parent.globalProperties.username;
		alert("Prout");
		$http.get($scope.url)
			.success(function(response) {
				$scope.$parent.globalProperties.lastResponse="Call succeded : " + response;
				$scope.data.values.push($scope.insertValue);
			})
			.error(function(response) {
				$scope.$parent.globalProperties.lastResponse="Call failed : " + response;
			});
	}
});
