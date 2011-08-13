function addDescription () {
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