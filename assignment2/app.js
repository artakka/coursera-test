(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  ;

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var controller = this;
    controller.items = ShoppingListCheckOffService.getShoppingItems();

    controller.bought = function (index)  {
      ShoppingListCheckOffService.moveItemToBought(index);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var controller = this;

    controller.items = ShoppingListCheckOffService.getBoughtItems();
  };


  var initialShoppingList = [
    {
      name: "pretzels", quantity: "12"
    },
    {
      name: "Milk",  quantity: "2"
    },
    {
      name: "Donuts",  quantity: "200"
    },
    {
      name: "Cookies", quantity: "300"
    },
    {
      name: "Chocolate", quantity: "5"
    }
  ];

  function ShoppingListCheckOffService() {
    var service = this;

    service.toBuyList = initialShoppingList;
    service.boughtList = [];

    service.moveItemToBought = function(index)  {
      var item = service.toBuyList[index];
      service.toBuyList.splice(index, 1);
      service.boughtList.push(item);
    }

    service.getShoppingItems = function () {
      return service.toBuyList;
    };

    service.getBoughtItems = function () {
      return service.boughtList;
    };

  }


}

)();
