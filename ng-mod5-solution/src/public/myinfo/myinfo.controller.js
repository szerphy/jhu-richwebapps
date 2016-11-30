(function () {
  'use strict';

  angular.module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['MenuService', 'UserService'];
  function MyInfoController(MenuService, UserService) {
    var myinfo = this;
    myinfo.user = UserService.getUser();

    if (myinfo.user) {
      MenuService.getMenuItem(myinfo.user.favorite)
        .then(function(result) {
          myinfo.favorite_dish = result;
        });
    }
  }
})();
