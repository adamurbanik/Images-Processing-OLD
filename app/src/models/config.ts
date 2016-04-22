class Config {
  
  thumbWidth: number;
  thumbHeight: number;
  elementsDistance: number;
  canvasWidth: string;
  canvasHeight: string;
  canvasColor: string;
    
  constructor() {
    this.thumbWidth = 150;
    this.thumbHeight = 150;
    this.elementsDistance = 2;
    this.canvasWidth = "1024";
    this.canvasHeight = "768";
    this.canvasColor = "#f2f2f2";
  }
    
}


angular
  .module('imagesApp')
  .service('config', Config);