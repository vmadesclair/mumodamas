/*jslint vars: true*/
/*global app,angular,alert,confirm */


/**
 * TODO : Régler le pb du chargement d'un tableau vide
 * Il s'agit du mm pb de champs non initialisé lors de la création d'une ligne
 * -> Décallages de champs. Le format d'entrée doit être différent
 */

app.directive("dynamicTable", function () {
    'use strict';
	function DynTableCtrl($scope, $timeout) {
        // Loop var
        var key, item;
        
        // Variables
        $scope.tableContext = {
            cancelBtn : true,
            historyMax : 4,
            newRow : {},
            history : [ angular.copy($scope.tableRows) ]
        };
        $scope.tmr = undefined; //cancellation timer
        
        if (typeof $scope.tableHead === 'undefined' || typeof $scope.tableHead.length === 'undefined' || $scope.tableHead.length === 0) {
            $scope.tableHead = [];
            if (typeof $scope.tableRows === 'undefined' || typeof $scope.tableRows.length === 'undefined' || $scope.tableRows.length === 0 || typeof $scope.tableRows[0] === 'undefined') {
                $scope.tableElement.addClass("load-error");
            } else {
                for (key in $scope.tableRows[0]) {
                    if ($scope.tableRows[0].hasOwnProperty(key) && key.slice(0, 2) !== '$$') {
                        item = { "dataName": key };
                        $scope.tableHead.push(item);
                    }
                }
            }
            
        }
        
        // Functions
        $scope.hasHistory = function () {
            if ($scope.tableContext.history.length > 1) {
                return true;
            } else {
                return false;
            }
        };
        $scope.isHistoryFull = function () {
            if ($scope.tableContext.history.length >= $scope.tableContext.historyMax) {
                return true;
            } else {
                return false;
            }
        };
        $scope.addHistory = function (newState) {
            if ($scope.isHistoryFull()) {
                $scope.tableContext.history.splice(0, 1);
            }
            $scope.tableContext.history.push(angular.copy(newState));
            if ($scope.tableElement.hasClass("no-history")) {
                $scope.tableElement.removeClass("no-history");
            }
        };
        $scope.tableCancel = function () {
            if ($scope.hasHistory()) {
                var idx = $scope.tableContext.history.length - 1;
                $scope.tableContext.history.splice(idx, 1);
                idx = $scope.tableContext.history.length - 1;
                $scope.tableRows = angular.copy($scope.tableContext.history[idx]);
                if (!$scope.hasHistory()) {
                    $scope.tableElement.addClass("no-history");
                }
                return true;
            } else {
                return false;
            }
        };
        $scope.tableFunctions = {
            tCreate : function () {
                var addedItem = {};
                var prop;
                for (prop in $scope.tableContext.newRow) {
                    if ($scope.tableContext.newRow.hasOwnProperty(prop)) {
                        addedItem[prop] = $scope.tableContext.newRow[prop];
                        $scope.tableContext.newRow[prop] = "";
                    }
                }
                $scope.tableRows.push(addedItem);
                $scope.addHistory($scope.tableRows);
                if ($scope.externals.fCreate) {
                    $scope.externals.fCreate();
                }
            },
            tUpdate : function (oldItem, newItem) {
                var idx = $scope.tableRows.indexOf(oldItem);
                $scope.tableRows.splice(idx, 1, newItem);
                $scope.addHistory($scope.tableRows);
                if ($scope.externals.fUpdate) {
                    $scope.externals.fUpdate(oldItem, newItem);
                }
            },
            tDelete : function (item) {
                var idx = $scope.tableRows.indexOf(item);
                $scope.tableRows.splice(idx, 1);
                $scope.addHistory($scope.tableRows);
                if ($scope.externals.fDelete) {
                    $scope.externals.fDelete();
                }
            },
            tRead : function (item) {
                //TODO
                if ($scope.externals.fRead) {
                    $scope.externals.fRead();
                }
            },
            tModify : function () {
                if ($scope.externals.fModify) {
                    $scope.externals.fModify();
                }
            }
        };
        
        // Event management
        $scope.$on('DynamicTableCancel', function () {
            $timeout.cancel($scope.tmr);
            $scope.tmr = $timeout(function () {
                $scope.tableCancel();
            }, 500); //timeout to prevent some IHM behavior pb
        });
    }
    
    return {
        controller: DynTableCtrl,
        link: function ($scope, element, attrs) {
            $scope.tableElement = element;
            $scope.tableElement.addClass("no-history");
        },
        restrict: 'E',
        transclude: false,
        replace: true,
		scope: {
            tableHead: '=headers',
            tableRows: '=rows',
            externals: '=functions'
		},
		templateUrl: 'table-template.htm'
	};
});

app.directive("dynamicTableRow", function () {
    'use strict';
	function DynTableRowCtrl($scope, $timeout) {
        $scope.tableRowContext = {
            row : angular.copy($scope.item),
            originalRow : $scope.item
        };
        $scope.rowUpdate = function () {
            if ($scope.rowElement.hasClass("changed")) {
                $scope.rowElement.addClass("unchanged");
                $scope.rowElement.removeClass("changed");
                $scope.externals.tUpdate($scope.item, $scope.tableRowContext.row);
                $scope.tableRowContext.originalRow = angular.copy($scope.tableRowContext.row);
            }
        };
        $scope.rowCancel = function () {
            if ($scope.rowElement.hasClass("changed")) {
                if (confirm("This will cancel all changes in this row until the last validation.")) {
                    $scope.tableRowContext.row = angular.copy($scope.tableRowContext.originalRow);
                    $scope.rowElement.addClass("unchanged");
                    $scope.rowElement.removeClass("changed");
                }
            }
        };
        $scope.rowDelete = function () {
            $scope.externals.tDelete($scope.item);
        };
        $scope.rowRead = function () {
            $scope.externals.tRead($scope.item);
        };
        $scope.revertPreviewMOver = function () {
            $scope.rowElement.addClass("revert-preview");
        };
        $scope.revertPreviewMOut = function () {
            $scope.rowElement.removeClass("revert-preview");
        };
        $scope.modified = function (key, value) {
            $scope.tableRowContext.row[key] = value;
            $scope.rowElement.removeClass("unchanged");
            $scope.rowElement.addClass("changed");
        };
    }
    
    return {
        controller: DynTableRowCtrl,
        link: function ($scope, element, attrs) {
            $scope.rowElement = element;
            $scope.rowElement.addClass("unchanged");
        },
        restrict: 'A',
        transclude: false,
        replace: true,
		scope: {
            item: '=',
            externals: '=functions'
		},
		templateUrl: 'row-template.htm'
	};
});

app.directive('ngEnter', ['$timeout', function ($timeout) {
    'use strict';
    return {
        link: function ($scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    $timeout.cancel($scope.tmr);
                    $scope.tmr = $timeout(function () {
                        $scope.$apply(function () {
                            $scope.$eval(attrs.ngEnter);
                        });
                        event.preventDefault();
                    }, 10); //timeout to prevent some angular exception
                }
            });
        }
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