describe('signup', function () {

  var menuservice;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      menuservice = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
    });
  });

  it('should return successfully', function() {
    var short_name = 'L5';
    var l5obj = {"id":197,"short_name":"L5","name":"Chicken String Bean","description":"white meat chicken sauteed with string beans and soy sauce","price_small":null,"price_large":9.75,"small_portion_name":null,"large_portion_name":null,"created_at":"2016-11-28T03:31:55.811Z","updated_at":"2016-11-28T03:31:55.811Z","category_short_name":"L","image_present":true};
    $httpBackend.whenGET(ApiPath + '/menu_items/' + short_name + '.json').respond(l5obj);
    menuservice.getMenuItem(short_name).then(function(response) {
      expect(response).toEqual(l5obj);
    });
    $httpBackend.flush();
  });

});
