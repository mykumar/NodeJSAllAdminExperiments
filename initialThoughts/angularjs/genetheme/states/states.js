angular.module('nodeAllAdmin').config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',
	function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

	    $ocLazyLoadProvider.config({
	      debug:false,
	      events:true,
	    });
	    
	    $urlRouterProvider.otherwise('/relational/mysql');	

	    $stateProvider
		    .state('relational', {
		      url: "/relational/:databaseType",
		      templateUrl: "states/html/relational.html",
		      resolve: {
		            communcationService: 'communcationService',
		            loadMyDirectives:function($ocLazyLoad){
		                return $ocLazyLoad.load(
		                {
		                    name:'sidebar',
		                    files:['directives/js/content/sidebar.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'top-navigation',
		                   files:['directives/js/content/topNavigation.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'page-content',
		                   files:['directives/js/content/pageContent.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'footer',
		                   files:['directives/js/content/footer.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'node-all-admin-tabs',
		                   files:['directives/js/lib/nodeAllAdminTabs.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'node-all-admin-grid',
		                   files:['directives/js/lib/nodeAllAdminGrid.js']
		                }), //
		                $ocLazyLoad.load(
		                {
		                   name:'ace-editor',
		                   files:['directives/js/lib/aceEditor.js']
		                })
		            }
		        },
		        controller: function ($stateParams, communcationService) {
			        // If we got here from a url of /contacts/42
			       	console.dir('&*&*&*&*&*&&**&&&&&&&&**********I am in the relational state ');
			       	console.dir($stateParams.databaseType);
			       	communcationService.databaseType = $stateParams.databaseType;
			       	communcationService.message = "abc";
		       }
		      
		    });

	}
]);  
