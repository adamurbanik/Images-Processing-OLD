class DropTargetController {

  static $inject = ['fileModule'];

  fileModule: FileModule;

  constructor(fileModule: FileModule) {
    this.fileModule = fileModule;
  }
  
  


}


angular
  .module('imagesApp')
  .controller('DropTargetController', DropTargetController)
