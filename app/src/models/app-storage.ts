class AppStorage {

  static $inject = ['appLocalStorage'];

  thumbs: string[];
  appLocalStorage: AppLocalStorage;

  constructor(appLocalStorage: AppLocalStorage) {
    this.appLocalStorage = appLocalStorage;
  }

  addItem(thumb: string) : string[] {
    this.thumbs.push(thumb);
    this.appLocalStorage.updateStorage(this.thumbs);
    return this.thumbs;
  }

}

angular
  .module('imagesApp')
  .service('appStorage', AppStorage);
