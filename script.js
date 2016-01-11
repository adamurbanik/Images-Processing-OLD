var input = document.querySelector("input");
input.addEventListener("change", handleInput, false);

var droptarget = document.getElementById("droptarget");

/* Function responsible to handle user input */
function handleInput() {
	if (input.files.length > 0) {

			var files = input.files;

			handleFiles(files);

	}
}

/* Function responsible to handle all the files given as a parameter */
function handleFiles(files) {
	
	// validate the type of files
	var valid = validateFiles(files)
	if(!valid) {
		alert("Please select only image files");
		return;
	}

	var preview = document.getElementById("preview");

	Array.prototype.forEach.call(files, function(file) {
				
				var reader = new FileReader();
				
				reader.onloadend = function() {
					var img = document.createElement("img");
					img.src = reader.result;
					img.height = 150;
					img.width = 150;
					

					img.addEventListener("click", function(event) {
						event.preventDefault();

						var imgFull = new Image();
						imgFull.src = reader.result;				

						var myWindow = window.open("","mywin",'height=' + imgFull.height + ',width=' + imgFull.width + ',resizable=yes,scrollbars=yes,location=yes');
						myWindow.document.write("<canvas id='canvas' width='200' height='200'>A drawing of something.</canvas>")
						
						var canvas = myWindow.document.querySelector("canvas");
						canvas.width = imgFull.width;
						canvas.height = imgFull.height;
				
						var ctx = canvas.getContext("2d");
						ctx.drawImage(imgFull,0,0);

					}, false);


					preview.appendChild(img);
					
				}

				if (file) {
					reader.readAsDataURL(file);
				}


			});
}

/* A Singleton object that manages all the events application.
Mainly it is to add listeners of appropriate type for the given DOM element.
The last handler argument provides callback function.   
*/
var EventUtil = {
	addHandler : function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		}
		else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = handler;
		}
	},

	removeHandler: function(element, type, handler) {
		if (element.removeEventListener){
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent){
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}

}

/* Here The event listeners added for the DOM element */
EventUtil.addHandler(droptarget, "dragover", function(event) {
	event.preventDefault();
});

EventUtil.addHandler(droptarget, "dragenter", function(event) {
	event.preventDefault();
}); 

EventUtil.addHandler(droptarget, "drop", function(event) {
	event.preventDefault();
	var dataTransfer = event.dataTransfer;
	var files = dataTransfer.files;
	
	handleFiles(files);

});

/* Function responsible to validate files specified as a argument.
It returns true only if all the files have been marked as valid otherwise false is returned. */
function validateFiles(files) {

	for (var i = 0; i < files.length; i++)
	{
		var file = files[i];
		var valid = validateFile(file);		
		if(!valid) {
			return false;
		}
	}

	return true;
}

/* Function that checks for the validity of the file extension.
The file argument is provided. Only the jpg and png formats are supported.*/
function validateFile(file) {
	
	var allowedExtensions = new Array("jpg", "JPG", "png", "PNG");
	
	for(var i = 0; i < allowedExtensions.length; i++) {
		var validExt = file.name.lastIndexOf(allowedExtensions[i]);	
		if(validExt !== -1) {
			return true;
		}
	}

	return false;
}