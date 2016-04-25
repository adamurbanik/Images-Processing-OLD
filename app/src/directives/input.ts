function InputDirective() {
  return {
    restrict: 'EA'
  }
}

angular
  .module('imagesApp')
  .directive('appInput', InputDirective);