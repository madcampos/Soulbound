/*global window, alert, FileReader*/
var HTMLGen = {
	styleClasses : {
		SELECT_FOCUS : 'selectFocus',
		NUMBER_FOCUS : 'numberFocus',
		TEXT_FOCUS : 'textFocus',
		DATE_FOCUS : 'dateFocus',
		GENERIC_FOCUS : 'genericFocus'
	},
	/**
	 * Gets a value of the object and sets it to the previous sibling
	 */
	selectChange : function(event){
		event.target.previousElementSibling.value = event.target.value;
	},
	/*Calendar : {
		daysLabels : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		monthLabels : ['January', 'February', 'March', 'April','May', 'June',
			'July','August', 'September','October', 'November', 'December'],
		daysPerMonth : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		currentDate : new Date(),
		month : HTMLGen.Calendar.currentDate.getMonth(),
		year : HTMLGen.Calendar.currentDate.getYear(),
		firstDay : new Date(this.year, this.month, 1),
		startingDay : new Date(new Date().getYear(), new Date().getMonth(), 1).getDay(),
		monthLength : (this.month == 1 && ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0)) ? 29 :
			this.daysPerMonth[this.month],
		htmlContainer : '',
		createCalendar : function(day, month, year){
			
		}
	},*/
	
	/**
	 * Creates a <input> element with fallback wraped in a span
	 * @param {String} inputType Expected input type, if none is provided default do "text"
	 * @param {String} inputValue The input's value
	 * @param {String} selectedClass The style to apply to selected inputs
	 * @param {String} inputClass the input's class
	 * @param {String} inputId The input's ID
	 * @param {String} description The input's description (title)
	 * @returns {HTMLSpanElement} An <span> element
	 */
	createInput : function (inputType, inputValue, selectedClass, inputClass, inputId, description) {
		var wrapper = document.createElement('span');
		var backFace = document.createElement('input');
		var input = document.createElement('input');
		
		backFace.className = 'backFace';
		
		if (inputValue) {
			input.value = inputValue;
			backFace.value = inputValue;
		}
		if (inputClass) {
			backFace.classList.add(inputClass);
		}
		if (inputId) {
			input.id = inputId;
		}
		if (description) {
			input.title = description;
		}
		if (selectedClass) {
			input.onfocus = function(event){
				event.target.previousElementSibling.classList.add(selectedClass);
			};
			
			input.onblur = function(event){
				event.target.previousElementSibling.classList.remove(selectedClass);
			};
		}
		
		backFace.disabled = true;
		wrapper.appendChild(backFace);
		
		switch (inputType){
			case 'date':
				backFace.classList.add('dateFace');
				input.setAttribute('type', inputType);
				if (input.type != inputType) {
					backFace.classList.add('noInputTypeDate');
				}
			break;
			case 'number':
				backFace.classList.add('numberFace');
				
				input.setAttribute('type', inputType);
				if (input.type != inputType) {
					backFace.classList.add('noInputTypeNumber');
					
					var spinners = document.createElement('div');
					var up = document.createElement('input');
					var down = document.createElement('input');
					
					up.className = 'upSpinner';
					down.className = 'downSpinner';
					spinners.className = 'spinners';
					
					up.type = 'button';
					down.type = 'button';

					up.onclick = function(event){
						event.target.parentNode.previousElementSibling.value++;
						event.target.parentNode.previousElementSibling.previousElementSibling.value++;
					};
					down.onclick = function(event){
						event.target.parentNode.previousElementSibling.value--;
						event.target.parentNode.previousElementSibling.previousElementSibling.value--;
					};
					spinners.appendChild(up);
					spinners.appendChild(down);
					wrapper.appendChild(input);
					wrapper.appendChild(spinners);
				} else{
					input.onclick = function(event){
						event.target.previousElementSibling.value = event.target.value;
					};
					wrapper.appendChild(input);
				}
			break;
			default:
				input.onchange = function(event){
					event.target.previousElementSibling.value = event.target.value;
				};
				wrapper.appendChild(input);
		}
		return wrapper;
	},
	/**
	 * Creates a <select> element
	 * @param {Array} options An array of <option> values
	 * @param {Array} optionGroups An Array of <optgroup> values
	 * @param {String} selected The selected option
	 * @param {String} selectedClass The style to apply to selected selects
	 * @param {String} selectTd The id of the <select> element
	 * @param {String} selectClass	The class of the <select> element
	 * @param {Array} descriptions An Array containing descriptions (title attribute) for the <option> elements
	 * @returns {HTMLSpanElement} A <span> element
	 */
	createSelect : function(options, optionGroups, selected, selectedClass, selectId, selectClass, descriptions) {
		var wrapper = document.createElement('span');
		var backFace = document.createElement('input');
		var select = document.createElement('select');
		var i, j, opt;
		
		backFace.classList.add('backFace');
		backFace.classList.add('selectFace');
		backFace.disabled = true;
		
		if (selectId) {
			select.id = selectId;
		}
		if (selectClass) {
			backFace.classList.add(selectClass);
		}
		if (descriptions) {
			select.onchange = function(event){
				event.target.title = event.target.options[event.target.selectedIndex].title;
				event.target.previousElementSibling.value = event.target.value;
			};
		} else{
			select.onchange = function(event){
				event.target.previousElementSibling.value = event.target.value;
			};
		}
		if (selectedClass) {
			select.onfocus = function(event){
				event.target.previousElementSibling.classList.add(selectedClass);
			};
			
			select.onblur = function(event){
				event.target.previousElementSibling.classList.remove(selectedClass);
			};
		}
	
		if (optionGroups) {
			for (i in optionGroups) {
				if (optionGroups.hasOwnProperty(i)){
					var optGroup = document.createElement('optgroup');
					optGroup.label = optionGroups[i];
		
					for (j in options[i]) {
						if (options[i].hasOwnProperty(j)){
							opt = document.createElement('option');
							if (typeof options[i][j] == 'object') {
								opt.textContent = options[i][j][0];
								opt.className = options[i][j][1];
							} else{
								opt.textContent = options[i][j];
							}
			
							if (opt.textContent == selected) {
								opt.selected = 'selected';
								backFace.value = opt.textContent;
								if (descriptions) {
									select.title = descriptions[i][j];
								}
							}
							if (descriptions) {
								opt.title = descriptions[i][j];
							}
			
							optGroup.appendChild(opt);
						}
					}
					select.appendChild(optGroup);
				}
			}
		} else{
			for (i in options) {
				if (options.hasOwnProperty(i)) {
					opt = document.createElement('option');
					if (typeof options[i] == 'object') {
						opt.textContent = options[i][0];
						opt.className = options[i][1];
					} else{
						opt.textContent = options[i];
					}
		
					if (opt.textContent == selected) {
						opt.selected = 'selected';
						backFace.value = opt.textContent;
						if (descriptions) {
							select.title = descriptions[i];
						}
					}
					if (descriptions) {
						opt.title = descriptions[i];
					}
		
					select.appendChild(opt);
				}
			}
		}
		
		wrapper.appendChild(backFace);
		wrapper.appendChild(select);
		
		return wrapper;
	},
	/**
	 * Removes a HTML element
	 * @param {String} nodeId The ID of the parent node
	 */
	removeElement : function(nodeId){
			var elements = document.getElementById(nodeId);
			if (elements.children.length > 0) {
				elements.removeChild(elements.lastChild);
			}
	},
	/**
	 * Drag'n'Drop utility for images
	 * @see HTML5 Rocks article {@link http://www.html5rocks.com/en/tutorials/file/dndfiles/}
	 */
	imageDragAndDrop : {
		/**
		 * Initializer for drag'n'drop in the image container
		 * @param {String} pictureContainer The container ID
		 * @param {Function} imageHandler A callback function to handle the imageloading
		 */
		imageInit : function(pictureContainer, imageHandler){
			var picture = document.getElementById(pictureContainer);
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
					imageHandler(image);
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
			    alert("Please drop an image.");
			    return;
			}
			
			if(image.size > 46080){
				alert("Image size must be less than 45kb.");
				return;
			}
			
			if (image.type.match(imageType)) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					return e.target.result;
				};
				reader.readAsDataURL(image);
			}
		}
	}
};