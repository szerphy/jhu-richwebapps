(function () {
  'use strict';

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService', 'UserService'];
  function SignupController(MenuService, UserService) {
    var signup = this;
    signup.user = {};

    signup.submit = function () {
      UserService.storeUser(signup.user);
      signup.saved = true;
    }

    signup.validateFavoriteDish = function () {
      // validate favorite dish
      if (signup.user.favorite === undefined) {
        signup.form.favorite.$setValidity('valid', false);
      } else {
        signup.user.favorite = signup.user.favorite.toUpperCase();
        MenuService.getMenuItem(signup.user.favorite)
          .then(function () {
            signup.form.favorite.$setValidity('valid', true);
          })
          .catch(function () {
            signup.form.favorite.$setValidity('valid', false);
          });
      }
    }
  }
})();
