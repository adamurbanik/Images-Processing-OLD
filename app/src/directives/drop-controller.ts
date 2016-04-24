class DropController {

  static $inject = ['galleryModule', 'fileModule']

  private galleryModule: GalleryModule;
  private fileModule: FileModule;
  private thumbs: string[];

  constructor(galleryModule: GalleryModule, fileModule: FileModule) {
    this.galleryModule = galleryModule;
    this.fileModule = fileModule;
    this.bindEvent();
  }

  bindEvent() {
    const $html = $("html");

    const stop = () => false;
    const onDrop = (e: Event) => this.onDrop(e);

    $html
      .on("dragover", stop)
      .on("dragleave", stop)
      .on("drop", onDrop);

  }

  onDrop(e: Event) {
    return this.processInput(<File[]>e.originalEvent.dataTransfer.files);
  }

  processInput(filesInput: File[]) {
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
  .controller('DropController', DropController);