/* Module that joins all the modules together */
var imageProcessor = ( function() {

        function init(config) {

            // manual input element
            manualInputModule.setConfig(config);

            // drop element
            dropFilesModule.setConfig(config);

        }

        return {
            init : init
        }
    }());

