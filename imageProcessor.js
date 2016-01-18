/* Module that joins all the modules together */
var imageProcessor = (function() {

	function init(config) {
	
		// manual input element
		manualInputModule.setConfig(config, galleryModule);

	    // drop element
	    dropFilesModule.setConfig(config, galleryModule);

	}

	return {
		init : init
	}
}());

