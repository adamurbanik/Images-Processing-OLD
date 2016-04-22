class IntakeController {


static $inject = ['config'];

  private config : Config;

  constructor(config: Config) {
    this.config = config;

  }

}

angular
  .module('imagesApp')
  .controller('IntakeController', IntakeController)
