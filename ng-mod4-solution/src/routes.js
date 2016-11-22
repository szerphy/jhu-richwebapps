(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.template.html'
      })
      // categories list page
      .state('categories', {
        url: '/categories',
        templateUrl: 'templates/main-categories.template.html',
        controller: 'MainCategoriesController as catCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      // items list page
      .state('items', {
        url: '/items/{category}',
        templateUrl: 'templates/main-items.template.html',
        controller: 'MainItemsController as itemsCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
		        return MenuDataService.getItemsForCategory($stateParams.category);
		      }]
        }
      });
  }
})();
