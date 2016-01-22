/* Module object to manage all the event for the drop element */
var intakeModule = ( function() {

  var droptarget, input; 

  /* Here the init function that adds event listeners for the DOM element */
  function init() {  
    droptarget = document.getElementById(commonComponents.getConfig()["dropTarget"]);
    registerHandlersModule.addHandler(droptarget, "dragover", stopPropagation);
    registerHandlersModule.addHandler(droptarget, "dragenter", stopPropagation);
    registerHandlersModule.addHandler(droptarget, "drop", dropHandler);

    input = document.getElementById(commonComponents.getConfig()["inputElement"]);
    registerHandlersModule.addHandler(input, "change", handleInput);
  }

  function stopPropagation(event) {
    event.preventDefault();
  }

  function dropHandler(event) {
    stopPropagation(event);
    var dataTransfer = event.dataTransfer;
    var filesInput = dataTransfer.files;

    var files = fileModule.validateFiles(filesInput);
    galleryModule.loadImages(files);        	
  }

    /* Function responsible to handle user input */
  function handleInput() {
    if (input.files.length > 0) {
      var filesInput = input.files;
      var files = fileModule.validateFiles(filesInput);
      galleryModule.loadImages(files);
    }
  }

  return {
    init : init
  }

}());
