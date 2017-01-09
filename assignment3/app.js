(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
  ;

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var controller = this;
    var MESSAGE="Nothing found";

    controller.found = [];
    controller.message = "";
    controller.searchTerm = "";

    controller.clicked = function ()  {
      console.log("Seaching for " +controller.searchTerm);
      if(controller.searchTerm.length !== 0) {
        MenuSearchService.getMatchedMenuItems(controller.searchTerm, controller.updateList);
      } else {
        controller.message = MESSAGE;
        controller.found = [];
      }
    }

    controller.updateList = function(list)
    {
      controller.found = list;
      if(list.length === 0) {
        controller.message = MESSAGE;
      } else {
        controller.message = "";
      }
    }

    controller.removeItem = function (itemIndex) {
      console.log("Removing item " + itemIndex);
      controller.found.splice(itemIndex, 1);
    };
  }

  function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '=',
          onRemove: '&',
        },
        controller: NarrowItDownController,
        controllerAs: 'list',
        bindToController: true
      };

      return ddo;
  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm, updateList)
      {
        makeMenuRequest().then(
            function (result) {
              if(result.status < 400)  {
                  var found = filterResults(result.data.menu_items, searchTerm);
                  updateList(found);
              }
            }
        )
      }

      function filterResults (results, term)
      {
        var searchTerm = term.toLowerCase();
        var filterResults = [];
        for (var result of results) {
          if(matches(result, searchTerm))  {
              filterResults.push(result);
          }
        }

        return filterResults;
      }

      function matches(result, term)
      {
        if(result.description.toLowerCase().indexOf(term) !== -1)  {
          return true;
        }

        return false;
      }

      function makeMenuRequest()
      {
        var response = $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        });

        return response;
      }
    }


}

)();
