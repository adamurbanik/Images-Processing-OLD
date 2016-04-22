(function() {

  function appDropTargetDirective(fileModule, galleryModule) {
      return {
        templateUrl: 'tmpl/drop-target.html',
        restrict: 'E',
        replace: true,
        scope: {},
        link: (scope: ng.IScope|any,
               element: ng.IAugmentedJQuery,
               attrs: ng.IAttributes) => {
          scope.vm = new DropTargetController(fileModule, galleryModule, scope, element);
        }
      }
  }

  appDropTargetDirective.$inject = ['fileModule', 'galleryModule'];

  angular
    .module('imagesApp')
    .directive('appDropTarget', appDropTargetDirective)

})();

