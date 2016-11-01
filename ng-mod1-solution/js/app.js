(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.menu = "";

  $scope.checkMenu = function () {
    if ($scope.menu.length == 0) {
      $scope.message = "Please enter data first";
    } else {
      var menuArray = $scope.menu.split(',');
      if (menuArray.length == 0) {
        $scope.message = "Please enter data first";
      } else if (menuArray.length > 3) {
        $scope.message = "Too much!";
      } else {
        $scope.message = "Enjoy!";
      }
    }
  };
}

})();
