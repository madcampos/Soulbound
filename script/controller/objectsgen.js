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
	newSkill.appendChild(createInput("number", skillValue));
	activeSkills.appendChild(newSkill);
}

function addOther(name, skillValue){
	var otherSkills = document.getElementById("otherSkillsContainer");
	var newSkill = document.createElement("div");

	newSkill.appendChild(createInput("text", name));
	newSkill.appendChild(createInput("number", skillValue));
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
			"Focused Concentration (10)",
			"Focused Concentration (20)",
			"Guts (5)",
			"High Pain Tolerance (5)",
			"High Pain Tolerance (10)",
			"High Pain Tolerance (15)",
			"Home Ground (10)",
			"Human Loooking (5)",
			"Lucky (20)",
			"Magician (15)",
			"Magic Resistence (5)",
			"Magic Resistence (10)",
			"Magic Resistence (15)",
			"Magic Resistence (20)",
			"Mentor Spirit",
			"Murky Link (10)",
			"Mystic Adept (10)",
			"Natural Hardening (10)",
			"Photographic Memory (10)",
			"Quick Healer (10)",
			"Resist. to Pathogens/Toxins (5)",
			"Resist. to Pathogens/Toxins (10)",
			"Spirit Affinity (10)",
			"Technomancer (5)",
			"Toughtness (10)",
			"Will to Live (5)",
			"Will to Live (10)",
			"Will to Live (15)"
		],[
			"Addiction (+5)",
			"Addiction (+10)",
			"Addiction (+15)",
			"Addiction (+20)",
			"Addiction (+25)",
			"Addiction (+30)",
			"Allergy (+5)",
			"Allergy (+10)",
			"Allergy (+15)",
			"Allergy (+20)",
			"Astral Beacon (+5)",
			"Bad Luck (+20)",
			"Codeblock (+5)",
			"Combat Paralysis (+20)",
			"Elf Poser (+5)",
			"Gremlins (+5)",
			"Gremlins (+10)",
			"Gremlins (+15)",
			"Gremlins (+20)",
			"Incompetent (+5)",
			"Infirm (+20)",
			"Low Pain Tolerance (+10)",
			"Ork Poser (+5)",
			"Scorched (+5)",
			"Scorched (+10)",
			"Sensitive Neural Structure (+5)",
			"Sensitive Neural Structure (+10)",
			"Sensitive Neural Structure (+15)",
			"Sensitive System (+15)",
			"Simsense Vertigo (+10)",
			"Simsense Vertigo (+15)",
			"SINner (+5)",
			"SINner (+10)",
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

	vehicleDiv.appendChild(createInput("text", name));
	vehicleDiv.appendChild(createInput("number", handling));
	vehicleDiv.appendChild(createInput("number", accel));
	vehicleDiv.appendChild(createInput("number", speed));
	vehicleDiv.appendChild(createInput("number", pilot));
	vehicleDiv.appendChild(createInput("number", body));
	vehicleDiv.appendChild(createInput("number", armor));
	vehicleDiv.appendChild(createInput("number", sensor));

	vehiclesContainer.appendChild(vehicleDiv);
}

