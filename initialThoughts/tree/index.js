var  Arboreal = require('./arboreal.js');
var tree = new Arboreal();

var wikipediaJsCategory = {
  category: 'JavaScript',
  subcategories: [
    {category: 'Ajax (programming)'},
    {category: 'JavaScript engines'},
    {category: 'JavaScript programming languages family',
     subcategories: [{  
       category: 'JavaScript dialect engines'
     }]
    },
    {category: 'JavaScript based calendar components'},
    {category: 'JavaScript based HTML editors'}
  ]
};

var t2 = Arboreal.parse(wikipediaJsCategory, 'subcategories');

console.dir(t2.toArray());

// var TreeModel = require('tree-model'),
//     tree = new TreeModel(),
//     root = tree.parse({name: 'a', children: [{name: 'b'}]});

//     console.dir(root);