(function () {
'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.itemBought = function (itemIndex) {
      ShoppingListCheckOffService.itemBought(itemIndex);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getItemsBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // populate to buy items
    var itemsToBuy = [
      {name: 'apples', quantity: 12},
      {name: 'bananas', quantity: 8},
      {name: 'avocados', quantity: 6},
      {name: 'tomatoes', quantity: 4},
      {name: 'green peppers', quantity: 2},
      {name: 'onions', quantity: 6}
    ];
    var itemsBought = [];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    }

    service.getItemsBought = function () {
      return itemsBought;
    }

    service.itemBought = function (itemIndex) {
      itemsBought.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex, 1);
    }
  }
})();
