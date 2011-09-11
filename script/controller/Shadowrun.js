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
	 * Add a new vehicle to the vehicles container
	 * @param {String} vehiclesContainer The vehicles container node ID
	 * @param {String} name The vehicle name
	 * @param {Number} handling The vahicle handling
	 * @param {Number} accel The Vehicle acceleration
	 * @param {Number} speed The vehicle speed
	 * @param {Number} pilot The vehicle pilot
	 * @param {Number} body The vehicle body
	 * @param {Number} armor The vehicle armor
	 * @param {Number} sensor The vehicle sensor
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
	 * Add a new implant to the implants container
	 * @param {String} implantsContainer The implants container node ID
	 * @param {String} selected The selected quality from the list
	 * @param {Number} rating The rating value
	 * @param {Number} essence The essence rating
	 * @param {String} notes Notes about the implant
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
	 * Add a new weapon to the weapons container
	 * @param {String} weaponsContainer The weapons container node ID
	 * @param {String} selected The selected weapon from the list
	 * @param {Number} reach The weapon range
	 * @param {Number} damage The weapon damage number
	 * @param {String} damageType The damage type of the weapon
	 * @param {Number} ap The armor panatration rating
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
	 * Add a new gun to the guns container
	 * @param {String} gunsContainer The guns container node ID
	 * @param {String} selected The selected quality from the list
	 * @param {Number} damage The gun damage value
	 * @param {Number} ap The armor penetrarion rating
	 * @param {String} mode The gun mode
	 * @param {Number} rc The gun recoil compensation
	 * @param {Number} ammo The weapon ammo quantity
	 */
	addGun : function(gunsContainer, selected, damage, ap, mode, rc, ammo){
		var container = document.getElementById(gunsContainer);
		var gun = document.createElement('div');
		
		gun.appendChild(HTMLGen.createSelect(ShadowrunData.gunsList, ShadowrunData.gunsGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', damage, HTMLGen.styleClasses.NUMBER_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', ap, HTMLGen.styleClasses.NUMBER_FOCUS));
		gun.appendChild(HTMLGen.createSelect(['SS','SA','BF','FA'], null, mode, HTMLGen.styleClasses.SELECT_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', rc, HTMLGen.styleClasses.NUMBER_FOCUS));
		gun.appendChild(HTMLGen.createInput('number', ammo, HTMLGen.styleClasses.NUMBER_FOCUS));
		container.appendChild(gun);
	},
	/**
	 * Add a new spell to the spells container
	 * @param {String} spellsContainer The spells container node ID
	 * @param {String} selected The selected spell from the list
	 */
	addSpell : function(spellsContainer, selected){
		var spells = document.getElementById(spellsContainer);
	
		spells.appendChild(HTMLGen.createSelect(ShadowrunData.spellsList, ShadowrunData.spellsGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
	},
	/**
	 * Add a new adept power/complex form to the powers container
	 * @param {String} powersContainer The powers container node ID
	 * @param {String} selected The selected power from the list
	 * @param {Number} rating The power rating
	 */
	addPower : function(powersContainer, selected, rating){
		var container = document.getElementById(powersContainer);
		var power = document.createElement('div');
	
		power.appendChild(HTMLGen.createSelect(ShadowrunData.powerList, null, selected, HTMLGen.styleClasses.SELECT_FOCUS));
		power.appendChild(HTMLGen.createInput('number', rating, HTMLGen.styleClasses.NUMBER_FOCUS));
		powersContainer.appendChild(power);
	},
	/**
	 * Add a new program to the programs container
	 * @param {String} programsContainer The programs container node ID
	 * @param {String} selected The selected programs from the list
	 * @param {Number} rating The program rating
	 */
	addProgram : function(programsContainer, selected, rating){
		var container = document.getElementById(programsContainer);
		var program = document.createElement('div');
	
		program.appendChild(HTMLGen.createSelect(ShadowrunData.programList, ShadowrunData.programGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
		program.appendChild(HTMLGen.createInput('number'), rating, HTMLGen.styleClasses.NUMBER_FOCUS);
		programsContainer.appendChild(program);
	},
	/**
	 * Add a new spirit to the spirits container
	 * @param {String} spiritssContainer The spirts container node ID
	 * @param {String} spirit The spirit kind
	 * @param {Number} force The force of the spirit
	 * @param {Number} services The number of services
	 * @param {String} bound If the spirit is bounbd/unbound
	 */
	addSpirit : function(spiritsContainer, spirit, force, services, bound){
		var container = document.getElementById(spiritsContainer);
		var newSpirit = document.createElement('div');
		
		newSpirit.appendChild(HTMLGen.createInput('text', spirit, HTMLGen.styleClasses.TEXT_FOCUS));
		newSpirit.appendChild(HTMLGen.createInput('number', force, HTMLGen.styleClasses.NUMBER_FOCUS));
		newSpirit.appendChild(HTMLGen.createInput('number', services, HTMLGen.styleClasses.NUMBER_FOCUS));
		newSpirit.appendChild(HTMLGen.createSelect(['B','U'], null, bound, HTMLGen.styleClasses.SELECT_FOCUS));
		container.appendChild(newSpirit);
	},
	/**
	 * Add a new contact to the contacts container
	 * @param {String} contactsContainer The contacts container node ID
	 * @param {String} name The contact name
	 * @param {String} selected The contact type
	 * @param {Number} loyalty The loyalty of the contact
	 * @param {Number} conn The connection rating of the contact
	 */
	addContact : function(contactsContainer, name, selected, loyalty, conn) {
	  var container = document.getElementById(contactsContainer);
	  var contact = document.createElement('div');
	  
	  contact.appendChild(HTMLGen.createInput('text', name, HTMLGen.styleClasses.TEXT_FOCUS));
	  contact.appendChild(HTMLGen.createSelect(ShadowrunData.contacts, null, selected, HTMLGen.styleClasses.SELECT_FOCUS));
	  contact.appendChild(HTMLGen.createInput('number', loyalty, HTMLGen.styleClasses.NUMBER_FOCUS));
	  contact.appendChild(HTMLGen.createInput('number', conn, HTMLGen.styleClasses.NUMBER_FOCUS));
	  
	  container.appendChild(contact);
	},
	/**
	 * Add a new armor to the armor container
	 * @param {String} armorContainer The armor container node ID
	 * @param {String} selected The selected armor from the list
	 */
	addArmor : function(armorContainer, selected){
		var container = document.getElementById(armorContainer);
		
		armorContainer.appendChild(HTMLGen.createSelect(ShadowrunData.armorList, ShadowrunData.armorGroups, selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
	},
	/**
	 * Add a new misc equipament to the misc container
	 * @param {String} miscContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 * @param {String} note Some note about the equippament
	 */
	addMisc : function(miscContainer, selected, note){
		var container = document.getElementById(miscContainer);
		var misc = document.createElement('div');
		
		misc.appendChild(HTMLGen.createSelect(ShadowrunData.miscList,ShadowrunData.miscGroups,selected,
			HTMLGen.styleClasses.SELECT_FOCUS));
		misc.appendChild(HTMLGen.createInput('text', note, HTMLGen.styleClasses.TEXT_FOCUS));
		miscContainer.appendChild(misc);
	},
	/**
	 * Adds dscriptin to a item
	 * @param {String} node The node ID
	 * @param {String} description The description itself
	 */
	addDescription : function(node, description){
		var desc = document.getElementById(node);
		desc.title = description;
	},
	damageBoxes : function(boxesId, attId){
		var att = document.getElementById(attId).value;
		var value = 8 + Math.ceil(att/2);
		var boxes = document.getElementsByClassName(boxesId);
		var i;
		
		for (i=0; i < boxes.length; i++) {
		  boxes[i].disabled = false;
		}
		for (i=value; i < boxes.length; i++) {
			boxes[i].disabled = true;
		}
	}
};