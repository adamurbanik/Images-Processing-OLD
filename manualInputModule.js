var manualInputModule = (function() {
	
    var myConfig = null;
    var gallery = null;

	function setConfig(config, gallery) {
        myConfig = config;
        myGallery = gallery;
    }

	var input = document.querySelector("input");	    

    input.addEventListener("change", handleInput, false);
    /* Function responsible to handle user input */
    function handleInput() {
        if (input.files.length > 0) {
            var filesInput = input.files;

            var files = fileModule.validateFiles(filesInput);

    		// load images
            myGallery.loadImages(files, config);

        }
    }

    return {
        setConfig : setConfig
    }


}());