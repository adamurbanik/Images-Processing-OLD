/* Module that joins all the modules together */
var imageProcessor = ( function() {

  var config = {
    thumbWidth : 150,
    thumbHeight : 150,
    elementsDistance : 2,
    canvasWidth : "1024",
    canvasHeight : "768",
    canvasColor : "#f2f2f2",
    dropTarget : "droptarget",
    inputElement : "filesInput"
  };

  function init(localConfig) {
    if (typeof localConfig !== "undefined")  {
      config = commonComponents.overwrite(config, localConfig);
    }
    
    commonComponents.setConfig(config);
    intakeModule.init();
  }

  return {
    init : init
  }
  
}());

