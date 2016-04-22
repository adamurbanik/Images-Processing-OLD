class FileModule {

  /* Function responsible to validate files specified as a argument.It returns array of valid files */
  validateFiles(filesInput: any[]): any[] {
    let validFiles: any[] = [];
    for (let i = 0; i < filesInput.length; i++) {
      let file = filesInput[i];
      if (this.validateFileType(file)) {
        validFiles.push(file);
      }
    }
    return validFiles;
  }

  /* Function that checks for the validity of the file extension.The file argument is provided. Only the jpg and png formats are supported.*/
  validateFileType(file: any): boolean {
    let allowedExtensions = ["jpg", "JPG", "png", "PNG"];

    for (let i = 0; i < allowedExtensions.length; i++) {
      let validExt = file.name.lastIndexOf(allowedExtensions[i]);
      if (validExt !== -1) {
        return true;
      }
    }
    return false;
  }

}

angular
  .module('imagesApp')
  .service('fileModule', FileModule);
