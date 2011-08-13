function addSkill(selected, skillValue){
	var activeSkills = document.getElementById("activeSkillsContainer");
	var newSkill = document.createElement("div");

	var attList = [
		"Agility",
		"Body",
		"Charisma",
		"Intuition",
		"Logic",
		"Magic",
		"Reaction",
		"Ressonance",
		"Strength",
		"Willpower"
	];
	var skillList = [
		[
			[
				"Close Combat",
				"skillGroup"
			],
			[
				"Firearms",
				"skillGroup"
			],
			"Archery",
			"Automatics",
			"Blades",
			"Clubs",
			"Escape Artist",
			"Forgery",
			"Gunnery",
			"Gymnastics",
			"Heavy Weapon",
			"Infiltration",
			"Locksmith",
			"Longarms",
			"Palming",
			"Pistols",
			"Throwing Weapons",
			"Unarmed Combat"
		],
		[
			"Diving",
			"Parachuting"
		],
		[
			[
				"Influence",
				"skillGroup"
			],
			"Con",
			"Etiquette",
			"Instruction",
			"Intimidation",
			"Leadership",
			"Negotiation"
		],
		[
			[
				"Outdoors",
				"skillGroup"
			],
			[
				"Stealth",
				"skillGroup"
			],
			"Artisan",
			"Assensing",
			"Disguise",
			"Navigation",
			"Perception",
			"Shadowing",
			"Street Knowledge",
			"Tracking"
		],
		[
			[
				"Biotech",
				"skillGroup"
			],
			[
				"Cracking",
				"skillGroup"
			],
			[
				"Electronics",
				"skillGroup"
			],
			[
				"Mechanis",
				"skillGroup"
			],
			"Aeronautic Mechanics",
			"Armorer",
			"Automotive Mechanics",
			"Computer",
			"Cybertechnology",
			"Cybercombat",
			"Data Search",
			"Demolitions",
			"Electronic Warfare",
			"First Aid",
			"Industrial Mechanics",
			"Hacking",
			"Hardware",
			"Medicine",
			"Nautical Mechanics",
			"Software"
		],
		[
			[
				"Conjuring",
				"skillGroup"
			],
			[
				"Sorcery",
				"skillGroup"
			],
			"Banishing",
			"Binding",
			"Counterspelling",
			"Ritual Spellcasting",
			"Spellcasting",
			"Summoning"
		],
		[
			"Dodge",
			"Pilot Aerospace",
			"Pilot Aircraft",
			"Pilot anthroform",
			"Pilot Ground Craft",
			"Pilot Watercraft"
		],
		[
			[
				"Tasking",
				"skillGroup"
			],
			"Compiling",
			"Decompiling",
			"Registering"
		],
		[
			"Climbing",
			"Running",
			"Swimming"
		],
		[
			"Astral Combat",
			"Survival"
		]
	];

	newSkill.appendChild(createSelect(skillList, attList, selected));
	newSkill.appendChild(createInput("number", skillValue, "addMargin"));
	activeSkills.appendChild(newSkill);
}

function addOther(name, skillValue){
	var otherSkills = document.getElementById("otherSkillsContainer");
	var newSkill = document.createElement("div");

	newSkill.appendChild(createInput("text", name));
	newSkill.appendChild(createInput("number", skillValue, "addMargin"));
	otherSkills.appendChild(newSkill);
}

function addQuality(selected){
	var qualitiesContainer = document.getElementById("qualitiesContainer");

	var qualityTypes = [
		"Positive Qualities",
		"Negative Qualities"
	];
	var qualitiesList = [
		[
			"Adept (5)",
			"Ambidextrous (5)",
			"Animal Empathy (10)",
			" Aptitude (10)",
			" Astral Chameleon (5)",
			"Blandness (10)",
			"Codeslinger (10)",
			"Double Jointed (5)",
			"Exceptional Attribute (20)",
			"First Impression (5)",
			"Focused Concentration (10/20)",
			"Guts (5)",
			"High Pain Tolerance (5-15)",
			"Home Ground (10)",
			"Human Loooking (5)",
			"Lucky (20)",
			"Magician (15)",
			"Magic Resistence (5-20)",
			"Mentor Spirit",
			"Murky Link (10)",
			"Mystic Adept (10)",
			"Natural Hardening (10)",
			"Photographic Memory (10)",
			"Quick Healer (10)",
			"Resist. to Pathogens/Toxins (5-10)",
			"Spirit Affinity (10)",
			"Technomancer (5)",
			"Toughtness (10)",
			"Will to Live (5-15)"
		],[
			"Addiction (+5-30)",
			"Allergy (+5-20)",
			"Astral Beacon (+5)",
			"Bad Luck (+20)",
			"Codeblock (+5)",
			"Combat Paralysis (+20)",
			"Elf Poser (+5)",
			"Gremlins (+5-20)",
			"Incompetent (+5)",
			"Infirm (+20)",
			"Low Pain Tolerance (+10)",
			"Ork Poser (+5)",
			"Scorched (+5/10)",
			"Sensitive Neural Structure (+5/15)",
			"Sensitive system (+15)",
			"Simsense Vertigo (+10/15)",
			"SINner (+5/10)",
			"Uncouth (+20)",
			"Uneducated (+20)",
			"Weak Immune System (+5)"
		]
	];

	qualitiesContainer.appendChild(createSelect(qualitiesList, qualityTypes, selected));
}

function addVehicle(name, handling, accel, speed, pilot, body, armor, sensor){
	var vehiclesContainer = document.getElementById("vehiclesContainer");
	var vehicleDiv = document.createElement("div");

	vehicleDiv.appendChild(createInput("text", name,"addMargin"));
	vehicleDiv.appendChild(createInput("number", handling,"addMargin"));
	vehicleDiv.appendChild(createInput("number", accel,"addMargin"));
	vehicleDiv.appendChild(createInput("number", speed,"addMargin"));
	vehicleDiv.appendChild(createInput("number", pilot,"addMargin"));
	vehicleDiv.appendChild(createInput("number", body,"addMargin"));
	vehicleDiv.appendChild(createInput("number", armor,"addMargin"));
	vehicleDiv.appendChild(createInput("number", sensor, "addMargin"));

	vehiclesContainer.appendChild(vehicleDiv);
}

function addMagic(){
	
}

function selectChange(elementId){
	var element = document.getElementById(elementId);
	element.title = element.options[element.selectedIndex].title;
}

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
	if(descriptions && optionsId){
		select.onchange = selectChange(optionsId);
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