function addImplant(selected, rating, essence, notes){
	var implantsContainer = document.getElementById("implantsContainer");
	var newImplant = document.createElement("div");
	
	var implantsGroups = [
		"Headware",
		"Eyeware",
		"Earware",
		"Bodyware",
		"Cyberlimbs",
		"Cyberlimb Accessories",
		"Cyberguns",
		"Cyber Melee",
		"Basic Bioware",
		"Cultured Bioware"
	];
	var implantsList = [
		[
			"Commlink",
			"Control Rig",
			"Kink Bomb",
			"Microbomb",
			"Area Bomb",
			"Datajack",
			"Data Lock",
			"Olfactory Booster",
			"Sim Module",
			"Hot-Sim Modified",
			"Taste Booster",
			"Tooth Storage Compartment",
			"Tooth Breakable Compartment",
			"Ultrasound Sensor",
			"Voice Modulator",
			"Secondary Pattern"
		],[
			"Cyberwyes Basic System",
			"Eye Recording Unit",
			"Flare Compensation",
			"Image Link",
			"Low-Light Vision",
			"Ocular Drone",
			"Protective Covers",
			"Retinal Duplication",
			"Smartlink",
			"Thermographic Vision",
			"Vision Enhancement",
			"Vision Magnification",
			"Protective Covers"
		],[
			"Cyberears",
			"Audio Enhancement",
			"Balance Augmenter",
			"Damper",
			"Ear Recording Unit",
			"Select Sound Filter",
			"Sound Link",
			"Spatial Recognizer"
		],[
			"Plastic Bone Lacing",
			"Aluminum Bone Lacing",
			"Titanium Bone Lacing",
			"Cosmetic Modification",
			"Dermal Plating",
			"Fingertip Compartment",
			"Grapple Gun",
			"Internal Air Tank",
			"Muscle Replacement",
			"Reaction Enhancers",
			"Simrig",
			"Skillwires",
			"Smuggling Compartment",
			"Touch Link",
			"Wired Reflexes"
		],[
			"Obvious Full Arm",
			"Obvious Full Leg",
			"Obvious Hand/Foot",
			"Obvious Lower Arm",
			"Obvious Lower Leg",
			"Obvious Torso",
			"Obvious Skull",
			"Synthetic Full Arm",
			"Synthetic Full Leg",
			"Synthetic Hand/Foot",
			"Synthetic Lower Arm",
			"Synthetic Lower Leg",
			"Synthetic Torso",
			"Synthetic Skull",
			"Armor Enhancement",
			"Body Enhancement",
			"Strength Enhancement",
			"Agility Enhancement"
		],[
			"Cyberarm Gyromount",
			"Cyberarm Slide",
			"Cyber Holster",
			"Hydraulic Jacks",
			"Large Smuggling Compartment"
		],[
			"Holdout Pistol",
			"Light Pistol",
			"Machine Pistol",
			"Heavy Pistol",
			"Submachine Gun",
			"Shotgun",
			"Grenade Launcher",
			"External Clip Port",
			"Laser Sight",
			"Silencer",
			"Sound Suppressor"
		],[
			"Handblade (Retractable)",
			"Hand Razors (Retractable)",
			"Spur (Retractable)",
			"Shock Hand"
		],[
			"Adrenaline Pump",
			"Bone Density Augmentation",
			"Cat’s Eyes",
			"Digestive Expansion",
			"Enhanced Articulation",
			"Muscle Augmentation",
			"Muscle Toner",
			"Orthoskin",
			"Pathogenic Defense",
			"Platelet Factories",
			"Skin Pocket",
			"Suprathyroid Gland",
			"Symbiotes",
			"Synthacardium",
			"Tailored Pheromones",
			"Toxin Extractor",
			"Tracheal Filter"
		],[
			"Cerebral Booster",
			"Damage Compensators",
			"Mnemonic Enhancer",
			"Pain Editor",
			"Skill Group Reflex Recorder",
			"Skill Reflex Recorder",
			"Sleep Regulator",
			"Synaptic Booster"
		]
	];
	
	newImplant.appendChild(createSelect(implantsList, implantsGroups, selected));
	newImplant.appendChild(createInput("number",rating));
	newImplant.appendChild(createInput("number",essence));
	newImplant.appendChild(createInput("text",notes));
	implantsContainer.appendChild(newImplant);
}

function addWeapon(selected, reach, damage, damageType, ap){
	var weaponsContainer = document.getElementById("weaponsContainer");
	var newWeapon = document.createElement("div");
	
	var weaponsGroups = [
		"Blades",
		"Clubs",
		"Exotic",
		"Unarmed",
		"Cyberware"
	];
	var weaponsList = [
		[
			"Combat Axe",
			"Forearm Snap-Blades",
			"Katana",
			"Knife",
			"Monofilament Sword",
			"Survival Knife",
			"Sword"
		],[
			"Club",
			"Extendable Baton",
			"Sap",
			"Staff",
			"Stun Baton"
		],[
			"Pole Arm",
			"Monofilament Whip",
			"Shock Frills",
			"Riot Shield",
			"Tares Armor/Shield",
			"Monofialemt Chainsaw"
		],[
			"Shock Glove"
		],[
			"Plastic Bone Lacing",
			"Aluminium Bone Lacing",
			"Titanium Bone Lacing",
			"Hand Blades",
			"Hand Razors",
			"Shock Hand",
			"Spurs"
		]
	];
	
	newWeapon.appendChild(createSelect(weaponsList, weaponsGroups, selected));
	newWeapon.appendChild(createInput("number", reach));
	newWeapon.appendChild(createInput("number"), damage);
	newWeapon.appendChild(createSelect(["P","S"], undefined, damageType));
	newWeapon.appendChild(createInput("number",ap));
	weaponsContainer.appendChild(newWeapon);
}

