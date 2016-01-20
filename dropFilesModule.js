/* Module object to manage all the event for the drop element */
var dropFilesModule = ( function() {

        var myConfig = null;

        function setConfig(config) {
            myConfig = config;
        }

        var droptarget = document.getElementById("droptarget");

        /* Here the event listeners added for the DOM element */
        registerHandlersModule.addHandler(droptarget, "dragover", function(event) {
            event.preventDefault();
        });

        registerHandlersModule.addHandler(droptarget, "dragenter", function(event) {
            event.preventDefault();
        });

        registerHandlersModule.addHandler(droptarget, "drop", function(event) {
            event.preventDefault();
            var dataTransfer = event.dataTransfer;
            var filesInput = dataTransfer.files;

            var files = fileModule.validateFiles(filesInput);

            galleryModule.loadImages(files, myConfig);

        });

        return {
            setConfig : setConfig
        }

    }());
