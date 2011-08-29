/**
 * Open a dragged image and loads on the page
 * @see HTML5 Rocks article {@link http://www.html5rocks.com/en/tutorials/file/dndfiles/}
 */
var picture;
function imageInit(){
	window.addEventListener("dragenter", dragenter, true);
	picture = document.getElementById("picture");
	window.addEventListener("dragleave", dragleave, true);
	picture.addEventListener("dragover", dragover, true);
	picture.addEventListener("drop", drop, true);
}

function dragenter(e) {
	picture.setAttribute("dragenter", true);
}

function dragleave(e) {
	picture.removeAttribute("dragenter");
}

function dragover(e) {
	e.preventDefault();
}

function drop(e) {
	var dt = e.dataTransfer;
	var images = dt.files;
	
	e.preventDefault();
	
	for (var i = 0; i < images.length; i++) {
        var image = images[i];
        handleImage(image);
    }
}

function handleImage(image) {
	var imageType = /image.*/;

	if (!image.type.match(imageType)) {
	    alert("Please drop an image.");
	    return false;
	}
	
	if(image.size > 46080){
		alert("Image size must be less than 45kb");
		return false;
	}
	
	if (image.type.match(imageType)) {
		var h2 = document.getElementById("pic");
		var img = document.createElement("img");
		img.id = "pic";
		var reader = new FileReader();
		reader.onloadend = function(e) {
			img.src = e.target.result;
		}
		reader.readAsDataURL(image);
		picture.replaceChild(img, h2);
	}

	return true;
}