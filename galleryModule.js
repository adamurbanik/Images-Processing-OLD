var galleryModule = function() {

    var canvas = null;
    var imagesLoaded = [];

    /* Function to register the click event on the canvas element. 
    When the element is clicked the proper element image number is found and open */
    function registerCanvas() {

        if (canvas != null) {
            canvas.removeEventListener("click", handler, false); 
            var parentNode = canvas.parentNode;
            canvas.parentNode.removeChild(canvas);
            canvas = null;

            canvas = document.createElement("canvas");
            canvas.id = "canvas";
            canvas.width = "1024",
            canvas.height = "768";

            parentNode.appendChild(canvas);
        }
        
        canvas = document.getElementById("canvas");
        canvas.addEventListener("click", handler, false);

        function handler(event) {
            event.preventDefault();

            /* get the mouse position out of the canvas and divide the mouse position by 150
             to get element number thas is needed to open */
            var mousePos = getMousePosition(canvas, event)
            var x = Math.floor(mousePos.x / 152);
            var y = Math.floor(mousePos.y / 152);
            var width = Math.floor(this.width / 152);

            var elementNo = getElement(x, y, width);
            console.log(elementNo);

            var count = imagesLoaded.length-1;
            if (count >= elementNo) {
                // open that element
                openImage(elementNo);                
            } 

        }

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

    function openImage(elementNo) {
        var image = new Image();
        
        registerHandlersModule().addHandler(image, "load", function() {
            var myWindow = window.open("", "mywin", 'height=' + image.height + ',width=' + image.width + ',resizable=yes,scrollbars=yes,location=yes');
            myWindow.document.write("<canvas id='canvas' width='200' height='200'>A drawing of something.</canvas>")

            var canvasBig = myWindow.document.querySelector("canvas");
            canvasBig.width = image.width;
            canvasBig.height = image.height;

            var ctx = canvasBig.getContext("2d");
            ctx.drawImage(image, 0, 0);
        });
        image.src = imagesLoaded[elementNo].src;

    }



    Array.prototype.clear = function() {
        while (this.length > 0) {
            this.pop();
        }
    }

    function loadImages(files, myConfig) {
        var images = [];
        var loadedImagesCounter = 0;
        var numImages = 0;
        imagesLoaded.clear();

        numImages = files.length;

        Array.prototype.forEach.call(files, function(file) {
            var reader = new FileReader();
            reader.addEventListener("load", function(event) {
                console.log("reader load listener works");
                var img = document.createElement("img");
                img.onload = function() {
                    loadedImagesCounter++;
                    images.push(img);
                    if (loadedImagesCounter >= numImages) {
                        drawCanvas(images, myConfig);
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

    function drawCanvas(images, myConfig) {
        registerCanvas();

        var ctx = canvas.getContext("2d");
        var canvasWidth = canvas.width;
        ctx.clearRect(0, 0, 1024, 768);
        var positionX = 0;
        var positionY = 0;

        var thumbSize = myConfig.thumbnailsSize;
        var distance = myConfig.elementsDistance;

        images.forEach(function(image) {
            ctx.drawImage(image, positionX, positionY, thumbSize, thumbSize);
            positionX += thumbSize + distance;

            if (positionX + 150 > canvasWidth) {
                positionX = 0;
                positionY += 152;
            }
            imagesLoaded.push(image);
        });        
    }

    function getImagesLoaded() {
        return imagesLoaded;
    }

    return {
    	openImage : openImage,
        registerCanvas : registerCanvas, 
        loadImages : loadImages,
        getImagesLoaded : getImagesLoaded,
    }


}