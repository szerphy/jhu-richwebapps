(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.found = [];

    narrow.narrowItDown = function () {
      if (narrow.searchTerm === undefined || narrow.searchTerm.length == 0) {
        narrow.found = [];
      } else {
        var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
        promise.then(function (result) {
          narrow.found = result;
        });
      }
    };

    narrow.removeItem = function (index) {
      narrow.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
	        method: "GET",
	        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        }).then(function (result) {
          var items = result.data.menu_items;
          var foundItems = [];
          items.forEach(function (item) {
            if (item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
              foundItems.push(item);
            }
          });
          return foundItems;
        });
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'templates/found-items.html',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
	  };
	  return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.itemsInList = function () {
      return list.foundItems.length > 0;
    };
  }
})();
