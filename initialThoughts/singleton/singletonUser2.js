var singletonUser2 = (function () {
    var singleton = require('./singleton');
    
    return {
        getlocalvariable: function () {
            console.dir('This is singletonUser2222---getlocalvariable');
            return singleton.getlocalvariable();
        },
        setlocalvariable: function (value) {
            console.dir('This is singletonUser22222---setlocalvariable');
            singleton.setlocalvariable(value);
        },
    };
})();
module.exports = singletonUser2;