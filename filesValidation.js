var filesValidationModule = function() {

    /* Function responsible to validate files specified as a argument.
     It returns array of valid files */
    function validateFiles(filesInput) {
        var validFiles = [];
        for (var i = 0; i < filesInput.length; i++) {
            var file = filesInput[i];
            var valid = validateFileType(file);
            if (valid) {
                validFiles.push(file);
            }
        }
        return validFiles;
    }

    /* Function that checks for the validity of the file extension.
     The file argument is provided. Only the jpg and png formats are supported.*/
    function validateFileType(file) {
        var allowedExtensions = ["jpg", "JPG", "png", "PNG"];

        for (var i = 0; i < allowedExtensions.length; i++) {
            var validExt = file.name.lastIndexOf(allowedExtensions[i]);
            if (validExt !== -1) {
                return true;
            }
        }
        return false;
    }

    return {
        validateFiles : validateFiles
    }
};