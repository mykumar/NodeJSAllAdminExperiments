angular.module('myApp').controller('myCtrl', ['$scope','$uibModal','$rootScope','BasicDS', function ($scope, $uibModal, $rootScope, BasicDS) {
    $scope.animationsEnabled = true;
    $rootScope.parentText = "Thsi is the myCtrl controller text :: parentText";
    $scope.successClick = function(value) {
        console.dir('@@@@@@@@@@@@@@CALLING BasicDS --------------------------------------');
        var jsonDb = new BasicDS();
        jsonDb.hello();
        var techParams = {};
        techParams.name =  'Angular JS'; 
        techParams.desc = "Angular JS by google",
        jsonDb.createTech(techParams);

        techParams.name =  'JQuery'; 
        techParams.desc = "Jquery by open source world",
        jsonDb.createTech(techParams).setTech('Angular JS');

        var sectionParams = {};
        sectionParams.name =  'P1'; 
        sectionParams.desc = "This is the project for the xerox";
        jsonDb.createSection(sectionParams);

        // second stage

        sectionParams.name =  'P2'; 
        sectionParams.desc = "This is the project for the epslon";
        jsonDb.createSection(sectionParams).setSection('P2');

        var versionParams = {};
        versionParams.name =  'V1'; 
        versionParams.desc = "Worked on the angular JS Modules";
        jsonDb.createVersion(versionParams);

        versionParams.name =  'V2'; 
        versionParams.desc = "Worked on the angular JS Modules";
        jsonDb.createVersion(versionParams);



        // Third stage - rename / changes names and desc

        console.dir('-------------------------Before Rename-------------');
        console.log(jsonDb.json());



        jsonDb.changeTechName('Angular JS', 'Google Angular JS');
        jsonDb.changeTechDesc('Google Angular JS', 'This is google product called Angular JS');

        jsonDb.changeSectionName('P2','P25');
        jsonDb.changeSectionDesc('P25','This is the name changed now for section');
        jsonDb.setSection('P25');
        jsonDb.changeVersionName('V1','V10');
        jsonDb.changeVersionDesc('V10','This is chnaged version descritpation');

        
        console.dir('-------------------------output-------------');
        console.log(jsonDb.json());


        console.dir('@@@@@@@@@@@@@@CALLING BasicDS --------------------------------------');

        console.dir('This is the successClick --------------------------------------');
        console.dir(value);
        console.dir('This is the successClick --------------------------------------');
        $rootScope.jsonData = $scope.jsonData;
        $rootScope.gridOptions  = $scope.gridOptions;
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.basket = ['basket1', 'basket2', 'basket3'];
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'ModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
              items: function () {
                return $scope.items;
              },
              baskets : function () {
                return $scope.basket;
              },

            }
        });

        modalInstance.result.then( $scope.modalInstanceResult, $scope.modalInstanceCancel);



    };
    
    $scope.modalInstanceResult = function(selectedItem) {
          console.dir('-----------------------modalInstance->>>result-----------------------------------------------------');
          console.dir(selectedItem);
          console.dir($rootScope.parentText);
    }
    $scope.modalInstanceCancel = function () {
            console.dir('-----------------------modalInstance->>>cancel-----------------------------------------------------');
    };
    
   


    $scope.tinymceModel =  "Thus is the model^^^^^^^^^^^^^^^6";
    $scope.tinymceOptions = {
        onChange: function(e) {
          // put logic here for keypress and cut/paste changes
          console.dir('This is the onChange event of the tinymceOptions------------------');

        },
        inline: false,
        plugins : 'advlist autolink link image lists charmap print preview',
        skin: 'lightgray',
        theme : 'modern'
      };
    $scope.firstName = "John Smith";  

    $scope.jsonData = [      {
                               "id":12,
                               "first-name": "abcccc",
                               "friends": ["friend0"],
                               "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                               "getZip" : function() {return this.address.zip;}
                           },
                           {
                               "id":66664444,
                               "first-name": "John Smith",
                               "friends": ["friend0"],
                               "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                               "getZip" : function() {return this.address.zip;}
                           },
                           {
                               "id":3322222,
                               "first-name": "simon",
                               "friends": ["friend0"],
                               "address": {street:"301 Dove Ave", city:"Laurel", zip:"39565"},
                               "getZip" : function() {return this.address.zip;}
                           }
                       ];

    console.dir($scope.jsonData);                    
    $scope.gridOptions = {
            enableSorting: true,
            columnDefs: [
                  { name:'firstName', field: 'first-name' },
                  { name:'1stFriend', field: 'friends[0]' },
                  { name:'city', field: 'address.city'},
                  { name:'getZip', field: 'getZip()', enableCellEdit:false}
            ],
            data : $scope.jsonData
          };
    $scope.gridOptions.onRegisterApi = function(gridApi) {
      //set gridApi on scope
      $scope.gridApi = gridApi;
      gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
          //Do your REST call here via $http.get or $http.post
          console.log('I am in the afterCellEdit'); 
          console.dir(rowEntity);
          //Alert to show what info about the edit is available
      });
    };


}]);