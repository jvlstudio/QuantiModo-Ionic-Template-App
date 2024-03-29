angular.module('starter')
	
	// controls the Import Data page of the app
	.controller('ImportCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, authService, $state, $rootScope,utilsService){
		
		$state.go('app');
		$scope.controller_name = "ImportCtrl";
		
		/*// redirect if not logged in
	    if(!$scope.isLoggedIn){

	        $state.go('app.welcome');
	        // app wide signal to sibling controllers that the state has changed
	        $rootScope.$broadcast('transition');
	    }*/

	    // close the loader
	    window.closeloading = function(){
	        $ionicLoading.hide();
	    };

	    // constructor
	    $scope.init = function(){
	        
	        // show spinner
	        $ionicLoading.show({
	            noBackdrop: true,
	            template: '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>'
	        });  

	        // get user's access token
	        authService.getAccessToken().then(function(token){
	            
	            console.log("valid Token", token);

	            $ionicLoading.hide();

	            if(ionic.Platform.platforms[0] === "browser"){
	            	window.qmSetupOnIonic();
	            } else {	            	
	            	var targetUrl = config.getURL("api/v1/connect/mobile", true);
	            	targetUrl += "access_token="+token.accessToken;
	            	var ref = window.open(targetUrl,'_blank', 'location=no,toolbar=yes');
	            	ref.addEventListener('exit', function(){
						$state.go('app.track');
					});
	            }	            

	        }, function(){

	            console.log("need to log in");
                utilsService.showLoginRequiredAlert($scope.login);
                $ionicLoading.hide();

	        });
	       
	    };

	    // call the constructor
	    // when view is changed
	    $scope.$on('$ionicView.enter', function(e) {
			$scope.init();
	    });
	})