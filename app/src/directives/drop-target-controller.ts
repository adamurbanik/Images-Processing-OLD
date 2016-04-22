class DropTargetController {

  thumbs: string[] = [];

  constructor(public fileModule: FileModule,
              public galleryModule: GalleryModule,
              public scope: ng.IScope | any,
              public element: ng.IAugmentedJQuery) {
                
    this.bindEvent();
  }

  bindEvent() {
    const $html = $("html");
    const $input = $("input[type=file]")

    const stop = () => false;
    const onDrop = (e: any) => this.onDrop(e);

    const onChange = (e: any) => this.onChange(e);

    $html
      .on("dragover", stop)
      .on("dragleave", stop)
      .on("drop", onDrop);

    $input
      .on("change", onChange);

    this.scope.$on('$destroy', () => {
      $html
        .off('dragover', stop)
        .off('dragleave', stop)
        .off('drop', onDrop)
        .off('change', onChange)
    });
  }

  onDrop(e: any) {
    return this.processInput(<any[]> e.originalEvent.dataTransfer.files);
  }

  onChange(e: any) {
    return this.processInput(<any[]> e.target.files);
  }
  
  processInput(filesInput: any[]) {
    this.galleryModule
      .loadImages(this.fileModule.validateFiles(filesInput))
      .then((data) => {
        this.thumbs = this.thumbs.concat(data);
      })
      .catch(() => 'loading images failed');

    return false;
  }

}


angular
  .module('imagesApp')
  .controller('DropTargetController', DropTargetController)