function addGun(selected, damage, ap, mode, rc, ammo, ammoType){
	var gunsContainer = document.getElementById("gunsContainer");
	var newGun = document.createElement("div");
	
	var gunsGroups = [
		"Bows",
		"Crossbows",
		"Throwing",
		"Tasers",
		"Hold-outs",
		"Light Pistols",
		"Heavy Pistols",
		"Machine Pistols",
		"Submachine Guns",
		"Assault Rifles",
		"Sport Rifles",
		"Sniper rifles",
		"Shotguns",
		"Special Weapons",
		"Light Machine Guns",
		"Medium Machine Guns",
		"Heavy Machine Guns",
		"Assault Cannons",
		"Granade Launchers",
		"Missile Launchers",
		"Exotic Ranged Weapons"
	];
	var gunsList = [
		[
			"Bow"
		],[
			"Light Crossbow",
			"Medium Crossbow",
			"Heavy Crossbow"
		],[
			"Shuriken",
			"Throwing Knife"
		],[
			"Defiance EX Shocker",
			"Yamaha Pulsar"
		],[
			"Raecor Sting",
			"Streetline Special"
		],[
			"Colt America L36",
			"Fichetti Security",
			"Hammerli",
			"Yamaha Sakura Fubuk"
		],[
			"Ares Predator IV",
			"Ares Viper Slivergun",
			"Colt Manhunter",
			"Remington Roomsweeper",
			"Ruger Super Warhawk"
		],[
			"Ceska Black Scorpion",
			"Steyr TMP"
		],[
			"AK-97 Carbine",
			"HK-227X",
			"HK MP-5 TX",
			"Ingram Smartgun X",
			"Uzi IV"
		],[
			"AK-97",
			"Ares Alpha",
			"Grenade Launcher",
			"FN HAR",
			"HK XM30",
			"HK XM30 Grenade Launcher",
			"HK XM30 Shotgun",
			"HK XM30 Carbine",
			"HK XM30 Sniper", 
			"HK XM30 LMG"
		],[
			"Ruger",
			"PJSS Elephant Rifle"
		],[
			"Ranger Arms SM-4",
			"Walter MA-2100"
		],[
			"Mossberg AM-CMDT",
			"Remington 990",
			"Remington 990 W/ flechettes"
		],[
			"Ares S-III Super Squirt",
			"Fichetti Pain Inducer"
		],[
			"Ingram White Knight"
		],[
			"Stoner-Ares M202"
		],[
			"Ultimax HMG-2"
		],[
			"Panther XXL"
		],[
			"Ares Antioch-2",
			"ArmTech MGL-12"
		],[
			"Aztechnology Striker",
			"Mitsubishi Yakusoku MRL"
		],[
			"Gapple Gun",
			"Micro Flare Luncher"
		]
	];
	
	newGun.appendChild(createSelect(gunsList, gunsGroups, selected));
	newGun.appendChild(createInput("number", damage));
	newGun.appendChild(createInput("number", ap));
	newGun.appendChild(createSelect(["SS","SA","BF","FA"], null, mode));
	newGun.appendChild(createInput("number", rc));
	newGun.appendChild(createInput("number", ammo));
	gunsContainer.appendChild(newGun);
}

