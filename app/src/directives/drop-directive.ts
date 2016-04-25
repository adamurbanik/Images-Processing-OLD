function DropDirective() {
  return {
    restrict: 'EA',
    controller: DropController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      id: '@'
    }
  }

}

angular
  .module('imagesApp')
  .directive('drop', DropDirective);