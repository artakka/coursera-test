(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])

  .controller('LunchCheckerController', LunchCheckerController);

  LunchCheckerController.$inject = ['$scope'];

  function LunchCheckerController ($scope) {
    $scope.message = "";
    $scope.dishList = "";
    $scope.textStyle={};
    $scope.msgStyle={};

    $scope.updateMessage = function () {

      var itemCount = calcCount($scope.dishList);

      if(itemCount == 0)  {
          $scope.textStyle.style = {"border":"2px solid red"};
          $scope.msgStyle.style = {"color":"red"};
          $scope.message = "Please enter data first"
      }
      else
      {
        $scope.textStyle.style = {"border":"2px solid green"};
        $scope.msgStyle.style = {"color":"green"};

        if(itemCount > 3)
        {
          $scope.message = "Too much!"
        } else {
          $scope.message = "Enjoy!"
        }
      }
  };

  function calcCount(itemsStr)
  {
    var splitArray = itemsStr.split(",");
    var filteredSplitArray = splitArray.filter(
      function(n){
        return n.trim() != ""
      }
    );

    return filteredSplitArray.length;
  }

}


})();
