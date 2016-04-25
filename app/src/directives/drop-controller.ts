class DropController {

  private id: string;

  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    const $drop = $(`#${this.id}`);
    const stop = () => false;

    $drop
      .on('dragover', stop)
      .on('dragleave', stop);
      

  }

}

angular
  .module('imagesApp')
  .controller('DropController', DropController);