var mainDS = function() {
	this.dataRes = [];
	this.techName = null;
	this.sectionName = null;
	this.currentVersion = null;

	console.dir('This is the mainDS constructor---');
}
mainDS.prototype.isObject = function(val) {
    return val instanceof Object; 
};
mainDS.prototype.compareStrings = function(string1, string2, ignoreCase, useLocale) {
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
mainDS.prototype.changeTechName = function(oldTechName, newTechName) {
	var techIndex = this.getTechIndex(oldTechName);
	if(oldTechName != undefined && newTechName != undefined && techIndex != -1) { 
		// for (var key in this.dataRes) {
		// 	if(this.compareStrings(this.dataRes[key].name, oldTechName)) {
				var tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex])));
				this.dataRes.splice(techIndex, 1);
				tmp.name = newTechName;
				this.dataRes.push(tmp);
				this.setTech(tmp.name);
				return true;
		// 	}
		// }
	}
	return false;
};	
mainDS.prototype.changeTechDesc = function(techName,newTechDesc) {
	var techIndex = this.getTechIndex(techName);
	if(techName != undefined && newTechDesc != undefined && techIndex != -1) { 
		// for (var key in this.dataRes) {
		// 	if(this.compareStrings(this.dataRes[key].name, techName)) {
				var tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex])));
				this.dataRes.splice(techIndex, 1);
				tmp.desc = newTechDesc;
				this.dataRes.push(tmp);
				return true;
		// 	}
		// }
	}
	return false;
};
mainDS.prototype.changeSectionName = function(oldSectionName, newSectionName) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex(oldSectionName);
	//check if the section, tech already exists
	if(sectionIndex != -1 && techIndex != -1 && oldSectionName != undefined &&  newSectionName != undefined ) {
		// for (var key in this.dataRes[techIndex].sections) {
		// 	if(this.compareStrings(this.dataRes[techIndex].sections[key].name, oldSectionName)) {
				var tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex])));
				this.dataRes[techIndex].sections.splice(sectionIndex, 1);
				tmp.name = newSectionName;
				this.dataRes[techIndex].sections.push(tmp);
				this.setSection(tmp.name);
				return true;
		// 	}
		// }
	}
	return false;		
};	
mainDS.prototype.changeSectionDesc = function(sectionName,sectionDesc) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex(sectionName);
	//check if the section, tech already exists
	if(sectionIndex != -1 && techIndex != -1 && sectionName != undefined &&  sectionDesc != undefined ) {
		// for (var key in this.dataRes[techIndex].sections) {
		// 	if(this.compareStrings(this.dataRes[techIndex].sections[key].name, sectionName)) {
				var tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex])));
				this.dataRes[techIndex].sections.splice(sectionIndex, 1);
				tmp.desc = sectionDesc;
				this.dataRes[techIndex].sections.push(tmp);
				this.setSection(tmp.name);
				return true;
		// 	}
		// }
	}
	return false;		
};
mainDS.prototype.changeVersionName = function(oldVersionName, newVersionName) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex();
	var versionIndex = this.isVersionExists(techIndex,sectionIndex, oldVersionName);

	if(versionIndex != -1 && sectionIndex != -1 && techIndex != -1 && oldVersionName != undefined && newVersionName != undefined) {
		var tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex].versions[versionIndex])));
		this.dataRes[techIndex].sections[sectionIndex].versions.splice(versionIndex, 1);
		tmp.name = newVersionName;
		this.dataRes[techIndex].sections[sectionIndex].versions.push(tmp);
		this.setCurrentVersion(tmp.name);
		return true;
	}
	return false;
};	
mainDS.prototype.changeVersionDesc = function(versionName, versionDesc) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex();
	var versionIndex = this.isVersionExists(techIndex,sectionIndex, versionName);
	if(versionIndex != -1 && sectionIndex != -1 && techIndex != -1 && versionName != undefined && versionDesc != undefined) {
		var tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex].versions[versionIndex])));
		this.dataRes[techIndex].sections[sectionIndex].versions.splice(versionIndex, 1);
		tmp.desc = versionDesc;
		this.dataRes[techIndex].sections[sectionIndex].versions.push(tmp);
		this.setCurrentVersion(tmp.name);
		return true;
	}
	return false;
};
mainDS.prototype.getCompleteTech = function(techName) {
	var techIndex = this.getTechIndex(techName);
	if(techName != undefined && techIndex != -1) { 
		// for (var key in this.dataRes) {
		// 	if(this.compareStrings(this.dataRes[key].name, techName)) {
				return (JSON.parse(JSON.stringify(this.dataRes[techIndex])));
		// 	}
		// }
	}
	return false;
};	
mainDS.prototype.getCompleteSection = function(techName, sectionName) {
	var techIndex = this.getTechIndex(techName);
	var sectionIndex = this.getSectionIndex(sectionName);
	//check if the section, tech already exists
	if(sectionIndex != -1 && techIndex != -1 && techName != undefined &&  sectionName != undefined ) {
		// for (var key in this.dataRes[techIndex].sections) {
		// 	if(this.compareStrings(this.dataRes[techIndex].sections[key].name, techName)) {
				return tmp = (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex])));
		// 	}
		// }
	}
	return false;		
};
mainDS.prototype.getCompleteSectionWithStruct = function(techName, sectionName) {
	var techIndex = this.getTechIndex(techName);
	var sectionIndex = this.getSectionIndex(sectionName);
	//check if the section, tech already exists
	if(sectionIndex != -1 && techIndex != -1 && techName != undefined &&  sectionName != undefined ) {
		var tmp = {};
		for (var key in this.dataRes[techIndex]) {
			if(key === 'sections') {
				tmp[key] = (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex])));
			} else {	
				tmp[key] = this.dataRes[techIndex][key];
			}	
		}	
		return tmp;
	}
	return false;		
};
mainDS.prototype.addIdsToVersions = function(versionArray) {
	for (var key in versionArray) {
		versionArray[key].id = parseInt(key);
	}	
	return versionArray;
};	

