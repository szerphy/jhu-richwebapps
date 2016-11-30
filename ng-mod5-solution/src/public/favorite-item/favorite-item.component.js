(function () {
  'use strict';

  angular.module('public')
  .component('favoriteItem', {
    templateUrl: 'src/public/favorite-item/favorite-item.html',
    bindings: {
      favoriteItem: '<'
    },
    controller: FavoriteItemController
  });


  FavoriteItemController.$inject = ['ApiPath'];
  function FavoriteItemController(ApiPath) {
    var $ctrl = this;
    $ctrl.basePath = ApiPath;
  }
})();
