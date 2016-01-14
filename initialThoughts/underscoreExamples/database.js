var _ = require('underscore');
var conn = [];
var connectParams = {};
connectParams.name =  'newConn'; 
connectParams.ip =  '127.0.0.1';
connectParams.database = { 
	name : 'newDB', 
	Tables : [
			{
				name:'t1',
				columns : [
					{name: 'col1', datatype: 'int'},						
					{name: 'col2', datatype: 'string'},
				],  
			},
			{name:'t2'}		
	],
	indexes : [
			{
				name:'indi1',
				field: 'empno'						
			},
	],
	forigenKeys : [
			{
				name:'indi1',
				field: 'empno'						
			},
	],
	Triggers : [
			{
				name:'t1',
				field: 'empno'						
			},
	],
}	
conn.push(connectParams);
function isObject(val) {
    return val instanceof Object; 
}
function isArray(val) {
    return Array.isArray(val) ? true : false;
}
conn.forEach(function(entry) {
 	// console.dir(isObject(entry));   
 	console.dir(isArray(conn[0]['database']['Tables']));
});

// console.dir(_.indexBy(conn, 'Tables'));
// console.dir(_.map(conn, _.values));
// console.dir(conn[0]['database']['Tables'][0]['columns'][1]['datatype']);
// var keys = _.keys(conn[0]), values = _.values(conn[0]);
// console.dir(conn);
// conn[0] = {a:1,b:2};
// console.dir(JSON.stringify(conn));