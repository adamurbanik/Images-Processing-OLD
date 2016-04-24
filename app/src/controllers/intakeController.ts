class IntakeController {

  static $inject = ['config'];

  private config: Config;
  public thumbs: string[] = []; 

  constructor(config: Config) {
    this.config = config;
  }
  
  showThumbs() {
    console.log('controller');
    console.log(this.thumbs);
  }
  
}

angular
  .module('imagesApp')
  .controller('IntakeController', IntakeController)
