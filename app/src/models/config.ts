interface Config {
  thumbWidth: number,
  thumbHeight: number,
  elementsDistance: number,
  canvasWidth: string,
  canvasHeight: string,
  canvasColor: string 
}

let Config = { 
  thumbWidth:  150,
  thumbHeight: 150,
  elementsDistance: 2,
  canvasWidth: '1024',
  canvasHeight: '768',
  canvasColor:  '#f2f2f2'
}


angular
  .module('imagesApp')
  .constant('config', Config);