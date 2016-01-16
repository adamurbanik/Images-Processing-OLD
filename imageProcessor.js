/* Module that joins all the modules together */
var imageProcessor = function() {

	function init(config) {

		var gallery = galleryModule();
		
		// manual input element
		var manual = manualInputModule();
		manual.setConfig(config, gallery);

	    // drop element
	    var drop = dropFilesModule();
	    drop.setConfig(config, gallery);

	}

	return {
		init : init
	}
}

