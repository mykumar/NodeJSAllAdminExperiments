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
		      templateUrl: "/genetheme/states/html/relational.html",
		      resolve: {
		            communcationService1: 'communcationService',
		            loadMyDirectives:function($ocLazyLoad){
		                return $ocLazyLoad.load(
		                {
		                   name:'top-navigation',
		                   files:['/genetheme/directives/js/content/topNavigation.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                    name:'sidebar',
		                    files:['/genetheme/directives/js/content/sidebar.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'top-navigation',
		                   files:['/genetheme/directives/js/content/topNavigation.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'page-content',
		                   files:['/genetheme/directives/js/content/pageContent.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'footer',
		                   files:['/genetheme/directives/js/content/footer.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'node-all-admin-tabs',
		                   files:['/genetheme/directives/js/lib/nodeAllAdminTabs.js']
		                }),
		                $ocLazyLoad.load(
		                {
		                   name:'node-all-admin-grid-tabs',
		                   files:['/genetheme/directives/js/lib/nodeAllAdminGridTabs.js']
		                }), //
		                $ocLazyLoad.load(
		                {
		                   name:'ace-editor',
		                   files:['/genetheme/directives/js/lib/aceEditor.js']
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
