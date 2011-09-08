var htmlgen = {
	selectChanges : function(event){
		event.target.previousElementSibling.value = event.target.value;
		if (event.target.title) {
			event.target.previousElementSibling.title = event.target.title;
		}
	},
	createInput : function (inputType, inputValue, inputClass, inputId, description) {
		var wraper = document.createElement('span');
		var input = document.createElement('input');
		var backFace = document.createElement('input');
		
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
		
		input.setAttribute('type', inputType);
		if (input.type != inputType) {
			switch (inputType){
				case 'date':
					
				break;
				case 'number':
					var spinners = document.createElement('div');
					var up = document.createElement('input');
					var down = document.createElement('input');
				break;
			}
			
			
		}
		
		backFace.disabled = true;
		
		wraper.appendChild(backFace);
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