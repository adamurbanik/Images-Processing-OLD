function AppGalleryDirective() {
  return {
    templateUrl: 'tmpl/gallery.html',
    restrict: 'EA',
    replace: true,
    controller: GalleryController,
    controllerAs: 'vm',
    bindToController: true,
    scope: {
      thumbs: '='
    }
  }
}

angular
  .module('imagesApp')
  .directive('appGallery', AppGalleryDirective);