var contentDS = function(type, mainSectionName, desc) {
	this.dataRes = {};
	this.techName = null;
	this.sectionName = null;
	this.currentVersion = null;
	this.typeConst = {"edit" : "EDIT", "apply" : "APPLY", "restemplate": "RESTEMPLATE"};

	if (typeof(mainSectionName)==='undefined') mainSectionName = type + "Content";  
	if (typeof(desc)==='undefined') desc = "Takes the " + type + " content data";  

	this.dataRes.name = mainSectionName;
	this.dataRes.type = type;
	this.dataRes.desc = desc;
	this.dataRes.extra = {};
	this.dataRes.details = [];
}
contentDS.prototype.isObject = function(val) {
    return val instanceof Object; 
};
contentDS.prototype.compareStrings = function(string1, string2, ignoreCase, useLocale) {
	if(ignoreCase == undefined) { ignoreCase = true; }
	if(useLocale == undefined) { useLocale = true; } 
    if (ignoreCase) {
        if (useLocale) {
            string1 = string1.toLocaleLowerCase();
            string2 = string2.toLocaleLowerCase();
        }
        else {
            string1 = string1.toLowerCase();
            string2 = string2.toLowerCase();
        }
    }
    return string1 === string2;
}
contentDS.prototype.getCurrentTime = function() {
  	return new Date().toLocaleTimeString().replace("/.*(\d{2}:\d{2}:\d{2}).*/", "$1");
}
contentDS.prototype.getCurrentDate = function() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	return mm +'/' + dd + '/' + yyyy;
}	
contentDS.prototype.getExtraStruct = function(companyName,userName, desc) {
	var d = new Date('year', 'month', 'day'); 
	if(this.dataRes.type === this.typeConst.apply ) {  
		return {
					 "companyName": companyName,
			         "date":this.getCurrentDate(),
			         "time": this.getCurrentTime(),
			         "userName": userName,
			         "desc": desc,   
				};
	}	
};
contentDS.prototype.addExtra = function(object) {
	var tmp = (JSON.parse(JSON.stringify(object)));
	for(var k in tmp) {
		this.dataRes.extra[k]=tmp[k];
	}	
	return this;
};
contentDS.prototype.removeExtra = function() {
	this.dataRes.extra = {};
	return this;
};
contentDS.prototype.setSection = function(sectionName) {
	this.sectionName = sectionName;
};
contentDS.prototype.getSectionIndex = function(sectionName) {
	if(sectionName == undefined) { 
		sectionName = this.sectionName;
	}
	var indexMain = -1; 
	for (var key in this.dataRes.details) {
		if(this.compareStrings(this.dataRes.details[key].section, sectionName)) {
			indexMain = key;
		}
	}	
	return indexMain;
};
contentDS.prototype.addSection = function(sectionName) {
	var sectionIndex = this.getSectionIndex(sectionName);
	if(sectionIndex == -1 ) {
		var section = {
			"section" : sectionName,
			"details" : []
		};
		this.dataRes.details.push(section);
		this.setSection(sectionName);
	}		
	return this;
};
contentDS.prototype.removeSection = function(sectionName) {
	var sectionIndex = this.getSectionIndex(sectionName);
	if(sectionIndex != -1 ) {
		this.dataRes.details.splice(sectionIndex, 1);
	}	
	return this;
};
contentDS.prototype.renameSection = function(oldSectionName, newSectionName) {
	var sectionIndex = this.getSectionIndex(oldSectionName);
	if(sectionIndex != -1 ) {
		this.dataRes.details[sectionIndex].section = newSectionName;
		this.setSection(newSectionName);
	}	
	return this;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FOR ALL BELOW TECH AND VERSION RELATED FUNCTIONS, YOU SHOULD COMPLUSORY CALL THE this.setSection method first
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// In the present section, search/check wheather the tech and version already exists
contentDS.prototype.isTechVersionExists = function(techName,version) {
	if(techName != undefined && version != undefined) { 
		var sectionIndex = this.getSectionIndex();
		for (var key in this.dataRes.details[sectionIndex].details) {
			if(this.compareStrings(this.dataRes.details[sectionIndex].details[key].tech, techName) && this.compareStrings(this.dataRes.details[sectionIndex].details[key].version, version)) {
				return true;
			}
		}	
		return false;	
	}
};
contentDS.prototype.getTechVersionIndex = function(techName,version) {
	if(techName != undefined && version != undefined) { 
		var sectionIndex = this.getSectionIndex();
		var indexMain = -1; 
		for (var key in this.dataRes.details[sectionIndex].details) {
			if(this.compareStrings(this.dataRes.details[sectionIndex].details[key].tech, techName) && this.compareStrings(this.dataRes.details[sectionIndex].details[key].version, version)) {
				indexMain = key;
			}
		}	
		return indexMain;	
	}
};
contentDS.prototype.getTechVersionStruct = function(techName,version, desc) {
		return {
					 "tech": techName,
			         "version":version,
			         "desc": desc,
				};
};
contentDS.prototype.addTechVersion = function(object) {
	var sectionIndex = this.getSectionIndex();
	if(!this.isTechVersionExists(object.tech,object.version)) {
		this.dataRes.details[sectionIndex].details.push(object);
	}	
	return this;
};
//rename tech for particular techName + version combination
contentDS.prototype.renameTech = function(techName, version) {
	var sectionIndex = this.getSectionIndex();
	var techVersionIndex = this.getTechVersionIndex(techName, version);
	if(sectionIndex != -1 && techVersionIndex != -1) {
		this.dataRes.details[sectionIndex].details[techVersionIndex].tech = techName;		
	}	
	return this;
};
//rename version for particular techName + version combination
contentDS.prototype.renameVersion = function(techName, version) {
	var sectionIndex = this.getSectionIndex();
	var techVersionIndex = this.getTechVersionIndex(techName, version);
	if(sectionIndex != -1 && techVersionIndex != -1) {
		this.dataRes.details[sectionIndex].details[techVersionIndex].version = version;
	}	
	return this;
};
contentDS.prototype.removeTechVersion = function(techName, version) {
	var sectionIndex = this.getSectionIndex();
	var techVersionIndex = this.getTechVersionIndex(techName, version);
	if(sectionIndex != -1 && techVersionIndex != -1) {
		this.dataRes.details[sectionIndex].details.splice(techVersionIndex, 1);		
	}	
	return this;
};
//Remove all the section-details related to section and techName  
contentDS.prototype.removeAllTechFromSection = function(techName) {
	var sectionIndex = this.getSectionIndex();
	if(sectionIndex != -1 && techName != undefined) {
		for (var key in this.dataRes.details[sectionIndex].details) {
			if(this.compareStrings(this.dataRes.details[sectionIndex].details[key].tech, techName)) {
				this.dataRes.details[sectionIndex].details.splice(key, 1);
			}	
		}	
	}	
	return this;
};
//Remove all the section-details related to techName from all the sections 
contentDS.prototype.removeAllTechFromSections = function(techName) {
	if(techName != undefined) {
		//each section
		for(var sectionKey = 0; sectionKey < this.dataRes.details.length; sectionKey++) {
			//section details
			var sectionDetailsLength = this.dataRes.details[sectionKey].details.length;
			for(var sectionDetailsKey = 0; sectionDetailsKey < sectionDetailsLength; sectionDetailsKey++) {
				if(this.compareStrings(this.dataRes.details[sectionKey].details[sectionDetailsKey].tech, techName)) {
					this.dataRes.details[sectionKey].details.splice(sectionDetailsKey, 1);
					sectionDetailsKey = -1;
					sectionDetailsLength = this.dataRes.details[sectionKey].details.length;
				}
			}	
		}
	}	
	return this;
};
contentDS.prototype.isTypeExists = function(object) {
	switch (object['type']) {
    	case 'connections':
    	case 'connection':
			return this.getTechIndex(object['name']) == -1 ? false : true;
		case 'databases':
		case 'database':
			return this.getSectionIndex(object['name']) == -1 ? false : true;
		case 'tables':
		case 'table':			
			return this.getCurrentVersion(object['name']) == -1 ? false : true;    		
	}
	return false;
}
contentDS.prototype.json = function() {
	return JSON.stringify(this.dataRes, null, 4);	
	// return JSON.stringify(this.dataRes);
}	

module.exports = contentDS;

	

