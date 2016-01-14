var DBStandardNamesCONFIG = function() {
     var private = {
         'DATABASES': 'databases',
         'ANOTHER_CONST': '2'
     };

    return {
        get: function(name) { return private[name]; }
    };
}

module.exports = DBStandardNamesCONFIG;