function addSpell(selected){
	var spellsContainer = document.getElementById("spellsContainer");
	
	var spellsGroups = [
		"Combat",
		"Detection",
		"Health",
		"Illusion",
		"Manipulation"
	];
	var spellsList = [
		[
			"Acid Stream (P/LOS/P/I/F÷2+3)",
			"Toxic Wave (P/LOS(A)/P/I/F÷2+5)",
			"Punch (P/T/S/I/F÷2-2)",
			"Blast (P/LOS(A)/S/I/F÷2+2)",
			"Death Touch (M/T/P/I/F÷2-2)",
			"Manabolt (M/LOS/P/I/F÷2)",
			"Manaball (M/LOS(A)/P/I/F÷2+2)",
			"Flamethrower (P/LOS/P/I/F÷2+3)",
			"Fireball (P/LOS/P/I/F÷2+5)",
			"Lightnig Bolt (P/LOS/P/I/F÷2+3)",
			"Lightning Ball (P/LOS(A)/P/I/F÷2+5)",
			"Shatter (P/T/P/I/F÷2-1)",
			"Powerbolt (P/LOS/P/I/F÷2+1)",
			"Powerball (P/LOS/P/I/F÷2+3)",
			"Knockout (M/T/S/I/F÷2-3)",
			"Stunbolt (M/LOS/S/I/F÷2+1)",
			"Stunball (M/LOS(A)/S/I/F÷2+1)"
		],[
			"Analyze Device (P/T/-/S/F÷2)",
			"Analyze Truth (M/T/-/S/F÷2)",
			"Clairaudience (M/T/-/S/F÷2-1)",
			"Clairvoyance (M/T/-/S/F÷2-1)",
			"Combat Sense (M/T/-/S/F÷2+2)",
			"Detect Enemies (M/T/-/S/F÷2+1)",
			"Detect Enemies Ext. (M/T/-/S/F÷2+3)",
			"Detect Individual (M/T/-/S/F÷2-1)",
			"Detect Life (M/T/-/S/F÷2)",
			"Det. Life Ext. (M/T/-/S/F÷2+2)",
			"Det. [Life Form] (M/T/-/S/F÷2-1)",
			"Det. [Life Form] Ext. (M/T/-/S/F÷2+1)",
			"Detect Magic (M/T/-/S/F÷2)",
			"Detect Magic Ext. (M/T/-/S/F÷2+2)",
			"Mind Probe (M/T/-/S/F÷2+2)"
		],[
			"Antidote (M/T/-/P/Toxin DV-2)",
			"Cure Disease (M/T/-/P/Dis. DV -2)",
			"Decrease [Att.] (M/T/-/S/F÷2-1)",
			"Detox (M/T/-/P/toxin DV -4)",
			"Heal (M/T/-/P/DV -2)",
			"Hibernate (M/T/-/S/F÷2-2)",
			"Increase [Att.] (P/T/-/S/F÷2-2)",
			"Increase Reflexes (P/T/-/S/F÷2+2)",
			"Oxygenate (P/T/-/S/F÷2-1)",
			"Prophylaxis (M/T/-/S/F÷2-2)",
			"Resist Pain (M/T/-/P/DV -4)",
			"Stabilize (M/T/-/P/OD-2)"
		],[
			"Confusion (M/LOS/-/S/F÷2)",
			"Mass Conf. (M/LOS(A)/-/S/F÷2+2)",
			"Chaos (P/LOS/-/S/F÷2+1)",
			"Chaotic world (P/LOS(A)/-/S/F÷2+3)",
			"Entretainment (M/LOS(A)/-/S/F÷2+1)",
			"Third Ent. (P/LOS(A)/-/S/F÷2+2)",
			"Invisibility (M/LOS/-/S/F÷2)",
			"Improved Inv. (P/LOS/-/S/F÷2+1)",
			"Mask (M/T/-/S/F÷2)",
			"Physical Mask (P/T/-/S/F÷2+1)",
			"Phantasm (M/LOS(A)/-/S/F÷2+2)",
			"Third Phantasm (P/LOS(A)/-/S/F÷3)",
			"Hush (M/LOS(A)/-/S/F÷2+2)",
			"Silence (P/LOS(A)/-/S/F÷2+3)",
			"Stealth (P/LOS/-/S/F÷2+1)"
		],[
			"Armor (P/LOS/-/S/F÷2+3)",
			"Control Actions (M/LOS/-/S/F÷2)",
			"Mob Control (M/LOS(A)/-/S/F÷2+2)",
			"Control Emotion (M/LOS/-/S/F÷2)",
			"Mob Mood (M/LOS(A)/-/S/F÷2+2)",
			"Cont. thoughts (M/LOS/-/S/F÷2+2)",
			"Mob Mind (M/LOS/-/S/F÷2+4)",
			"Fling (P/LOS/-/I/F÷2+1)",
			"Ice Sheet (P/LOS(A)/-/I/F÷2+3)",
			"Ignite (P/LOS/-/P/F÷2)",
			"Influence (M/LOS/-/P/F÷2+1)",
			"Levitate (P/LOS/-/S/F÷2+1)",
			"Light (M/LOS(A)/-/S/F÷2-1)",
			"Magit Fingers (P/LOS/-/S/F÷2+1)",
			"Mana Barrier 	(M/LOS(A)/-/S/F÷2+1)",
			"Petrify (P/LOS/-/S/F÷2+2)",
			"Phys. Barrier (P/LOS(A)/-/S/F÷2+3)",
			"Poltergeist (P/LOS(A)/-/S/F÷2+3)",
			"Shadow (P/LOS(A)/-/S/F÷2+1)",
			"Shapechange (P/LOS/-/S/F÷2+ 2)",
			"[Critter] Form (P/LOS/-/S/F÷2+1)",
			"Turn to Go (P/LOS/-/S/F÷2+2)"
		]
	];
	
	spellsContainer.appendChild(createSelect(spellsList, spellsGroups, selected));
}

