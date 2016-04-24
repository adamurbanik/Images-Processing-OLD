function AppGalleryDirective() {
  return {
    templateUrl: 'tmpl/gallery.html',
    restrict: 'EA',
    replace: true,
    scope: {
      thumbs: '='
    }
  }
}

angular
  .module('imagesApp')
  .directive('appGallery', AppGalleryDirective);