class ImagesInputController {

  static $inject = ['imageProcessing', 'fileModule', 'appStorage'];

  private galleryModule: ImageProcessing;
  private fileModule: FileModule;
  private thumbs: string[];
  private id: string;
  private appStorage: AppStorage;

  constructor(galleryModule: ImageProcessing, 
              fileModule: FileModule,
              appStorage: AppStorage) {
    
    this.galleryModule = galleryModule;
    this.fileModule = fileModule;
    this.appStorage = appStorage;

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
        this.thumbs = this.appStorage.addItems(data);
      })
      .catch(() => 'loading images failed');

    return false;
  }

}

angular
  .module('imagesApp')
  .controller('ImagesInputController', ImagesInputController);
