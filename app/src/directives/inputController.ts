class InputController {

  static $inject = ['galleryModule', 'fileModule']

  private galleryModule: GalleryModule;
  private fileModule: FileModule;
  private thumbs: string[];
  private id: string;

  constructor(galleryModule: GalleryModule, fileModule: FileModule) {
    this.galleryModule = galleryModule;
    this.fileModule = fileModule;

    this.bindEvent();
  }

  bindEvent() {
    const $input = $(`#${this.id}`);

    const onChange = (e: Event) => this.onChange(e);

    $input
      .on('change', onChange);
  }

  onChange(e: Event) {
    return this.processInput(<File[]>e.target.files);
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
  .controller('InputController', InputController);