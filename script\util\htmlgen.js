var HTMLGen = {
	selectChanges : function(event){
		event.target.previousElementSibling.value = event.target.value;
		if (event.target.title) {
			event.target.previousElementSibling.title = event.target.title;
		}
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
	createInput : function (inputType, inputValue, inputClass, inputId, description) {
		var wraper = document.createElement('span');
		var backFace = document.createElement('input');
		var input = document.createElement('input');
		
		backFace.className = 'backFace';
		
		if (inputValue) {
			input.value = inputValue;
		}
		if (inputClass) {
			backFace.className += (' ' + inputClass);
		}
		if (inputId) {
			input.id = inputId;
		}
		if (description) {
			input.title = description;
		}

		backFace.disabled = true;
		wraper.appendChild(backFace);
		
		switch (inputType){
			case 'date':
				backFace.className += ' dateFace';
				input.setAttribute('type', inputType);
				if (input.type != inputType) {
					backFace.className += 'noInputTypeDate';
				}
			break;
			case 'number':
				backFace.className += ' numberFace';
				
				input.setAttribute('type', inputType);
				if (input.type != inputType) {
					backFace.className += 'noInputTypeNumber';
					input.pattern = '[0-9]';
					
					var spinners = document.createElement('div');
					var up = document.createElement('input');
					var down = document.createElement('input');
					
					up.className = 'upSpinner';
					down.className = 'downSpinner';
					spinners.className = 'spinners';
					
					up.type = 'button';
					down.type = 'button';

					up.onclick = function(){
						event.target.parentElement.previousElementSibling.value++;
					};
					down.onclick = function(){
						event.target.parentElement.previousElementSibling.value--;
					};
					spinners.appendChild(up);
					spinners.appendChild(down);
					wraper.appendChild(input);
					wraper.appendChild(spinners);
				}
			break;
			default:
				wraper.appendChild(input);
		}
		return wraper;
	}
};

/**
 * Creates a <input> element
 * @param {String} inputType Expected input type, if none is provided default do "text"
 * @param {String} inputValue The input's value
 * @param {String} inputClass the input's class
 * @param {String} inputId The input's ID
 * @param {String} description The input's description (title)
 * @returns {HTMLSpanElement} An <input> element
 */


/**
 * Creates a <select> element
 * @param {Array} options An array of <option> values
 * @param {Array} optionGroups An Array of <optgroup> values
 * @param {String} selected The selected option
 * @param {String} selectTd The id of the <select> element
 * @param {String} selectClass	The class of the <select> element
 * @param {Array} descriptions An Array containing descriptions (title attribute) for the <option> elements
 * @returns {HTMLSpanElement} A <select> element
 */
function createSelect(options, optionGroups, selected, selectId, selectClass, descriptions) {
	var select = document.createElement("select");

	if (selectId) {
		select.id = selectId;
	}
	if (selectClass) {
		select.className = selectClass;
	}
	if (descriptions) {
		select.onchange = selectChange();
	}

	if (optionGroups) {
		for (var i in optionGroups) {
			var optGroup = document.createElement("optgroup");
			optGroup.label = optionGroups[i];

			for (var j in options[i]) {
				var opt = document.createElement("option");
				if (typeof options[i][j] == "object") {
					opt.textContent = options[i][j][0];
					opt.className = options[i][j][1];
				}else{
					opt.textContent = options[i][j];
				}

				if (opt.textContent == selected) {
					opt.selected = "selected";
					if (descriptions) {
						select.title = descriptions[i][j];
					}
				}
				if (descriptions) {
					opt.title = descriptions[i][j];
				}

				optGroup.appendChild(opt);
			}

			select.appendChild(optGroup);
		}
	}else{
		for (var i in options) {
			var opt = document.createElement("option");
			if (typeof options[i] == 'object') {
				opt.textContent = options[i][0];
				opt.className = options[i][1];
			}else{
				opt.textContent = options[i];
			}

			if (opt.textContent == selected) {
				opt.selected = "selected";
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

	return select;
}

/**
 * Removes a HTML element
 * @param {String} nodeId The ID of the parent node
 */
function removeElements(nodeId){
		var elements = document.getElementById(nodeId);
		if (elements.children.length > 0) {
			elements.removeChild(elements.lastChild);
		}
}