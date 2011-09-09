/*global HTMLGen, ShadowrunData*/

/**
 * Shadowrun specific code
 */
var Shadowrun = {
	/**
	 * Add a new skill to the skills container
	 * @param {String} skillContainer The skills container node ID
	 * @param {String} type The skill type either 'active' or 'other'
	 * @param {String} skillName The skill name, used to set it's value
	 * @param {Number} skillValue The rating of the skill, a numeric value
	 */
	addSkill : function(skillContainer, type, skillName, skillValue){
		var container = document.getElementById(skillContainer);
		var wrapper = document.createElement('div');
		if(type.toLowerCase() == 'active'){
			wrapper.appendChild(HTMLGen.createSelect(ShadowrunData.skillList, ShadowrunData.attList, skillName,
				HTMLGen.styleClasses.SELECT_FOCUS));
		} else {
			wrapper.appendChild(HTMLGen.createInput('text', skillName, HTMLGen.styleClasses.TEXT_FOCUS));
		}
		
		wrapper.appendChild(HTMLGen.createInput('number', skillValue, HTMLGen.styleClasses.NUMBER_FOCUS));
		container.appendChild(wrapper);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addQuality : function(qualitiesContainer, selected){
		var container = document.getElementById(qualitiesContainer);
		container.appendChild(HTMLGen.createSelect(ShadowrunData.qualitiesList, ShadowrunData.qualityTypes, selected, 
			HTMLGen.styleClasses.SELECT_FOCUS));
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} vehiclesContainer The vehicles container node ID
	 * @param {String} name The vehicle name
	 * @param {String} handling The vahicle handling
	 * @param {String} accel The Vehicle acceleration
	 * @param {String} speed The vehicle speed
	 * @param {String} pilot The vehicle pilot
	 * @param {String} body The vehicle body
	 * @param {String} armor The vehicle armor
	 * @param {String} sensor The vehicle sensor
	 */
	addVehicle : function(vehiclesContainer, name, handling, accel, speed, pilot, body, armor, sensor){
		var container = document.getElementById(vehiclesContainer);
		var wrapper = document.createElement('div');
	
		wrapper.appendChild(HTMLGen.createInput('text', name, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', handling, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', accel, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', speed, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', pilot, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', body, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', armor, HTMLGen.styleClasses.NUMBER_FOCUS));
		wrapper.appendChild(HTMLGen.createInput('number', sensor, HTMLGen.styleClasses.NUMBER_FOCUS));
	
		container.appendChild(wrapper);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addImplant : function(implantsContainer, selected, rating, essence, notes){
		var container = document.getElementById(implantsContainer);
		var implant = document.createElement('div');
		
		implant.appendChild(HTMLGen.createSelect(ShadowrunData.implantsList, ShadowrunData.implantsGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
		implant.appendChild(HTMLGen.createInput('number', rating, HTMLGen.styleClasses.NUMBER_FOCUS));
		implant.appendChild(HTMLGen.createInput('number', essence, HTMLGen.styleClasses.NUMBER_FOCUS));
		implant.appendChild(HTMLGen.createInput('text', notes, HTMLGen.styleClasses.TEXT_FOCUS));
		container.appendChild(implant);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addWeapon : function(weaponsContainer, selected, reach, damage, damageType, ap){
		var container = document.getElementById(weaponsContainer);
		var weapon = document.createElement('div');
		
		weapon.appendChild(HTMLGen.createSelect(ShadowrunData.weaponsList, ShadowrunData.weaponsGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
		weapon.appendChild(HTMLGen.createInput('number', reach, HTMLGen.styleClasses.NUMBER_FOCUS));
		weapon.appendChild(HTMLGen.createInput('number'), damage, HTMLGen.styleClasses.NUMBER_FOCUS);
		weapon.appendChild(HTMLGen.createSelect(['P','S'], null, damageType, HTMLGen.styleClasses.SELECT_FOCUS));
		weapon.appendChild(HTMLGen.createInput('number',ap, HTMLGen.styleClasses.NUMBER_FOCUS));
		container.appendChild(weapon);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addGun : function(selected, damage, ap, mode, rc, ammo, ammoType){
		var gunsContainer = document.getElementById('gunsContainer');
		var gun = document.createElement('div');
		
		gun.appendChild(HTMLGen.createSelect(ShadowrunData.gunsList, ShadowrunData.gunsGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', damage, HTMLGen.styleClasses.NUMBER_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', ap, HTMLGen.styleClasses.NUMBER_FOCUS));
		gun.appendChild(HTMLGen.createSelect(['SS','SA','BF','FA'], null, mode, HTMLGen.styleClasses.SELECT_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', rc, HTMLGen.styleClasses.NUMBER_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', ammo, HTMLGen.styleClasses.NUMBER_FOCUS));
		gunsContainer.appendChild(gun);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} spellsContainer The spells container node ID
	 * @param {String} selected The selected spell from the list
	 */
	addSpell : function(spellsContainer, selected){
		var spells = document.getElementById(spellsContainer);
	
		spells.appendChild(HTMLGen.createSelect(ShadowrunData.spellsList, ShadowrunData.spellsGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addPower : function(selected, rating){
		var powersContainer = document.getElementById('powersContainer');
		var newPower = document.createElement('div');
	
		newPower.appendChild(createSelect(powerList, null, selected));
		newPower.appendChild(createInput('number', rating));
		powersContainer.appendChild(newPower);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addProgram : function(selected, rating){
		var programsContainer = document.getElementById('programsContainer');
		var newProgram = document.createElement('div');
	
		newProgram.appendChild(createSelect(programList, programGroups, selected));
		newProgram.appendChild(createInput('number'), rating);
		programsContainer.appendChild(newProgram);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addSpirit : function(spirit, force, services, bound){
		var spiritsContainer = document.getElementById('spiritsContainer');
		var newSpirit = document.createElement('div');
		
		newSpirit.appendChild(createInput('text', spirit));
		newSpirit.appendChild(createInput('number', force));
		newSpirit.appendChild(createInput('number', services));
		newSpirit.appendChild(createSelect(['B','U'], null, bound));
		spiritsContainer.appendChild(newSpirit);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addContact : function(name, loyalty, conn) {
	  var contactsContainer = document.getElementById('contactsContainer');
	  var contact = document.createElement('div');
	  
	  contact.appendChild(createInput('text', name));
	  contact.appendChild(createInput('number', loyalty));
	  contact.appendChild(createInput('number', conn));
	  
	  contactsContainer.appendChild(contact);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addArmor : function(selected){
		var armorContainer = document.getElementById('armorContainer');
		
		armorContainer.appendChild(createSelect(armorList, armorGroups, selected));
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addMisc : function(selected, note){
		var miscContainer = document.getElementById('miscContainer');
		var misc = document.createElement('div');
		
		misc.appendChild(createSelect(miscList,miscGroups,selected));
		misc.appendChild(createInput('text', note));
		miscContainer.appendChild(misc);
	}
};





function spellsDescription() {
	var description = document.getElementById('spellsDescription');
	description.title='Type:\n\tP = Physical\n\tM = Mental\n' +
	'Range:\n\t' +
		'LOS = Line of sight\n\t' +
		'T = Touch\n\t' +
		'V = Voluntary targets only\n\t' +
		'A = Area spell\n' +
	'Damage:\n\t' +
		'P = Physical\n\t' +
		'S = Stun\n' +
	'Duration:\n\t' +
		'I = Instant\n\t' +
		'S = Sustained\n\t' +
		'P = Permanent\n' +
	'Drain Value:\n\t' +
		'F = Force';
}

function phisicalBoxes(){
	var body = document.getElementById('body').value;
	var phisical = 8 + Math.ceil(body/2);
	var boxes = document.getElementsByClassName('phisicalBoxes');
	
	for (var i=0; i < boxes.length; i++) {
	  boxes[i].disabled = false;
	};
	for (var i=phisical; i < boxes.length; i++) {
		boxes[i].disabled = true;
	}
}

function stunBoxes(){
	var will = document.getElementById('willpower').value;
	var stun = 8 + Math.ceil(will/2);
	var boxes = document.getElementsByClassName('stunBoxes');
	
	for (var i=0; i < boxes.length; i++) {
	  boxes[i].disabled = false;
	};
	for (var i=stun; i < boxes.length; i++) {
		boxes[i].disabled = true;
	}
}