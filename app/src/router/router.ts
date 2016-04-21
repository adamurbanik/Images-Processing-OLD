class configureRoute {

  static $inject = ['$stateProvider', '$urlRouterProvider'];

  constructor(public $stateProvider: angular.ui.IStateProvider,
              public $urlRouterProvider: angular.ui.IUrlRouterProvider) {

              $urlRouterProvider.otherwise("/");

              $stateProvider

                .state('root', {
                url: "/",
                templateUrl: 'tmpl/home.html',
                controller: 'IntakeController',
                controllerAs: 'vm'
              });


  }

}

angular.module('imagesApp')
  .config(configureRoute);