function addPower(selected, rating){
	var powersContainer = document.getElementById("powersContainer");
	var newPower = document.createElement("div");

	var powerList = [
		"Astral Perseption",
		"Attribute Boost",
		"Combat Sense",
		"Critical Strike",
		"Enhanced Perception",
		"Improved Ability",
		"Improved Physical Att.",
		"Improved Reflexes",
		"Improved Sense",
		"Killing Hands",
		"Kinesics",
		"Missile Parry",
		"Mystic Armor",
		"Natural Immunity",
		"Pain Resistance",
		"Rapid Healing",
		"Spell Resistance",
		"Voice Control"
	];
	
	newPower.appendChild(createSelect(powerList, null, selected));
	newPower.appendChild(createInput("number", rating));
	powersContainer.appendChild(newPower);
}

function addProgram(selected, rating){
	var programsContainer = document.getElementById("programsContainer");
	var newProgram = document.createElement("div");
	
	var programGroups = [
		"Common Use",
		"Hacking"
	];
	var programList = [
		[
			"Analyze",
			"Browse",
			"Command",
			"Edit",
			"Encrypt",
			"Reality Filter",
			"Scan"
		],[
			"Armor",
			"Attack",
			"Biofeedback Filters",
			"Black Hammer",
			"Blackout",
			"Data Bomb",
			"Decrypt",
			"Defuse",
			"ECCM",
			"Exploit",
			"Medic",
			"Sniffer",
			"Spoof",
			"Stealth",
			"Track"
		]
	];
	
	newProgram.appendChild(createSelect(programList, programGroups, selected));
	newProgram.appendChild(createInput("number"), rating);
	programsContainer.appendChild(newProgram);
}

function addSpirit(spirit, force, services, bound){
	var spiritsContainer = document.getElementById("spiritsContainer");
	var newSpirit = document.createElement("div");
	
	newSpirit.appendChild(createInput("text", spirit));
	newSpirit.appendChild(createInput("number", force));
	newSpirit.appendChild(createInput("number", services));
	newSpirit.appendChild(createSelect(["B","U"], null, bound));
	spiritsContainer.appendChild(newSpirit);
}

function addContact(name, loyalty, conn) {
  var contactsContainer = document.getElementById("contactsContainer");
  var contact = document.createElement("div");
  
  contact.appendChild(createInput("text", name));
  contact.appendChild(createInput("number", loyalty));
  contact.appendChild(createInput("number", conn));
  
  contactsContainer.appendChild(contact);
}

function addArmor(selected){
	var armorContainer = document.getElementById("armorContainer");
	
	var armorGroups = [
		"Clothing",
		"Armor",
		"Helments and Shields",
		"Cyberware/Bioware"
	];
	var armorList = [
		[
			"Clothing (0/0)",
			"Feedback Clothing (—/-)",
			"Leather Jacket (2/2)"
		],[
			"Actioneer Business Clothes (5/3)",
			"Armor Clothing (4/0)",
			"Armor Jacket (8/6)",
			"Armor Vest (6/4)",
			"Camouflage Suit (8/6)",
			"Chameleon Suit (6/4)",
			"Full Body Armor (10/8)",
			"Lined Coat (6/4)",
			"Urban Explorer Jumpsuit (6/6)"
		],[
			"Helmet (+1/+2)",
			"FBA Helmet (+2/+2)",
			"UEJ Helmet (—/+2)",
			"Ballistic Shield (+6/+4)",
			"Riot Shield (+2/+6)",
			"Taser Shield (+2/+6)"
		],[
			"Cyberlimbs Enhancement",
			"Bone Density Augmentation"
		]
	];
	
	armorContainer.appendChild(createSelect(armorList, armorGroups, selected));
}

