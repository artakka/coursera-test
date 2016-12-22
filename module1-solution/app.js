(function () {
'use strict';

angular.module('LunchCheckerApp', [])

.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope'];

function LunchCheckerController ($scope) {
  $scope.message = "";
  $scope.dishList = "";
  $scope.textStyle={};

  $scope.updateMessage = function () {


    var itemCount = calcCount($scope.dishList);

    if(itemCount == 0)  {
        $scope.message = "Please enter data first"
        $scope.textStyle.style = {"color":"red", "border":"1px solid red"};
    }
    else
    {
      $scope.textStyle.style = {"color":"green", "border":"1px solid green"};

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
