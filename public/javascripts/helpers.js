/*global window*/
var selectChange = function(evt) {
	var e = evt || window.event;
	e.target.title = e.target.options[e.target.selectedIndex].title;
};

/**
 * Creates a <select> element.
 * @param {Array} options An array of <option> values.
 * @param {Array} optionGroups An Array of <optgroup> values.
 * @param {String} selected The selected option.
 * @returns {HTMLSelectElement} A <select> element containing the dropdown list.
 */
var createSelect = function(options, optionGroups, selected) {
	var wrapper = document.createElement('td');
	var select = document.createElement('select');
	var i, j, opt;
	select.onchange = function(evt){
		var e = evt || window.event;
		e.target.title = e.target.options[e.target.selectedIndex].title;
	};
	
	if (optionGroups) {
		for (i in optionGroups) {
			var optGroup = document.createElement('optgroup');
			optGroup.label = optionGroups[i][0];
			optGroup.title = optionGroups[i][1];
			
			if (optionGroups[i].length == 3) {
				optGroup.className = optionGroups[i][2];
			}

			for (j in options[i]) {
				opt = document.createElement('option');
				opt.textContent = options[i][j][0];
				opt.title = options[i][j][1];
				
				if (options[i][j].length == 3) {
					opt.className = options[i][j][2];
				}

				if (options[i][j][0] == selected) {
					opt.selected = 'selected';
				}
				
				optGroup.appendChild(opt);
			}
			select.appendChild(optGroup);
		}
	} else {
		for (i in options) {
			opt = document.createElement('option');
			opt.textContent = options[i][j][0];
			opt.title = options[i][j][1];
			
			if (options[i].length == 3) {
				opt.className = options[i][2];
			}

			if (options[i][0] == selected) {
				opt.selected = 'selected';
			}

			select.appendChild(opt);
		}
	}
	
	wrapper.appendChild(select);
	return wrapper;
};

var createInput = function(type, value){
	var wrapper = document.createElement('td');
	var input = document.createElement('input');
	
	input.type = type;
	input.value = value;
	
	wrapper.appendChild(input);
	return wrapper;
};

/**
 * Removes a HTML element from a given parent node.
 * @param {String} nodeId The ID of the parent node.
 */
var removeElement = function(nodeId){
		var elements = document.getElementById(nodeId);
		if (elements.children.length > 0) {
			elements.removeChild(elements.lastElementChild);
		}
};

/**
 * Drag'n'Drop utility for images
 * @see HTML5 Rocks article {@link http://www.html5rocks.com/en/tutorials/file/dndfiles/}
 */
var imageDragAndDrop = {
	/**
	 * Initializer for drag'n'drop in the image container
	 * @param {String} pictureContainer The container ID
	 * @param {Function} imageHandler A callback function to handle the imageloading
	 */
	imageInit : function(pictureContainer, imageHandler){
		var picture = document.getElementById(pictureContainer);
		function dragenter(evt) {picture.setAttribute("dragenter", true);}
		function dragleave(evt) {picture.removeAttribute("dragenter");}
		function dragover(evt) {
			var e = evt || window.event;
			e.preventDefault();
		}
		function drop(evt) {
			var e = evt || window.event;
			var dt = e.dataTransfer;
			var images = dt.files;
			e.preventDefault();
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				imageDragAndDrop.imageHandler(image);
			}
		}
		window.addEventListener("dragenter", dragenter, true);
		window.addEventListener("dragleave", dragleave, true);
		picture.addEventListener("dragover", dragover, true);
		picture.addEventListener("drop", drop, true);
	},
	/**
	 * Image Handler to load a image in base64
	 * @param {String} image Path of image to read
	 * @return {String} A base64 encoded image
	 */
	imageHandler : function(image){
		var imageType = /image.*/;
		if (!image.type.match(imageType)) {
		    alert(msg[0]);
		    return;
		}
		if(image.size > 46080){
			alert(msg[1]);
			return;
		}
		if (image.type.match(imageType)) {
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				var e = evt || window.event;
				return e.target.result;
			};
			reader.readAsDataURL(image);
		}
	}
};