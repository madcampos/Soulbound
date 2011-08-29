function getPicture(){
	var pic = document.getElementById("pic");
	if (pic.tagName == "IMG") {
		return pic.src;
	}else{
		return "";
	}
}

function getSkills(skillType){
	if (skillType == "active") {
		var container = document.getElementById("activeSkillsContainer");
	}else{
		var container = document.getElementById("otherSkillsContainer");
	}
	var skills = [];
	
	for (var i=0; i < container.children.length; i++) {
		skills[i] = [];
		skills[i][0] = container.children[i].children[0].value;
		skills[i][1] = container.children[i].children[1].value;
	}
	
	return skills;
}

function getVehicles(){
	var container = document.getElementById("vehiclesContainer");
	var vehicles = [];
	
	for (var i=0; i < container.children.length; i++) {
		vehicles[i] = [];
		vehicles[i][0] = container.children[i].children[0].value;
		vehicles[i][1] = container.children[i].children[1].value;
		vehicles[i][2] = container.children[i].children[2].value;
		vehicles[i][3] = container.children[i].children[3].value;
		vehicles[i][4] = container.children[i].children[4].value;
		vehicles[i][5] = container.children[i].children[5].value;
		vehicles[i][6] = container.children[i].children[6].value;
		vehicles[i][7] = container.children[i].children[7].value;
	}
	
	return vehicles;
}

function getQualities(){
	var container = document.getElementById("qualitiesContainer");
	var qualities = [];
	
	for (var i=0; i < container.children.length; i++) {
		qualities[i] = container.children[i].value;
	}
	
	return qualities;
}

function getDamage(damageType){
	if(damageType == "phisical"){
		var boxes = document.getElementsByClassName("phisicalBoxes");
	}else{
		var boxes = document.getElementsByClassName("stunBoxes");
	}
	
	damage = 0;
	
	for (var i=0; i < boxes.length; i++) {
		if (boxes[i].checked == true){
			damage++;
		}
	}
	
	return damage;
}

function getMisc(){
	var container = document.getElementById("miscContainer");
	var misc = [];
	
	for (var i=0; i < container.children.length; i++) {
	  misc[i] = [];
	  
	  misc[i][0] = container.children[i].children[0].value;
	  misc[i][1] = container.children[i].children[1].value;
	}
	
	return misc;
}

function getImplants(){
	var container = document.getElementById("implantsContainer");
	var implants = [];
	
	for (var i=0; i < container.children.length; i++) {
		implants[i] = [];
		
		implants[i][0] = container.children[i].children[0].value;
		implants[i][1] = container.children[i].children[1].value;
		implants[i][2] = container.children[i].children[2].value;
		implants[i][3] = container.children[i].children[3].value;
	};
	
	return implants;
}

function getWeapons(){
	var container = document.getElementById("weaponsContainer");
	var weapons = [];
	
	for (var i=0; i < container.children.length; i++) {
		weapons[i] = [];
		
		weapons[i][0] = container.children[i].children[0].value;
		weapons[i][1] = container.children[i].children[1].value;
		weapons[i][2] = container.children[i].children[2].value;
		weapons[i][3] = container.children[i].children[3].value;
		weapons[i][3] = container.children[i].children[4].value;
	};
	
	return weapons;
}

function getGuns(){
	var container = document.getElementById("gunsContainer");
	var guns = [];
	
	for (var i=0; i < container.children.length; i++) {
		guns[i] = [];
		
		guns[i][0] = container.children[i].children[0].value;
		guns[i][1] = container.children[i].children[1].value;
		guns[i][2] = container.children[i].children[2].value;
		guns[i][3] = container.children[i].children[3].value;
		guns[i][4] = container.children[i].children[4].value;
		guns[i][5] = container.children[i].children[5].value;
	};
	
	return guns;
}

function getArmor(){
	var container = document.getElementById("armorContainer");
	var armor = [];
	
	for (var i=0; i < container.children.length; i++) {
		armor[i] = container.children[i].value;
	};
	
	return armor;
}

function getContacts(){
	var container = document.getElementById("contactsContainer");
	var contacts = [];
	
	for (var i=0; i < container.children.length; i++) {
		contacts[i] = [];
		
		contacts[i][0] = container.children[i].children[0].value;
		contacts[i][1] = container.children[i].children[1].value;
		contacts[i][2] = container.children[i].children[2].value;
	};
	
	return contacts;
}

function getPrograms(){
	var container = document.getElementById("programsContainer");
	var programs = [];
	
	for (var i=0; i < container.children.length; i++) {
		programs[i] = [];
		programs[i][0] = container.children[i].children[0].value;
		programs[i][1] = container.children[i].children[1].value;
	};
	
	return programs;
}

