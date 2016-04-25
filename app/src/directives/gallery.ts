function GalleryDirective() {
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
  .directive('gallery', GalleryDirective);