var manualInputModule = ( function() {

  var myConfig;
  var input;

  function setConfig(config) {
    myConfig = config;
    init();
  }

  function init() {
    input = document.getElementById(myConfig["inputElement"]);
    registerHandlersModule.addHandler(input, "change", handleInput);
  }

  /* Function responsible to handle user input */
  function handleInput() {
    if (input.files.length > 0) {
      var filesInput = input.files;
      var files = fileModule.validateFiles(filesInput);
      galleryModule.loadImages(files, myConfig);
    }
  }

  return {
    setConfig : setConfig
  }

}());
