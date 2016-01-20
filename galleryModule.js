var galleryModule = ( function() {
        var canvas;

        function openImage(event) {
            var myWindow = window.open(event.currentTarget.alt, "mywin", 'resizable=yes,scrollbars=yes,location=yes');
        }


        Array.prototype.clear = function() {
            while (this.length > 0) {
                this.pop();
            }
        }
        function loadImages(files, config) {
            Array.prototype.forEach.call(files, function(file) {
                var reader = new FileReader();
                registerHandlersModule.addHandler(reader, "load", function(event) {
                    var img = document.createElement("img");
                    registerHandlersModule.addHandler(img, "load", function() {
                        drawThumb(img, config);
                        reader = null;
                    });
                    img.src = event.target.result;
                });

                if (file) {
                    reader.readAsDataURL(file);
                }
            });
        }

        function drawThumb(img, config) {
            var lowCanvas = document.createElement("canvas");
            lowCanvas.width = config.thumbWidth;
            lowCanvas.height = config.thumbHeight;

            var maxWidth = config.thumbWidth;
            var maxHeight = config.thumbHeight;
            var ratio = 0;
            var width = img.width;
            var height = img.height;
            var positionX = 0;
            var positionY = 0;

            if (width > maxWidth) {
                ratio = maxWidth / width;
                height = height * ratio;
                width = width * ratio;
            }
            if (height > maxHeight) {
                ratio = maxHeight / height;
                width = width * ratio;
                height = height * ratio;
            }

            positionY = (maxHeight - height) / 2;
            positionX = (maxWidth - width) / 2;

            var ctx = lowCanvas.getContext("2d");
            ctx.fillStyle = config.canvasColor;
            ctx.fillRect(0, 0, lowCanvas.width, lowCanvas.height);
            ctx.drawImage(img, positionX, positionY, width, height);
            var dataURL = lowCanvas.toDataURL();

            var thumb = document.createElement("img");
            thumb.src = dataURL;
            thumb.alt = img.src;
            registerHandlersModule.addHandler(thumb, "click", openImage);

            document.getElementById("preview").appendChild(thumb);

        }

        return {
            loadImages : loadImages
        }

    }()); 