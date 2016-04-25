class ImagesDropController {
  
  static $inject = ['imageProcessing', 'fileModule', 'appStorage']

  private galleryModule: ImageProcessing;
  private fileModule: FileModule;
  private appStorage: AppStorage;
  private thumbs: string[];
  private id: string;
  
  constructor(galleryModule: ImageProcessing, 
              fileModule: FileModule, 
              appStorage: AppStorage) {
                
    this.galleryModule = galleryModule;
    this.fileModule = fileModule;
    this.appStorage = appStorage;
    this.bindEvent();
  }

  bindEvent() {
    const $drop = $(`#${this.id}`);

    const onDrop = (e: Event) => this.onDrop(e);

    $drop
      .on("drop", onDrop);

  }

  onDrop(e: Event) {
    return this.processInput(<File[]>e.originalEvent.dataTransfer.files);
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
  .controller('imagesDropController', ImagesDropController);