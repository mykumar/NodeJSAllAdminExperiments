var fs = require('fs');
var path=require('path');

function getFiles (dir, files_){
    files_ = files_ || [];
    if(fs.lstatSync(dir).isDirectory())
    {
        // console.log(dir);
        // console.log(path.parse(dir).name);
        var dirName = path.parse(dir).name;
        console.log(dirName);
        files_['Dir']['abc'] = dirName;
        var files = fs.readdirSync(dir);
        for (var i in files){
            var name = dir + '/' + files[i];
            if (fs.statSync(name).isDirectory()){
                files_['Dir'][files[i]] = files[i];
                getFiles(name, files_);
            } else {
                files_['File'].push([files[i]]);
            }
        }
        return files_;
    } else {
        console.log('Hey this is file man');
    }    
}

console.log(getFiles('main'));