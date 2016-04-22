interface IDimensions {
  "width": number,
  "height": number,
  "positionY": number,
  "positionX": number
}

class GalleryModule {

  static $inject = ['config', '$q', 'appStorage'];

  config: Config;
  $q: ng.IQService;
  appStorage: AppStorage;

  constructor(config: Config, $q: ng.IQService, appStorage: AppStorage) {
    this.config = config;
    this.$q = $q;
    this.appStorage = appStorage;
  }

  createThumb(url) {

  }

  loadImages(files: any[]): ng.IPromise<string[]> {
    return this.$q.all(files.map(file => this.getImageSource(file)));
  }


  getImageSource(file: any): ng.IPromise<string> {
    return this.$q((resolve, reject) => {

      let reader = new FileReader();

      reader.addEventListener('load', event => {
        const img = new Image();

        img.addEventListener('load', () => {
          let url = this.createStringThumb(this.config, img, this.calculateDimensions(this.config, img));

          resolve(url);
        });
        img.src = event.target.result;

        img.addEventListener('error', () => reject('nie udalo sie zaladowac img'));

      });

      if (file) {
        reader.readAsDataURL(file);

        reader.addEventListener('error', () => reject('nie udalo sie odczytac plik'));

      }

    });
  }

  createStringThumb(config: Config, img: HTMLImageElement, dimensionsObj: IDimensions): string {
    let lowCanvas = document.createElement("canvas");
    lowCanvas.width = config.thumbWidth;
    lowCanvas.height = config.thumbHeight;
    let ctx = lowCanvas.getContext("2d");
    ctx.fillStyle = config.canvasColor;
    ctx.fillRect(0, 0, lowCanvas.width, lowCanvas.height);
    ctx.drawImage(img, dimensionsObj["positionX"], dimensionsObj["positionY"], dimensionsObj["width"], dimensionsObj["height"]);
    let dataURL = lowCanvas.toDataURL();

    return dataURL;
  }

  calculateDimensions(config: Config, img: HTMLImageElement): IDimensions {
    let maxWidth = config.thumbWidth;
    let maxHeight = config.thumbHeight;
    let ratio = 0;
    let width = img.width;
    let height = img.height;
    let positionX = 0;
    let positionY = 0;

    if (width > maxWidth) {
      ratio = maxWidth / width;
      height = height * ratio;
      width = width * ratio;
    }
    if (height > maxHeight) {
      ratio = maxHeight / height;
      width = width * ratio;
      height = height * ratio;
    }

    positionY = (maxHeight - height) / 2;
    positionX = (maxWidth - width) / 2;

    let dimensionsObj: IDimensions = {
      "width": width,
      "height": height,
      "positionY": positionY,
      "positionX": positionX
    };

    return dimensionsObj;

  }

}

angular
  .module('imagesApp')
  .service('galleryModule', GalleryModule);


