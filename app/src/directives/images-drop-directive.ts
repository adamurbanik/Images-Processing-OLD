function imagesDropDirective () {
  return {
    templateUrl: 'tmpl/drop.html',
    restrict: 'EA',
    replace: true,
    controller: ImagesDropController,
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
  .directive('imagesDrop', imagesDropDirective)