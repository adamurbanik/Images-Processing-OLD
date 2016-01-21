/* Module that joins all the modules together */
var imageProcessor = ( function() {

  var myConfig = {
    thumbWidth : 150,
    thumbHeight : 150,
    elementsDistance : 2,
    canvasWidth : "1024",
    canvasHeight : "768",
    canvasColor : "#f2f2f2",
    dropTarget : "droptarget",
    inputElement : "filesInput"
  };

  function init(config) {
    if (typeof config === "undefined")  {
      config = myConfig;
    }

    manualInputModule.setConfig(config);
    dropFilesModule.setConfig(config);
  }

  return {
    init : init
  }
  
}());

