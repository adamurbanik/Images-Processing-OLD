function AppInputDirective() {
  return {
    templateUrl: 'tmpl/input.html',
    restrict: 'EA',
    replace: true,
    controller: InputController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      thumbs: '='
    }
  }
}

angular
  .module('imagesApp')
  .directive('appInput', AppInputDirective);