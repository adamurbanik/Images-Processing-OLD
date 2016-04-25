class AppStorage {

  static $inject = ['appLocalStorage'];

  private thumbs: string[];
  private appLocalStorage: AppLocalStorage;

  constructor(appLocalStorage: AppLocalStorage) {
    this.appLocalStorage = appLocalStorage;
    this.thumbs = appLocalStorage.getStorage();
  }

  addItems(thumbs: string[]): string[] {
    thumbs.forEach((thumb: string) => {
      this.thumbs.push(thumb);
    });
    return this.appLocalStorage.updateStorage(this.thumbs);
  }
  
  getItems(): string[]  {
    return this.thumbs;
  }



}

angular
  .module('imagesApp')
  .service('appStorage', AppStorage);
