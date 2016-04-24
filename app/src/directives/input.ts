function AppInputDirective() {
  return {
    restrict: 'EA',
    controller: InputController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      thumbs: '=',
      id: '@'
    }
  }
}

angular
  .module('imagesApp')
  .directive('appInput', AppInputDirective);