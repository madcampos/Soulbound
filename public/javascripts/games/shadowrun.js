/*global game, createSelect, createInput*/
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
		var wrapper = document.createElement('tr');
		if(type.toLowerCase() == 'active'){
			wrapper.appendChild(createSelect(game.skillList, game.attList, skillName));
		} else {
			wrapper.appendChild(createInput('text', skillName));
		}
		
		wrapper.appendChild(createInput('number', skillValue));
		container.appendChild(wrapper);
	},
	/**
	 * Add a new quality to the qualities container
	 * @param {String} qualitiesContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 */
	addQuality : function(qualitiesContainer, selected){
		var container = document.getElementById(qualitiesContainer);
		var quality = document.createElement('tr');
		
		quality.appendChild(createSelect(game.qualitiesList, game.qualityTypes, selected));
		container.appendChild(quality);
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
		var vheicle = document.createElement('tr');
	
		vheicle.appendChild(createInput('text', name));
		vheicle.appendChild(createInput('number', handling));
		vheicle.appendChild(createInput('number', accel));
		vheicle.appendChild(createInput('number', speed));
		vheicle.appendChild(createInput('number', pilot));
		vheicle.appendChild(createInput('number', body));
		vheicle.appendChild(createInput('number', armor));
		vheicle.appendChild(createInput('number', sensor));
	
		container.appendChild(vheicle);
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
		var implant = document.createElement('tr');
		
		implant.appendChild(createSelect(game.implantsList, game.implantsGroups, selected));
		implant.appendChild(createInput('number', rating));
		implant.appendChild(createInput('number', essence));
		implant.appendChild(createInput('text', notes));
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
		var weapon = document.createElement('tr');
		
		weapon.appendChild(createSelect(game.weaponsList, game.weaponsGroups, selected));
		weapon.appendChild(createInput('number', reach));
		weapon.appendChild(createInput('number'), damage);
		weapon.appendChild(createSelect(['P','S'], null, damageType));
		weapon.appendChild(createInput('number',ap));
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
		var gun = document.createElement('tr');
		
		gun.appendChild(createSelect(game.gunsList, game.gunsGroups, selected));
		gun.appendChild(createInput('number', damage));
		gun.appendChild(createInput('number', ap));
		gun.appendChild(createSelect(['SS','SA','BF','FA'], null, mode));
		gun.appendChild(createInput('number', rc));
		gun.appendChild(createInput('number', ammo));
		container.appendChild(gun);
	},
	/**
	 * Add a new spell to the spells container
	 * @param {String} spellsContainer The spells container node ID
	 * @param {String} selected The selected spell from the list
	 */
	addSpell : function(spellsContainer, selected){
		var spells = document.getElementById(spellsContainer);
		var spell = document.createElement('tr');
		
		spell.appendChild(createSelect(game.spellsList, game.spellsGroups, selected));
		spells.appendChild(spell);
	},
	/**
	 * Add a new adept power/complex form to the powers container
	 * @param {String} powersContainer The powers container node ID
	 * @param {String} selected The selected power from the list
	 * @param {Number} rating The power rating
	 */
	addPower : function(powersContainer, selected, rating){
		var container = document.getElementById(powersContainer);
		var power = document.createElement('tr');
	
		power.appendChild(createSelect(game.powerList, game.powerGroups, selected));
		power.appendChild(createInput('number', rating));
		container.appendChild(power);
	},
	/**
	 * Add a new program to the programs container
	 * @param {String} programsContainer The programs container node ID
	 * @param {String} selected The selected programs from the list
	 * @param {Number} rating The program rating
	 */
	addProgram : function(programsContainer, selected, rating){
		var container = document.getElementById(programsContainer);
		var program = document.createElement('tr');
	
		program.appendChild(createSelect(game.programList, game.programGroups, selected));
		program.appendChild(createInput('number'), rating);
		container.appendChild(program);
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
		var newSpirit = document.createElement('tr');
		
		newSpirit.appendChild(createInput('text', spirit));
		newSpirit.appendChild(createInput('number', force));
		newSpirit.appendChild(createInput('number', services));
		newSpirit.appendChild(createSelect(['B','U'], null, bound));
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
	  var contact = document.createElement('tr');
	  
	  contact.appendChild(createInput('text', name));
	  contact.appendChild(createSelect(game.contacts, null, selected));
	  contact.appendChild(createInput('number', loyalty));
	  contact.appendChild(createInput('number', conn));
	  
	  container.appendChild(contact);
	},
	/**
	 * Add a new armor to the armor container
	 * @param {String} armorContainer The armor container node ID
	 * @param {String} selected The selected armor from the list
	 */
	addArmor : function(armorContainer, selected){
		var container = document.getElementById(armorContainer);
		var armor = document.createElement('tr');
		
		armor.appendChild(createSelect(game.armorList, game.armorGroups, selected));
		container.appendChild(armor);
	},
	/**
	 * Add a new misc equipament to the misc container
	 * @param {String} miscContainer The qualities container node ID
	 * @param {String} selected The selected quality from the list
	 * @param {String} note Some note about the equippament
	 */
	addMisc : function(miscContainer, selected, note){
		var container = document.getElementById(miscContainer);
		var misc = document.createElement('tr');
		
		misc.appendChild(createSelect(game.miscList,game.miscGroups,selected));
		misc.appendChild(createInput('text', note));
		container.appendChild(misc);
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