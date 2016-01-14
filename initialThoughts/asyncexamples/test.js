
var cN = require('./testarray');

var f = new cN();
// console.log('RETURN IS:::::::::' + f.hey('Thsi si randonm') );
var arr = [{
        "store_name": "Store 1",
        "franchisee_id": "id01",
        "dish_menu": "Breakfast",
        "dish_count": "17"
    }, {
        "store_name": "Store 1",
        "franchisee_id": "id01",
        "dish_menu": "Light Meals",
        "dish_count": "7"
    }, {
        "store_name": "Store 1",
        "franchisee_id": "id01",
        "dish_menu": "Sandwiches",
        "dish_count": "12"
    }, {
        "store_name": "Store 2",
        "franchisee_id": "id02",
        "dish_menu": "Breakfast",
        "dish_count": "7"
    }];

// console.dir(arr[0]['dish_menu']);
// console.dir(JSON.stringify(arr)) ;
// console.dir(arr.length);

// var newarr = [];
for(i=0; i<arr.length; i++)
{
	// newarr[i] = {};
	f.createSubArray(i,-1);
	// console.log(arr[i] of object);
	var j = 0, c =0;
	for(var propt in arr[i]){
	    // console.log(propt + ': ' + arr[i][propt]);
	    if(j == 0) {
	    	// newarr[i][propt] = arr[i][propt];
	    	f.putContent(i,-1,arr[i][propt]);
	    }	
	    if(j == 1) {
	    	c = j-1;
	    	// newarr[i][c] = {};
	    	f.createSubArray(i,c);
	    }
	    if(j > 0) {
	    	//newarr[i][c][propt] = arr[i][propt];	
	    	f.putContent(i,c,arr[i][propt]);
	    }	
	    j++;
	}
}
// console.dir(newarr);
// console.dir(JSON.stringify(newarr)) ;
f.printArray();
