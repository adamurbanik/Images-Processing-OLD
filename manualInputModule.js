var manualInputModule = ( function() {

        var myConfig = null;

        function setConfig(config) {
            myConfig = config;
        }

        var input = document.querySelector("input");

        registerHandlersModule.addHandler(input, "change", handleInput);

        /* Function responsible to handle user input */
        function handleInput() {
            if (input.files.length > 0) {
                var filesInput = input.files;

                var files = fileModule.validateFiles(filesInput);

                // load images
                galleryModule.loadImages(files, myConfig);

            }
        }

        return {
            setConfig : setConfig
        }

    }()); 