mainDS.prototype.getAllVersions = function(techName, sectionName) {
	var techIndex = this.getTechIndex(techName);
	var sectionIndex = this.getSectionIndex(sectionName);
	

	if(sectionIndex != -1 && techIndex != -1) {
		return this.addIdsToVersions((JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex].versions))));
	}
	return false;
};	

mainDS.prototype.getCompleteVersion = function(techName, sectionName, versionName) {
	var techIndex = this.getTechIndex(techName);
	var sectionIndex = this.getSectionIndex(sectionName);
	var versionIndex = this.isVersionExists(techIndex,sectionIndex, versionName);

	if(versionIndex != -1 && sectionIndex != -1 && techIndex != -1 && versionName != undefined) {
		return (JSON.parse(JSON.stringify(this.dataRes[techIndex].sections[sectionIndex].versions[versionIndex])));
	}
	return false;
};	
mainDS.prototype.getCompleteVersionWithStruct = function(techName, sectionName, versionName) {
	var techIndex = this.getTechIndex(techName);
	var sectionIndex = this.getSectionIndex(sectionName);
	var versionIndex = this.isVersionExists(techIndex,sectionIndex, versionName);

	if(versionIndex != -1 && sectionIndex != -1 && techIndex != -1 && versionName != undefined) {
		var tmp = {};
		for (var techKey in this.dataRes[techIndex]) {
			if(techKey === 'sections') {
				tmp[techKey] = [];
				for (var sectionKey in this.dataRes[techIndex].sections[sectionIndex]) {
					if(sectionKey === 'versions') { 
						tmp[techKey][sectionKey] = [];
						for (var versionKey in this.dataRes[techIndex].sections[sectionIndex].versions[versionIndex]) {
							tmp[techKey][sectionKey][versionKey] = this.dataRes[techIndex].sections[sectionIndex].versions[versionIndex][versionKey];						
							
						}
					} else {
							tmp[techKey][sectionKey] = this.dataRes[techIndex].sections[sectionIndex][sectionKey];
					}		
				}	
			} else {	
				tmp[techKey] = this.dataRes[techIndex][techKey];
			}	
		}
		return tmp;
	}
	return false;
};	

