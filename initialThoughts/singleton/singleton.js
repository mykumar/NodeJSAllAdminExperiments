var singleton = (function () {
    var localvariable = 10;
    var exposeLocalVariable = 3000000000;
    return {
        getlocalvariable: function () {
            console.dir('This is getInstance');
            return localvariable;
        },
        setlocalvariable: function (value) {
            console.dir('This is setlocalvariable');
            localvariable = value;
        },
        exposeLocalVariable
    };
})();

module.exports = singleton;