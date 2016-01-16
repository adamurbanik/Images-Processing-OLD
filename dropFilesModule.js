/* Module object to manage all the event for the drop element */
var dropFilesModule = function() {
    
    var myConfig = null;
    var myGallery = null;

    function setConfig(config, gallery) {
        myConfig = config;
        myGallery = gallery;
    }


    var droptarget = document.getElementById("droptarget");

    /* Here the event listeners added for the DOM element */
    registerHandlersModule().addHandler(droptarget, "dragover", function(event) {
        event.preventDefault();
    });

    registerHandlersModule().addHandler(droptarget, "dragenter", function(event) {
        event.preventDefault();
    });

    registerHandlersModule().addHandler(droptarget, "drop", function(event) {
        event.preventDefault();
        var dataTransfer = event.dataTransfer;
        var filesInput = dataTransfer.files;

        var files = filesValidationModule().validateFiles(filesInput);

        myGallery.loadImages(files, myConfig);

    });

    return {
        setConfig : setConfig
    }

};