var json = [{
               "name":"Google Angular JS",
               "desc":"This is google product called Angular JS",
               "sections":[
                  {
                     "name":"P1",
                     "desc":"This is the project for the xerox",
                     "versions":[

                     ]
                  },
                  {
                     "name":"P25",
                     "desc":"This is the name changed now for section",
                     "versions":[
                        {
                           "name":"V2",
                           "desc":"Worked on the angular JS Modules"
                        },
                        {
                           "name":"V10",
                           "desc":"This is chnaged version descritpation"
                        }
                     ]
                  }
               ]
            }];

// console.dir(json);

function checkAdult(age) {
   console.dir('----------------checkAdult---------------------------------------');
   console.dir(age);
   console.dir('----------------checkAdult---------------------------------------');
   return true;
}


console.dir(json.filter(checkAdult));            