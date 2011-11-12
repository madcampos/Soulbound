/*global window, alert, FileReader, messages,lang*/
/**
 * TODO: namespace globaly! Object.constructor.prototype to access the object prototype (works on ie8, need to test lower versions!)
 */
var HTMLGen = {
	/**
	 * Gets a value of the object and sets it to the previous sibling.
	 */
	selectChange : function(evt){
		var e = evt || window.event;
		e.target.previousElementSibling.value = e.target.value;
	},

	createVerticalRangeSpinner : function(values, spinnerValues, spinnerUpFunction, spinnerDownFunction, spinnerClass, spinnerId, description){
		var wrapper = document.createElement('span');
		var value = document.createElement('span');
		var up = document.createElement('input');
		var down = document.createElement('input');
		
		up.type = 'button';
		down.type = 'button';
		
		value.textContent = values[0];
		up.value = spinnerValues[0] || '\u02C4';
		down.value = spinnerValues[1] || '\u02C5';
		wrapper.id = spinnerId;
		wrapper.title = description || '';
		wrapper.classList.add('verticalRangeSpinner');
		if (spinnerClass) {
			wrapper.classList.add(spinnerClass);
		}
		
		up.onclick = function (evt){
			var e = evt || window.event;
			var index = values.indexOf(e.target.nextElementSibling.textContent);
			
			if (index-- === undefined){
				e.target.nextElementSibling.textContent = values[values.length];
			} else{
				e.target.nextElementSibling.textContent = values[index--];
			}
			
			if (spinnerUpFunction){
				spinnerUpFunction(e);
			}
		};
		
		down.onclick = function (evt){
			var e = evt || window.event;
			var index = values.indexOf(e.target.previousElementSibling.textContent);
			
			if (index++ === undefined){
				e.target.previousElementSibling.textContent = values[0];
			} else{
				e.target.previousElementSibling.textContent = values[index++];
			}
			
			if (spinnerDownFunction){
				spinnerDownFunction(e);
			}
		};
		
		wrapper.appendChild(up);
		wrapper.appendChild(value);
		wrapper.appendChild(down);
		
		return wrapper;
	},
	createHorizontalRangeSpinner : function (values, spinnerValues, spinnerLeftFunction, spinnerRightFunction, spinnerClass, spinnerId, description){
		var wrapper = document.createElement('span');
		var value = document.createElement('span');
		var left = document.createElement('input');
		var right = document.createElement('input');
		
		left.type = 'button';
		right.type = 'button';
		
		value.textContent = values[0];
		
		left.value = spinnerValues[0] || '\u02C2';
		right.value = spinnerValues[1] || '\u02C3';
		wrapper.id = spinnerId;
		wrapper.title = description || '';
		wrapper.classList.add('horizontalRangeSpinner');
		if (spinnerClass) {
			wrapper.classList.add(spinnerClass);
		}
		
		left.onclick = function (evt){
			var e = evt || window.event;
			var index = values.indexOf(e.target.nextElementSibling.textContent);
			
			if (index-- === undefined){
				e.target.nextElementSibling.textContent = values[values.length];
			} else{
				e.target.nextElementSibling.textContent = values[index--];
			}
			
			if (spinnerLeftFunction){
				spinnerLeftFunction(e);
			}
		};
		
		right.onclick = function (evt){
			var e = evt || window.event;
			var index = values.indexOf(e.target.previousElementSibling.textContent);
			
			if (index++ === undefined){
				e.target.previousElementSibling.textContent = values[0];
			} else{
				e.target.previousElementSibling.textContent = values[index++];
			}
			
			if (spinnerRightFunction){
				spinnerRightFunction(e);
			}
		};
		
		wrapper.appendChild(left);
		wrapper.appendChild(value);
		wrapper.appendChild(right);
		
		return wrapper;
	},
	/**
	 * Creates a <input> element with fallback wraped in a span.
	 * @param {String} inputType Expected input type, if none is provided default do "text".
	 * @param {String} inputValue The input's value.
	 * @param {String} inputClass the input's class.
	 * @param {String} inputId The input's ID.
	 * @param {String} description The input's description (title).
	 * @returns {HTMLSpanElement} An <span> element wrapping the input.
	 * @returns {HTMLInputElement} A <input> element.
	 */
	createInput : function (inputType, inputValue, inputClass, inputId, description) {
		var input = document.createElement('input');
		input.value = inputValue || '';
		input.id = inputId;
		input.title = description || '';
		
		if (inputClass) {
			input.classList.add(inputClass);
		}
		
		input.setAttribute('type', inputType);
		if (input.type != inputType || (window.navigator.appName != "Opera" && inputType == 'date')){
			var wrapper = document.createElement('span');
			
			switch(inputType){
				case 'date':
					var calWrapper = document.createElement('div');
					var todayButton = document.createElement('input');
					todayButton.type = 'button';
					todayButton.value = messages[lang].TODAY || 'Today';
					wrapper.classList.add('noInputDate');
					
					var createCal = function(weekDays, month, year){
						var calendar = document.createElement('table');
						var calHeader = document.createElement('tr');
						
						var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
						var weekHeaders = weekDays || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
						var currentDate = new Date();
						var currentMonth = month || currentDate.getMonth();
						var currentYear = year || currentDate.getFullYear();
						var firstDay = new Date(currentYear, currentMonth, 1);
						var startingDay = firstDay.getDay();
						
						var weeks, week, days, day, dayCell;
						
						var dateClick = function(evt){
							var e = evt || window.event;
							e.target.parentNode.parentNode.parentNode.previousElementSibling.value = currentYear + '-' + currentMonth + '-' + e.target.textContent;
							for (weeks=0;weeks<=5;weeks++){
								for (days=0;days<=6;days++){
									e.target.parentNode.parentNode.children[weeks].children[days].style.backgroundColor = 'transparent';
								}
							}
							e.target.style.backgroundColor = 'lightgray';
							e.target.parentNode.parentNode.parentNode.style.display = 'none';
						};
						
						if (currentMonth == 1) {
							if ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0){
								daysInMonth[1] = 29;
							}
						}
						
						for (weeks in weekHeaders){
							var weekHeader = document.createElement('td');
							weekHeader.textContent = weekHeaders[weeks];
							weekHeader.style.padding = '3px';
							calHeader.appendChild(weekHeader);
						}
						calendar.appendChild(calHeader);
						
						day = 1;
						for (weeks=0;weeks<=5;weeks++){
							week = document.createElement('tr');
							for (days=0;days<=6;days++){
								dayCell = document.createElement('td');
								if ((weeks>0 || days >= startingDay) && day <= daysInMonth[currentDate.getMonth()]){
									if (days === 0) {
										dayCell.style.color = 'red';
									}
									
									dayCell.onclick = dateClick;
									dayCell.textContent = day;
									day++;
								}
								
								dayCell.style.padding = '3px';
								
								week.appendChild(dayCell);
							}
							calendar.appendChild(week);
						}
						
						calendar.style.textAlign = 'center';
						
						return calendar;
					};
					
					todayButton.onclick = function(evt){
						var e = evt || window.event;
						var today = new Date();
						e.target.parentNode.previousElementSibling.value = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
					};
					
					todayButton.style.width = '50%';
					
					calWrapper.style.position = 'absolute';
					calWrapper.style.display = 'none';
					calWrapper.style.border = 'thin black solid';
					calWrapper.style.backgroundColor = 'white';
					calWrapper.style.textAlign = 'right';
					calWrapper.style.fontFamily = 'sans-serif';
					calWrapper.style.fontSize = '0.8em';
					
					calWrapper.appendChild(createCal());
					calWrapper.appendChild(todayButton);
					
					input.onclick = function(evt){
						var e = evt || window.event;
						e.target.nextSibling.style.display = 'block';
					};
					
					input.onfocus = function(evt){
						var e = evt || window.event;
						e.target.nextSibling.style.display = 'block';
					};
					
					input.onblur = function(evt){
						var e = evt || window.event;
						var blur = function(){
							e.target.nextSibling.style.display = 'none';
						};
						window.setTimeout(blur,300);
					};
					
					wrapper.appendChild(input);
					wrapper.appendChild(calWrapper);
				break;
				case 'number':
					wrapper.classList.add('noInputNumber');
					
					var spinners = document.createElement('div');
					var up = document.createElement('input');
					var down = document.createElement('input');
					
					up.className = 'upSpinner';
					down.className = 'downSpinner';
					spinners.className = 'spinners';
					
					up.type = 'button';
					down.type = 'button';
					up.value = '\u02C4';
					down.value = '\u02C5';
		
					up.onclick = function(evt){
						var e = evt || window.event;
						e.target.parentNode.previousElementSibling.value++;
					};
					down.onclick = function(evt){
						var e = evt || window.event;
						e.target.parentNode.previousElementSibling.value--;
					};
					
					spinners.appendChild(up);
					spinners.appendChild(down);
					wrapper.appendChild(input);
					wrapper.appendChild(spinners);
				break;
				default:
					return input;
			}
			return wrapper;
		}
		return input;
	},
	/**
	 * Creates a <select> element.
	 * @param {Array} options An array of <option> values.
	 * @param {Array} optionGroups An Array of <optgroup> values.
	 * @param {String} selected The selected option.
	 * @param {String} selectTd The id of the <select> element.
	 * @param {String} selectClass	The class of the <select> element.
	 * @param {Array} descriptions An Array containing descriptions (title attribute) for the <option> elements.
	 * @returns {HTMLSelectElement} A <select> element containing the dropdown list.
	 */
	createSelect : function(options, optionGroups, selected, selectId, selectClass, descriptions) {
		var select = document.createElement('select');
		var i, j, opt;
		
		if (selectId) {
			select.id = selectId;
		}
		if (selectClass) {
			select.classList.add(selectClass);
		}
		if (descriptions) {
			select.onchange = function(evt){
				var e = evt || window.event;
				e.target.title = e.target.options[e.target.selectedIndex].title;
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
		
		return select;
	},
	/**
	 * Removes a HTML element from a given parent node.
	 * @param {String} nodeId The ID of the parent node.
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
					HTMLGen.imageDragAndDrop.imageHandler(image);
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
				reader.onloadend = function(evt) {
					var e = evt || window.event;
					return e.target.result;
				};
				reader.readAsDataURL(image);
			}
		}
	}
};