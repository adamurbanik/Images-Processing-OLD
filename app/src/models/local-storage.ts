class AppLocalStorage {

  getStorage() {
    try {
      return JSON.parse(localStorage.getItem('thumbs')) || [];
    }
    catch(e) {
      return [];
    }
  }

  updateStorage(thumbs: string[]): string[] {
    localStorage.setItem('thumbs', angular.toJson(thumbs));
    return this.getStorage();
  }

}

angular
  .module('imagesApp')
  .service('appLocalStorage', AppLocalStorage);
