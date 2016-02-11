var fs = require('fs');
var Docxtemplater = require('docxtemplater');

//Load the docx file as a binary
var content = fs
    .readFileSync(__dirname + "/raw.docx", "binary");

var doc = new Docxtemplater(content);

//set the templateVariables
// doc.setData({
//     "full_name":"SHIVA KUMAR SHIVANDARI",
//     "address":"abc <br/> New Zealand <br/> Auckland",
//     "phone":"0652455478",
//     "description":"New Website"
// });

doc.setData(
	{"os":[{"type":"linux","price":"0","reference":"Ubuntu10"},{"type":"windows","price":"500","reference":"Win7"},{"type":"apple","price":"1200","reference":"MACOSX"}]}
	)

//apply them (replace all occurences of {first_name} by Hipp, ...)
doc.render();

var buf = doc.getZip()
             .generate({type:"nodebuffer"});

fs.writeFileSync(__dirname+"/raw_output.docx",buf);