// update check 
var config = {
    thumbnailsSize : 150,
    elementsDistance : 2
};

var manualInputModule = (function() {

    var input = document.querySelector("input");
    var canvas = document.getElementById("canvas");

    input.addEventListener("change", handleInput, false);
    /* Function responsible to handle user input */
    function handleInput() {
        if (input.files.length > 0) {
            var filesInput = input.files;

            filesHandleModule().handleFiles(filesInput, canvas, config);
        }
    }

    function openImage(elementNo) {
        var image = new Image();
        
        registerHandlersModule().addHandler(image, "load", function() {
            var myWindow = window.open("", "mywin", 'height=' + image.height + ',width=' + image.width + ',resizable=yes,scrollbars=yes,location=yes');
            myWindow.document.write("<canvas id='canvas' width='200' height='200'>A drawing of something.</canvas>")

            var canvas = myWindow.document.querySelector("canvas");
            canvas.width = image.width;
            canvas.height = image.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
        });

        var images = imagesOperationsModule.getLoadedImages();
        image.src = images[elementNo].src;

    }

    function registerCanvas() {
        // registerHandlersModule().addHandler(canvas, "click", function() {
            // nie moge tutaj tak zrobic bo wywala blad: TypeError: registerHandlersModule is not a function
        // });
        canvas.addEventListener("click", function(event) {
            event.preventDefault();

            /* get the mouse position out of the canvas and divide the mouse position by 150
             to get element number thas is needed to open */
            var mousePos = getMousePosition(canvas, event)
            var x = Math.floor(mousePos.x / 152);
            var y = Math.floor(mousePos.y / 152);
            var width = Math.floor(this.width / 152);

            var elementNo = getElement(x, y, width);
            console.log(elementNo);

            // open that element
            openImage(elementNo);

        });

        function getElement(x, y, width) {
            return x + width * y;
        }

        function getMousePosition(canvas, event) {
            var rectangle = canvas.getBoundingClientRect();
            return {
                x : event.clientX - rectangle.left,
                y : event.clientY - rectangle.top
            }
        };

        return canvas;

    }

    canvas = registerCanvas();

    // log(canvasOperationsModule.x);  

    return {
        handleInput : handleInput
    }

})();

// var canvasOperationsModule = (function() {
//     var x = 0;
//     return {
//         x: x
//     }
// })();

/* A Module object that manages all the events application.
 Mainly it is to add listeners of appropriate type for the given DOM element.
 The last handler argument provides callback function.*/
var registerHandlersModule = (function() {
    function addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }

    function removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }

    return {
        addHandler : addHandler,
        removeHandler : removeHandler
    }

});

/* Module object to manage all the event for the drop element */
var dropFilesModule = (function() {
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

        //filesHandleModule().handleFiles(filesInput);
        filesHandleModule().handleFiles(filesInput, canvas, config);

    });

})();

var imagesOperationsModule = (function() {

    var loadedImages = [];

    function loadImages(files, callback) {
        var images = [];
        var loadedImages = 0;
        var numImages = 0;

        numImages = files.length;

        Array.prototype.forEach.call(files, function(file) {
            var reader = new FileReader();
            reader.addEventListener("load", function(event) {
                console.log("reader load listener works");
                var img = document.createElement("img");
                img.onload = function() {
                    loadedImages++;
                    images.push(img);
                    if (loadedImages >= numImages) {
                        callback(images, canvas);
                    }
                }
                img.src = reader.result;

            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }

        });

        return images;
    }

    return {
        loadImages : loadImages,

        getLoadedImages : function() {
            return loadedImages;
        },

        addLoadedImage : function(element) {
            loadedImages.push(element);
        }
    }

})();

var log = function(text) {
    console.log(text);
}

var filesHandleModule = (function() {

    /* Function responsible to handle all the files given as a parameter */
    function handleFiles(filesInput, canvas, config) {
        // validate the type of files
        var files = validateFiles(filesInput);

        loadedImages = imagesOperationsModule.loadImages(files, function(images, canvas) {
            var ctx = canvas.getContext("2d");
            var canvasWidth = canvas.width;
            ctx.clearRect(0, 0, 1024, 768);
            var positionX = 0;
            var positionY = 0;

            var thumbSize = config.thumbnailsSize;
            var distance = config.elementsDistance;

            images.forEach(function(image) {
                ctx.drawImage(image, positionX, positionY, thumbSize, thumbSize);
                positionX += thumbSize + distance;

                if (positionX + 150 > canvasWidth) {
                    positionX = 0;
                    positionY += 152;
                }
                imagesOperationsModule.addLoadedImage(image);
            });
        });

        return loadedImages;
    }

    /* Function responsible to validate files specified as a argument.
     It returns true only if all the files have been marked as valid otherwise false is returned. */
    function validateFiles(filesInput) {
        var validFiles = [];
        for (var i = 0; i < filesInput.length; i++) {
            var file = filesInput[i];
            var valid = validateFileType(file);
            if (valid) {
                validFiles.push(file);
            }
        }
        return validFiles;
    }

    /* Function that checks for the validity of the file extension.
     The file argument is provided. Only the jpg and png formats are supported.*/
    function validateFileType(file) {
        var allowedExtensions = ["jpg", "JPG", "png", "PNG"];

        for (var i = 0; i < allowedExtensions.length; i++) {
            var validExt = file.name.lastIndexOf(allowedExtensions[i]);
            if (validExt !== -1) {
                return true;
            }
        }
        return false;
    }

    return {
        handleFiles : handleFiles
    }
});

