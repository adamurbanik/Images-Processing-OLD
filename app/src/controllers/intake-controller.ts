class IntakeController {

  static $inject = ['config', 'appStorage'];

  private config: Config;
  private appStorage: AppStorage;
  public thumbs: string[] = []; 

  constructor(config: Config, appStorage: AppStorage) {
    this.config = config;
    this.appStorage = appStorage;
    
    this.thumbs = this.appStorage.getItems();
    console.log(this.thumbs);
  }
  
  showThumbs() {
    console.log('controller');
    console.log(this.thumbs);
  }
  
}

angular
  .module('imagesApp')
  .controller('IntakeController', IntakeController)
