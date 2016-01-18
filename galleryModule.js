var galleryModule = (function() {
    var myConfig;
    var canvas;

    function openImage() {
        var image = new Image();
        
        registerHandlersModule.addHandler(image, "load", function() {


			var canvasBig = document.createElement("canvas");
			canvasBig.id = "canvasBig";
            canvasBig.width = image.width;
            canvasBig.height = image.height;

            var ctx = canvasBig.getContext("2d");
            ctx.drawImage(image, 0, 0, canvasBig.width, canvasBig.height);
            var img = new Image();
            img.src = canvasBig.toDataURL();


            var myWindow = window.open(img.src, "mywin", 'height=' + canvasBig.height + ',width=' + canvasBig.width);

        });
        image.src = this.alt;

    }

    Array.prototype.clear = function() {
        while (this.length > 0) {
            this.pop();
        }
    }

    function loadImages(files, config) {
        myConfig = config;
        var preview = document.getElementById("preview");

        Array.prototype.forEach.call(files, function(file) {
            var reader = new FileReader();
            reader.addEventListener("load", function(event) {
                console.log("reader load listener works");
                var lowCanvas = document.createElement("canvas");
                var img = document.createElement("img");
                img.onload = function() {

                    lowCanvas.id = "lowCanvas";
                    var thumbSize = config.thumbnailsSize;
                    lowCanvas.width = thumbSize;
                    lowCanvas.height = thumbSize;
                    
                    var ctx = lowCanvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, lowCanvas.width, lowCanvas.height);
                    var dataURL = lowCanvas.toDataURL();

                    var thumb = document.createElement("img");
                    thumb.src = dataURL;
                    thumb.alt = img.src;
                 	thumb.addEventListener("click", openImage, false);

                    preview.appendChild(thumb);

                }

                img.src = reader.result;

            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }


    return {
        loadImages : loadImages
    }


}());