function addMisc(selected, note){
	var miscContainer = document.getElementById("miscContainer");
	var misc = document.createElement("div");
	
	var miscGroups =[
		"Firearms Accessories",
		"Ammo",
		"Granades",
		"Rockets/Missiles",
		"Explosives",
		"Armor Modifications",
		"Electronic Accessories",
		"Misc. Electronics",
		"RFID Tags",
		"Communications",
		"Matrix Programs",
		"Storage Media",
		"Data Software",
		"Skillsofts",
		"Simsense",
		"ID/Credsticks",
		"Tools",
		"Opitic Devices",
		"Audio Devices",
		"Sensors",
		"Security Devices",
		"B&E Gear",
		"Survival Gear",
		"Chiemicals",
		"Medical",
		"Disguise",
		"Foci",
		"Magical Supplies",
		"Fetiches",
		"Spell Category"
	];
	var miscList = [
		[
			"Airburst Link",
			"Bipod Under",
			"Concealable Holster",
			"Gas-Vent 2 System Barrel",
			"Gas-Vent 3 System Barrel",
			"Gyro Stabilization Under",
			"Hidden Gun Arm Slide",
			"Imaging Scope Top",
			"Laser Sight",
			"Periscope Top",
			"Quick-Draw Holster",
			"Shock Pad",
			"Silencer Barrel",
			"Smart Firing Platform Under",
			"Smartgun System, internal",
			"Smartgun System, external",
			"Sound Suppresser Barrel",
			"Spare Clips",
			"Speed Loader",
			"Tripod"
		],[
			"APDS",
			"Assault Cannon",
			"Explosive Rounds",
			"EX-Explosive Rounds",
			"Flechette Rounds",
			"Gel Rounds",
			"Regular Ammo",
			"Stick-n-Shock",
			"Tracer",
			"Taser Dart"
		],[
			"Flash-Bang",
			"Flash-Pak",
			"Fragmentation",
			"High Explosive",
			"Gas Chemical",
			"Smoke",
			"Thermal Smoke"
		],[
			"Anti-Vehicle",
			"Fragmentation",
			"High Explosive"
		],[
			"Commercial",
			"Foam",
			"Plastic",
			"Explosive Detonator"
		],[
			"Chemical Protection",
			"Fire Resistance",
			"Insulation",
			"Nonconductivity",
			"Shock Frills",
			"Thermal Damping"
		],[
			"AR Gloves",
			"Biometric Reader",
			"Nanopaste Trodes",
			"Printer",
			"Satellite Link",
			"Sim Module",
			"Sim Module w/ BTL/hot sim Mods.",
			"Simrig",
			"Skinlink",
			"Subvocal Microphone",
			"Trodes"
		],[
			"Electronic Paper",
			"Holo Projector"
		],[
			"Standard RFID Tags",
			"Security RFID Tags",
			"Stealth RFID Tags"
		],[
			"Headjammer",
			"Area Jammer",
			"Directional Jammer",
			"Micro-Transceiver",
			"Tag Eraser",
			"White Noise Generator"
		],[
			"Common Use",
			"Hacking",
			"Agents/IC/Pilot",
			"System",
			"Firewall",
			"Autosoft"
		],[
			"Datachip"
		],[
			"Datasoft",
			"Mapsoft",
			"Tutorsoft"
		],[
			"Activesoft",
			"Knowsoft",
			"Linguasoft"
		],[
			"Sim Resordings",
			"BTL Recordings",
			"VR Games",
			"ARE Programs",
			"Virtual Surround Music",
			"Wall Space",
			"Virtual Pet",
			"Virtual Person",
			"Virtual Weather",
			"Miracle Shooter™"
		],[
			"Certified Credstick",
			"Fake License",
			"Fake SIN"
		],[
			"Toolkit",
			"Shop",
			"Facility"
		],[
			"Binoculars",
			"Contact Lenses",
			"Glasses",
			"Goggles",
			"Endoscope",
			"Monocle",
			"Periscope",
			"Mage Sight Goggles"
		],[
			"Earbuds",
			"Headphones"
		],[
			"Atmosphere Sensor",
			"Camera",
			"Cyberware Scanner",
			"Directional Microphone",
			"Giger Counter",
			"Laser Microphone",
			"Laser Range Finder",
			"MAD Scanner",
			"Microphone",
			"Motion Sensor",
			"Olfactory Sensor",
			"Radio Signal Scanner"
		],[
			"Key Lock",
			"Maglock Keypad/Card-Reader",
			"Maglock Anti-Tamper Circuits",
			"Biometric Reader"
		],[
			"Autopicker",
			"Cellular Glove Molder",
			"Chisel",
			"Keycar Copier",
			"Lockpick Set",
			"Maglock Passkey",
			"Miniwelder",
			"Monofilament Chainsaw",
			"Sequencer",
			"Wire clippers"
		],[
			"Chemsuit",
			"Climbing Gear",
			"Diving Gear",
			"Gas Mask",
			"Gecko Tape Gloves",
			"GPS",
			"Hazmat Suit",
			"Flashlight",
			"Light Stick",
			"Magnesium Torch",
			"Micro Flare Launcher",
			"Micro Flares",
			"Rappeling Gloves",
			"Respirator",
			"Survival Kit",
			"Gapple Gun"
		],[
			"Glue Sprayer",
			"Thermite Burning Bar",
			"CS/Tear Gas",
			"Cyanide",
			"Gamma-Scopolamine",
			"Narcojet",
			"Nausea Gas",
			"Neuro-Stun",
			"Pepper Punch",
			"Seven-7"
		],[
			"Biomonitor",
			"Disposable Syringe",
			"Medkit",
			"DocWagon Basic",
			"DocWagon Gold",
			"DocWagon Platinum",
			"DocWagon Super-Platinum",
			"Antidote Patch",
			"Stimulant Patch",
			"Tranq Patch",
			"Trauma Patch"
		],[
			"Latex Face Mask",
			"Small Nanopaste Disguise",
			"Large Nanopaste Disguise"
		],[
			"Spellcasting Focus",
			"Counterspelling Focus",
			"Sustaining Focus",
			"Summoning Focus",
			"Banishing focus",
			"Binding Focus",
			"Weapon Focus",
			"Power Focus"
		],[
			"Conjuring Materials",
			"Magical Lodge Materials",
			"Biofiber"
		],[
			"Combat Fetish",
			"Detection Fetish",
			"Healing Fetish",
			"Illusion Fetish",
			"Manipulation Fetish"
		],[
			"Combat Spell",
			"Detection Spell",
			"Health Spell",
			"Illusion Spell",
			"Manipulation Spell"
		]
	];
	
	misc.appendChild(createSelect(miscList,miscGroups,selected));
	misc.appendChild(createInput("text", note));
	miscContainer.appendChild(misc);
}

