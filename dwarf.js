/* base humanoid type */

var dwarf = new Homo();

	dwarf.RATE_remarry_barren = 0; //15;
	dwarf.RATE_remarry_singleChild = 0; //5;
	dwarf.RATE_remarry_multipleHeirs = 0; //3;
	dwarf.RATE_bachelor_ette = 4;  //chance of refusal to marry, both sexes; otherwise married at available spouse rate
	
	dwarf.RATE_male = 75; // Male/female ratio at birth.  Should be 51% for humans.
	
	dwarf.MIN_fmage = 16; // Minimum age of marriage; cut off below dwarf.
	dwarf.MEAN_fmage = 32; // Average age of marriage on a normal curve. % should be 13-21 for medieval human women
	dwarf.STD_fmage = 5; // Standard deviation in age of marriage.
	dwarf.MIN_mmage = 16; // Minimum age of marriage; cut off below this.
	dwarf.MEAN_mmage = 36; // Average age of marriage on a normal curve.
	dwarf.STD_mmage = 10; // Standard deviation in age of marriage.
	
	dwarf.MEAN_dage = 256; // Average age of death on a normal curve.
	dwarf.STD_dage = 36; // Standard deviation in age of death.
	dwarf.syllables = [
	["'A","'a","'"],
	["Ko","ko","k"],
	["Te","te","t"],
	["Sae","sae","s"],
	["Pi","pi","p"],
	["Qoa","qoa","q"],
	["Cea","ctea","ct"],
	["Tsu","tsu","ts"],
	["Hae","hae","h"],
	["Goa","goa","g"],
	["Di","di","d"],
	["Zea","zea","z"],
	["Bu","bu","b"],
	["Ra","rga","rg"],
	["De","dge","dg"],
	["Dzo","dzo","dz"],
	["Hea","hhea","hh"],
	["Xa","xa","x"],
	["Thu","thu","th"],
	["She","she","sh"],
	["Fo","fo","f"],
	["Khae","khae","kh"],
	["Kli","kli","kl"],
	["Choa","tchoa","tch"],
	["`E","`e","`"],
	["Ghae","ghae","gh"],
	["Dho","dho","dh"],
	["Zhi","zhi","zh"],
	["Voa","voa","v"],
	["Ghea","rghea","rgh"],
	["Glu","glu","gl"],
	["Ja","dja","dj"],
	["Mi","hmi","hm"],
	["Ngea","ngea","ng"],
	["Noa","noa","n"],
	["Snu","snu","sn"],
	["Ma","ma","m"],
	["Ne","nhe","nh"],
	["Nlo","nlo","nl"],
	["Mbae","mbae","mb"],
	["Rhu","rrhu","rrh"],
	["Le","lte","lt"],
	["Rra","rra","rr"],
	["Ro","rdo","rd"],
	["Brae","brae","br"],
	["Rhi","rhi","rh"],
	["Rloa","rloa","rl"],
	["Trea","trea","tr"],
	["Hro","hro","hr"],
	["Gwi","gwi","gw"],
	["Rae","rae","r"],
	["Swoa","swoa","sw"],
	["Bhea","bhea","bh"],
	["Whu","whu","wh"],
	["Ya","ya","y"],
	["Tle","tle","tl"],
	["Hwoa","hwoa","hw"],
	["Llu","llu","ll"],
	["Lea","lea","l"],
	["Zla","zla","zl"],
	["Ye","yye","yy"],
	["Wo","wo","w"],
	["Hlae","hlae","hl"],
	["Dzli","dzli","dzl"]
];

	// clan generation
	dwarf.generateClan = function() { // random clan
		return rollD(dwarf.syllables.length) - 1;
	};

	// *** begin cool dwarf name generation ***
	dwarf.generateName = function(person) {
		var roll1 = rollD(dwarf.syllables.length) - 1;
		return dwarf.syllables[roll1][0] + dwarf.syllables[parseInt(person.clan)][1] + ((person.gender == "M") ? dwarf.syllables[parseInt(person.generation)%dwarf.syllables.length][2] : "");
	};
	
	dwarf.generateFertility = function(fertyear, girl) { // return fertility based on age
		var chance = 0;
		/* dwarves */
		if (fertyear > 16 && fertyear <= 20) chance = 10;
		if (fertyear > 20 && fertyear <= 24) chance = 20;
		if (fertyear > 24 && fertyear <= 28) chance = 30;
		if (fertyear > 28 && fertyear <= 30) chance = 60;
		if (fertyear > 30 && fertyear <= 32) chance = 80;
		if (fertyear > 32 && fertyear <= 48) chance = 98;
		if (fertyear > 48 && fertyear <= 64) chance = 80;
		if (fertyear > 64 && fertyear <= 96) chance = 60;
		if (fertyear > 96 && fertyear <= 110) chance = 40;
		if (fertyear > 110 && fertyear <= 128) chance = 30;
		if (fertyear > 128 && fertyear <= 146) chance = 20;
		if (fertyear > 146 && fertyear <= 164) chance = 10;
		if (fertyear > 164 && fertyear <= 200) chance = 5;
		if (fertyear > 200 && fertyear <= 236) chance = 3;
		if (fertyear > 236) chance = 1;
		
		if (girl > 0)
			return chance/(8 * girl);
		else
			return chance;
	};

	dwarf.generateGrief = function() {
		return rollD(2)+rollD(2)+rollD(2)-2;
	};
	
// Functions for showing the name inventory.

dwarf.generateNameTable = function() {
	if ($("div#nameTables").html() != "") {
		return;
	}
	var table = "<table>";
	for (i=0; i<dwarf.syllables.length; i++) {
		if (i%8 == 0) table = table + "<tr>";
		table = table + "<td><div onclick='$(this).siblings().show();'>Clan " + dwarf.syllables[i][0] + "khaekh</div><table style='display:none;'>";
		for (j=0; j<dwarf.syllables.length; j++) {
			if (j%8 == 0) table = table + "<tr>";
			var tableId = "table-" + i + "-" + j;
			table = table + "<td><span onclick='$(\"#" + tableId + "\").show()" + "' title='Clan " + dwarf.syllables[i][0] + "foaf'>" + dwarf.syllables[j][0] + dwarf.syllables[i][1] + "</span><table id = '" + tableId + "' style='display:none;'>";
			for (k=0; k<dwarf.syllables.length; k++) {
				if (k%8 == 0) table = table + "<tr>";
				table = table + "<td>" + dwarf.syllables[j][0] + dwarf.syllables[i][1] + dwarf.syllables[k][2] + "</td>";
				if (k%8 == 7) table = table + "</tr>";
			}
			table = table + "</table></td>";
			if (j%8 == 7) table = table + "</tr>";
		}
		table = table + "</table></td>";
		if (i%8 == 7) table = table + "</tr>";
	}
	$("div#nameTables").append(table);
};

dwarf.resetNameTable = function() {
	$("div#nameTables table table").hide();
};