function getSpells(){
	var container = document.getElementById("spellsContainer");
	var spells = [];
	
	for (var i=0; i < container.children.length; i++) {
		spells[i] = container.children[i].value;
	};
	
	return spells;
}

function getSpirits(){
	var container = document.getElementById("spiritsContainer");
	var spirits = [];
	
	for (var i=0; i < container.children.length; i++) {
		spirits[i] = [];
		
		spirits[i][0] = container.children[i].children[0].value;
		spirits[i][1] = container.children[i].children[1].value;
		spirits[i][2] = container.children[i].children[2].value;
		spirits[i][3] = container.children[i].children[3].value;
	};
	
	return spirits;
}

function getPowers(){
	var container = document.getElementById("powersContainer");
	var powers = [];
	
	for (var i=0; i < container.children.length; i++) {
		powers[i] = [];
		
		powers[i][0] = container.children[i].children[0].value;
		powers[i][1] = container.children[i].children[1].value;
	};
	
	return powers;
}

/**
 * Method to stringify the JSON version of the char.
 */
function saveChar(){
	var character  = {
		//Personal Data
		name : document.getElementById("name").value,
		metatype : document.getElementById("metatype").value,
		age : document.getElementById("age").value,
		sex : document.getElementById("sex").value,
		money : document.getElementById("money").value,
		lifestyle : document.getElementById("lifestyle").value,
		totalKarma : document.getElementById("totalKarma").value,
		currentKarma : document.getElementById("currentKarma").value,
		streetCredit : document.getElementById("streetCredit").value,
		notoriety : document.getElementById("notoriety").value,
		publicAwarness : document.getElementById("publicAwarness").value,
		//Attributes
		body : document.getElementById("body").value,
		agility : document.getElementById("agility").value,
		reaction : document.getElementById("reaction").value,
		strength : document.getElementById("strength").value,
		charisma : document.getElementById("charisma").value,
		intuition : document.getElementById("intuition").value,
		logic : document.getElementById("logic").value,
		willpower : document.getElementById("willpower").value,
		edge : document.getElementById("edge").value,
		essence : document.getElementById("essence").value,
		initiative : document.getElementById("initiative").value,
		magic : document.getElementById("magic").value,
		astralInit : document.getElementById("astralInit").value,
		matrixInit : document.getElementById("matrixInit").value,
		initPasses : document.getElementById("initPasses").value,
		//Picture
		picture : getPicture(),
		//Skills
		activeSkills : getSkills("active"),
		otherSkills : getSkills("other"),
		//Qualities
		qualities : getQualities(),
		//Status Monitor
		phisicalDamage : getDamage("phisical"),
		stunDamage : getDamage("stun"),
		//Gear
		vehicles : getVehicles(),
		misc : getMisc(),
		implants : getImplants(),
		weapons : getWeapons(),
		guns : getGuns(),
		armor : getArmor(),
		//Contacts
		contacts : getContacts(),
		//Specifics
		commlink : [
			document.getElementById("link").value,
			document.getElementById("response").value,
			document.getElementById("system").value,
			document.getElementById("firewall").value,
			document.getElementById("signal").value
		],
		programs : getPrograms(),
		spells : getSpells(),
		spirits : getSpirits(),
		adeptPowers : getPowers(),
		//notes
		notes : document.getElementById("notesContainer").value
	};
	
	charWindow = window.open();
	charDocument = charWindow.document;
	charDocument.write(JSON.stringify(character));
	charDocument.close();
}

function setPicture(picture){
	var pic = document.getElementById("pic");
	if(picture != ""){
		if(pic.tagName == "IMG"){
			pic.src = picture;
		}else{
			var img = document.createElement("img");
			img.id = "pic";
			var picContainer = document.getElementById("picture");
			picContainer.replaceChild(pic, img);
		}
	}
}

function setSkills(type, skillList){
	if (type == "active") {
		for (var i=0; i < skillList.length; i++) {
			addSkill(skillList[i][0], skillList[i][1]);
		};
	}else{
		for (var i=0; i < skillList.length; i++) {
			addOther(skillList[i][0], skillList[i][1]);
		};
	}
}

function setQualities(qualities){
	for (var i=0; i < qualities.length; i++) {
			addQuality(qualities[i]);
		}
}

function setDamage(type, damage){
	if(type == "phisical"){
		var boxes = document.getElementsByClassName("phisicalBoxes");
	}else{
		var boxes = document.getElementsByClassName("stunBoxes");
	}
	
	for (var i=0; i < damage; i++) {
		boxes[i].checked == true;
	}
}

function setVehicles(vehicles){
	for (var i=0; i < vehicles.length; i++) {
		addVehicle(vehicles[i][0], vehicles[i][1], vehicles[i][2], vehicles[i][3], vehicles[i][4], vehicles[i][5], vehicles[i][6], vehicles[i][7]);
	}
}

