/* Module object to manage all the event for the drop element */
var dropFilesModule = ( function() {

  var myConfig;
  var droptarget; 
  
  function setConfig(config) {
    myConfig = config;
    init();
  }

  /* Here the init function that adds event listeners for the DOM element */
  function init() {    
    droptarget = document.getElementById(myConfig["dropTarget"]);
    registerHandlersModule.addHandler(droptarget, "dragover", stopPropagation);
    registerHandlersModule.addHandler(droptarget, "dragenter", stopPropagation);
    registerHandlersModule.addHandler(droptarget, "drop", dropHandler);
  }

  function stopPropagation(event) {
    event.preventDefault();
  }

  function dropHandler(event) {
    stopPropagation(event);
    var dataTransfer = event.dataTransfer;
    var filesInput = dataTransfer.files;

    var files = fileModule.validateFiles(filesInput);

    galleryModule.loadImages(files, myConfig);        	
  }

  return {
    setConfig : setConfig
  }

}());
