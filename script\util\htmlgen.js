function createInput (inputType, inputValue, inputClass, inputId, description) {
	var inputDiv = document.createElement("div");
	var input = document.createElement("input");
	if(inputType){
		input.type = inputType;
	}
	if (inputValue) {
		input.value = inputValue;
	}
	if(inputClass){
		input.className = inputClass;
	}
	if(inputId){
		input.id = inputId;
	}
	if(description){
		input.title = description;
	}

	inputDiv.appendChild(input);
	
	return inputDiv;
}

function createSelect (options, optionGroups, selected, optionsId, optionsClass, descriptions) {
	var selectDiv = document.createElement("div");
	var select = document.createElement("select");

	if(optionsId){
		select.id = optionsId;
	}
	if(optionsClass){
		select.className = optionsClass;
	}
	if(descriptions){
		select.onchange = selectChange();
	}

	if (optionGroups.length > 0) {
		for(var i in optionGroups){
			var optGroup = document.createElement("optgroup");
			optGroup.label = optionGroups[i];

			for(var j in options[i]){
				var opt = document.createElement("option");
				if(typeof options[i][j] == 'object') {
					opt.textContent = options[i][j][0];
					opt.className = options[i][j][1];
				}else{
					opt.textContent = options[i][j];
				}

				if(opt.textContent == selected){
					opt.selected = "selected";
					if(descriptions){
						select.title = descriptions[i][j];
					}
				}
				if(descriptions){
					opt.title = descriptions[i][j];
				}

				optGroup.appendChild(opt);
			}

			select.appendChild(optGroup);
		}
	}else{
		for(var i in options[i]){
			var opt = document.createElement("option");
			if(typeof options[i] == 'object') {
				opt.textContent = options[i][0];
				opt.className = options[i][1];
			}else{
				opt.textContent = options[i];
			}

			if(opt.textContent == selected){
				opt.selected = "selected";
				if (descriptions) {
					select.title = descriptions[i];
				}
			}
			if(descriptions){
				opt.title = descriptions[i];
			}

			select.appendChild(opt);
		}
	}

	selectDiv.appendChild(select);

	return selectDiv;
}

function removeElements(nodeId){
		var elements = document.getElementById(nodeId);
		if(elements.children.length > 0){
			elements.removeChild(elements.lastChild);
		}
}