function setMisc(misc){
	for (var i=0; i < misc.length; i++) {
			addMisc(misc[i][0], misc[i][1]);
	}
}

function setImplants(implants){
	for (var i=0; i < implants.length; i++) {
			addImplant(implants[i][0], implants[i][1], implants[i][2], implants[i][3]);
	}
}

function setWeapons(weapons){
	for (var i=0; i < weapons.length; i++) {
			addWeapon(weapons[i][0], weapons[i][1], weapons[i][2], weapons[i][3], weapons[i][4]);
	}
}

function setGuns(guns){
	for (var i=0; i < guns.length; i++) {
			addGun(guns[i][0], guns[i][1], guns[i][2], guns[i][3], guns[i][4], guns[i][5]);
	}
}

function setArmor(armor){
	for (var i=0; i < armor.length; i++) {
			addArmor(armor[i]);
	}
}

function setContacts(contacts){
	for (var i=0; i < contacts.length; i++) {
			add(contacts[i][0], contacts[i][1], contacts[i][2]);
	}
}

function setPrograms(programs){
	for (var i=0; i < programs.length; i++) {
			addProgram(programs[i][0], programs[i][1]);
	}
}

function setSpells(spells){
	for (var i=0; i < spells.length; i++) {
			addSpell(spells[i]);
	}
}

function setSpirits(spirits){
	for (var i=0; i < spirits.length; i++) {
			addSpirit(spirits[i][0], spirits[i][1], spirits[i][2], spirits[i][3]);
	}
}

function setPowers(adeptPowers){
	for (var i=0; i < adeptPowers.length; i++) {
			addPower(adeptPowers[i][0], adeptPowers[i][1]);
	}
}

/**
 * Method to load the JSON version of char and fill the sheet
 */
function loadChar(){
	var file = document.getElementById('charSheet').files;
	if (!file.length) {
		alert('Please select a file!');
		return;
	}
	
	var character = {};
	
	var reader = new FileReader();
	reader.onloadend = function(e){
		character = JSON.parse(e.target.result);
		console.log(character);

		//Personal Data
		document.getElementById("name").value = character.name;
		document.getElementById("metatype").value = character.metatype;
		document.getElementById("age").value = character.age;
		document.getElementById("sex").value = character.sex;
		document.getElementById("money").value = character.money;
		document.getElementById("lifestyle").value = character.lifestyle;
		document.getElementById("totalKarma").value = character.totalKarma;
		document.getElementById("currentKarma").value = character.currentKarma;
		document.getElementById("streetCredit").value = character.streetcredit;
		document.getElementById("notoriety").value = character.notoriety;
		document.getElementById("publicAwarness").value = character.publicAwarness;
		//Attributes
		document.getElementById("body").value = character.body;
		document.getElementById("agility").value = character.agility;
		document.getElementById("reaction").value = character.reaction;
		document.getElementById("strength").value = character.strength;
		document.getElementById("charisma").value = character.charisma;
		document.getElementById("intuition").value = character.intuition;
		document.getElementById("logic").value = character.logic;
		document.getElementById("willpower").value = character.willpower;
		document.getElementById("edge").value = character.edge;
		document.getElementById("essence").value = character.essence;
		document.getElementById("initiative").value = character.initiative;
		document.getElementById("magic").value = character.magic;
		document.getElementById("astralInit").value = character.astralInit;
		document.getElementById("matrixInit").value = character.matrixInit;
		document.getElementById("initPasses").value = character.initPasses;
		//Picture
		setPicture(character.picture);
		//Skills
		setSkills("active", character.activeSkills);
		setSkills("other", character.otherSkills);
		//Qualities
		setQualities(character.qualities);
		//Status Monitor
		setDamage("phisical", character.phisicalDamage);
		setDamage("stun", character.stunDamage);
		//Gear
		setVehicles(character.vehicles);
		setMisc(character.misc);
		setImplants(character.implants);
		setWeapons(character.weapons);
		setGuns(character.guns);
		setArmor(character.armor);
		//Contacts
		setContacts(character.contacts);
		//Specifics
		document.getElementById("link").value = character.commlink[0];
		document.getElementById("response").value = character.commlink[1];
		document.getElementById("system").value = character.commlink[2];
		document.getElementById("firewall").value = character.commlink[3];
		document.getElementById("signal").value = character.commlink[4];
		setPrograms(character.programs);
		setSpells(character.spells);
		setSpirits(character.spirits);
		setPowers(character.adeptPowers);
		//notes
		document.getElementById("notesContainer").value = character.notes;
	}
	reader.readAsBinaryString(file[0]);
}
