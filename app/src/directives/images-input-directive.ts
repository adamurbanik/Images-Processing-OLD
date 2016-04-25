function InputImagesDirective() {
  return {
    restrict: 'EA',
    controller: ImagesInputController,
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
  .directive('inputImages', InputImagesDirective);