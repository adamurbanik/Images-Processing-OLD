class AppLocalStorage {

  getStorage() {
    try {
      return JSON.parse(localStorage.getItem('thumbs')) || [];
    }
    catch(e) {
      return [];
    }
  }

  updateStorage(thumbs) {
    localStorage.setItem('thumbs', angular.toJson(thumbs));
  }

}

angular
  .module('imagesApp')
  .service('appLocalStorage', AppLocalStorage);
