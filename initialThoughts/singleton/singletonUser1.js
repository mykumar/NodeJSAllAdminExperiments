var singletonUser1 = (function () {
    var singleton = require('./singleton');
    
    return {
        getlocalvariable: function () {
            console.dir('This is singletonUser1---getlocalvariable');
            console.dir('This is singletonUser1---expose Variable +++++++++++++++++++++==');
            console.dir(singleton.exposeLocalVariable);
            return singleton.getlocalvariable();
        },
        setlocalvariable: function (value) {
            console.dir('This is singletonUser1---setlocalvariable');
            singleton.setlocalvariable(value);
        },
    };
})();

module.exports = singletonUser1;