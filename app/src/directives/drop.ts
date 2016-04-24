function AppDropDirective() {
  return {
    templateUrl: 'tmpl/drop.html',
    restrict: 'EA',
    replace: true,
    controller: DropController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      thumbs: '='
    }
  }

}

angular
  .module('imagesApp')
  .directive('appDrop', AppDropDirective);