mainDS.prototype.getTechIndex = function(techName) {
	if(techName == undefined) { 
		techName = this.techName;
	}
	var indexMain = -1; 
	for (var key in this.dataRes) {
		if(this.compareStrings(this.dataRes[key].name, techName)) {
			indexMain = key;
		}
	}
	return indexMain;
};
mainDS.prototype.getSectionIndex = function(sectionName) {
	var techIndex = this.getTechIndex();
	if(sectionName == undefined) { 
		sectionName = this.sectionName;
	}
	var indexMain = -1; 
	for (var key in this.dataRes[techIndex].sections) {
		if(this.compareStrings(this.dataRes[techIndex].sections[key].name, sectionName)) {
			indexMain = key;
		}
	}	
	
	return indexMain;
};
mainDS.prototype.getIndexInChildren = function(type, connectionIndex, databaseIndex) {
	var indexMain = -1; 
	var that = this;
	if(type === "Tables") {
		this.connections[connectionIndex].children[databaseIndex].children.forEach(function(value,index) {
			if(that.compareStrings(value.name, type)) {
				indexMain = key;
			}
		});
	}	
	return indexMain;
}
mainDS.prototype.getCurrentVersion = function(currentVersion) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex();
	
	var indexMain = -1; 
	
	for (var key in this.dataRes[techIndex].sections[sectionIndex].versions) {
		if(this.compareStrings(this.dataRes[techIndex].sections[sectionIndex].versions[key].name, currentVersion)) {
			indexMain = this.dataRes[techIndex].sections[sectionIndex].versions[key].desc;
		}
	}	

	return indexMain;
};

mainDS.prototype.isVersionExists = function(techIndex,sectionIndex, versionName) {
	var indexMain = -1; 
	for (var key in this.dataRes[techIndex].sections[sectionIndex].versions) {
		if(this.compareStrings(this.dataRes[techIndex].sections[sectionIndex].versions[key].name, versionName)) {
			indexMain = key;
		}
	}	
	return indexMain;
};

mainDS.prototype.getSectionNames = function() {
	var connectionIndex = this.getTechIndex();
	var databases = [];
	this.connections[connectionIndex].children.forEach(function(value,index) {
		databases.push(value.name);
	});	
	return databases;
}
mainDS.prototype.getCurrentVersions = function(currentVersion) {
	var connectionIndex = this.getTechIndex();
	var databaseIndex = this.getSectionIndex();
	var tables = [];
	this.connections[connectionIndex].children[databaseIndex].children.forEach(function(value,index) {
		tables.push(value.name);
	});	
	
	return tables;
}
mainDS.prototype.setTech = function(techName) {
	this.techName = techName;
	return this;
}
mainDS.prototype.setSection = function(sectionName) {
	this.sectionName = sectionName;
	return this;
}
mainDS.prototype.setCurrentVersion = function(currentVersion) {
	this.currentVersion = currentVersion;
	return this;
}
mainDS.prototype.addTechStruct = function(object) {
	var techIndex = this.getTechIndex(object.name);
	if(techIndex == -1) {
		//cloning the passed object
		var techParams = (JSON.parse(JSON.stringify(object)));
		this.dataRes.push(techParams);
		this.setTech(techParams.name);
	}	
	return this;
}
//To do
mainDS.prototype.addSectionStruct = function(object) {
}
mainDS.prototype.addVersionStruct = function(object) {
}
mainDS.prototype.createTech = function(object) {
	var techIndex = this.getTechIndex(object.name);
	if(techIndex == -1) {
		//cloning the passed object
		var techParams = (JSON.parse(JSON.stringify(object)));
		techParams.sections = []; 
		this.dataRes.push(techParams);
		this.setTech(techParams.name);
	}	
	return this;
}
mainDS.prototype.createSection = function(object) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex(object.name);
	//check if the section already exists
	if(sectionIndex == -1 && techIndex != -1 ) {
		var sectionParams = (JSON.parse(JSON.stringify(object)));
		sectionParams.versions = []; 
		this.dataRes[techIndex].sections.push(sectionParams);
		
		this.setSection(sectionParams.name);
	}	
	return this;
}
mainDS.prototype.createVersion = function(object) {
	var techIndex = this.getTechIndex();
	var sectionIndex = this.getSectionIndex();
	var versionIndex = this.isVersionExists(techIndex,sectionIndex, object.name)
	if(versionIndex == -1 && sectionIndex != -1 && techIndex != -1) {
		var versionParams = (JSON.parse(JSON.stringify(object)));
		this.dataRes[techIndex].sections[sectionIndex].versions.push(versionParams);
		this.setCurrentVersion(versionParams.name);
	}
	return this;
}
mainDS.prototype.isTypeExists = function(object) {
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
mainDS.prototype.json = function() {
	return JSON.stringify(this.dataRes, null, 4);	
	// return JSON.stringify(this.dataRes);
}	

module.exports = mainDS;

	