function spellsDescription() {
	var description = document.getElementById("spellsDescription");
	description.title="Type:\n\tP = Physical\n\tM = Mental\n"
	+ "Range:\n\t"
		+ "LOS = Line of sight\n\t"
		+ "T = Touch\n\t"
		+ "V = Voluntary targets only\n\t"
		+ "A = Area spell\n"
	+ "Damage:\n\t"
		+ "P = Physical\n\t"
		+ "S = Stun\n"
	+ "Duration:\n\t"
		+ "I = Instant\n\t"
		+ "S = Sustained\n\t"
		+ "P = Permanent\n"
	+ "Drain Value:\n\t"
		+ "F = Force";
}

function phisicalBoxes(){
	var body = document.getElementById("body").value;
	var phisical = 8 + Math.ceil(body/2);
	var boxes = document.getElementsByClassName("phisicalBoxes");
	
	for (var i=0; i < boxes.length; i++) {
	  boxes[i].disabled = false;
	};
	for (var i=phisical; i < boxes.length; i++) {
		boxes[i].disabled = true;
	}
}

function stunBoxes(){
	var will = document.getElementById("willpower").value;
	var stun = 8 + Math.ceil(will/2);
	var boxes = document.getElementsByClassName("stunBoxes");
	
	for (var i=0; i < boxes.length; i++) {
	  boxes[i].disabled = false;
	};
	for (var i=stun; i < boxes.length; i++) {
		boxes[i].disabled = true;
	}
}