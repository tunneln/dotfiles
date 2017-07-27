/*global $:false */

(function(){

	'use strict';

	var binApp = angular
	.module('binApp', [
	                   //Lib's dependency Injection
	                   'ui.router',
	                   'ngAnimate',
	                   'ui.bootstrap',
	                   'ngMessages',
	                   'ngCookies',
	                   'ngStorage',
	                   'datatables',
	                   
	                   //Directives
	                   'TopHeaderModule',
	                   'FooterModule',
	                   'LeftPanelModule',
	                   'PageHeaderModule',
	                   'PrimaryNavModule',
	                   'ResetPwdModule',
	                   'RightPanelModule',
	                   'UserEnrollmentModule',
	                   'ValidationMessageModule',
	                   
	                   //Common modules
	                   'LoginCtrlMod',
	                   'ChangePwdCntrlMod',
	                   'ManageProfileModule',
	                   'SessionExpiryModule',
	                   'UserApprovalMod',

	                   //PIT2 modules
	                   'ACSAReqModule',
	                   'ACSSAResModule',
	                   'ACSSCResModule',
	                   'ACSSAResModuleInApp',
	                   'ACSSCResModuleInApp',
	                   'ACSCReqModule',
	                   'MPIAResModule',
	                   'MPICResModule',
	                   'RequestCertificateModPIT2',
	                   'RequestCertificateCtrlModulePIT2',
	                   'ViewUserGuideCntrlModPIT2',
	                   'ViewTestPlanCntrlModPIT2',
	                   'FaqCntrlModPIT2',
	                   'ACSAReqModuleInApp',
	                   'PIT2RunACSTestCtrlMod',
	                   'PIT2RunACSTestResCtrlModule',
	                   'ACSCReqModuleInApp',
	                   'AdministerTestsServModulePIT2',
	                   'AdministerTestsServInappModule',
	                   'MPICResInAppModule',
	                   'ReviewCReqModule',
	                   'ReviewCResModule',
	                   'CResControllerModule',
	                   'PIT2inAppCResCtrlModule',
	                   'MPIAResInAppModule',
	                   'PIT2ReviewTestMod',
	                   'PIT2ReviewACSMod',
	                   'ReviewReqTestResultsPIT2Mod',
	                   'CTHModule',
	                   'ValidateCavvModule',
	                   'ComplianceLetterModule',
	                   'RequestCertificateHomeMod',
	                   'ConcludeTestingMod',
	                   'ComplianceLetterLinkModule',
	                   'VendorLogMod'
	                   
	                   ]);

	binApp.config(function($stateProvider, $urlRouterProvider, $httpProvider,$logProvider,$provide){
		var title = 'Visa 3-D Secure 2.0 Test Suite';
		$logProvider.debugEnabled(true);
		$urlRouterProvider.otherwise('/pit/login');
		$stateProvider
		//Common states
		.state('login',{
			url:'/pit/login',
			templateUrl:commonRootPath+'_login.html',
			controller:'LoginController'
		})
		.state('userEnrollment',{
			url:'/pit/userEnrollment',
			templateUrl:commonRootPath+'_userEnrollment.html',
			controller:'UserEnrollmentCtrl'
		})
		.state('userEnrollmentSuccess',{
			url:'/pit/userEnrollmentSuccess',
			templateUrl:commonRootPath+'_userEnrollmentSuccess.html',
			controller:'UserEnrollmentSuccessCtrl'
		})
		.state('frgpwd',{
			url:'/pit/frgpwd',
			templateUrl:commonRootPath+'_changePassword.html',
			controller:'changePwdController'
		})
		.state('approveEnrolledUser',{
			url:'/pit/approveEnrolledUser',
			templateUrl:commonRootPath+'_approveEnrollment.html',
			controller:'UserApprovalCtrl'
		})
		.state('noAccess',{
			url:'/noAccess',
			templateUrl:commonRootPath+'_noAccess.html',
		})
		.state("manageProfile",{
			url:"/manageProfile",
			templateUrl:secureRootPath+"_manageProfile.html",
			controller:"ManageProfileCtrl"
		})
		.state('sessionExpired',{
			url:'/sessionExpired',
			templateUrl: commonRootPath+'_sessionExpiry.html',
			controller:'SessionExpiredController'
		})
		
		// PIT2 states
		.state('PIT2', {
			abstract:true,
			url:'/pit/2.0',
			templateUrl:secureRootPath+'_home.html'
		})
		.state('PIT2.welcome',{
			url:'',
			templateUrl:secureRootPath+'_welcomeFile.html',
			controller:'MainController'
		})
		.state('PIT2.viewUsersGuide',{
			controller:'ViewUsersGuideControllerPIT2'
		})
		.state('PIT2.viewTestPlan',{
			controller:'ViewTestPlanControllerPIT2'
		})
		.state('PIT2.faq',{
			controller:'FaqControllerPIT2'
		})
		.state('PIT2.ACSSARes',{
			url:'/acssARes',
			templateUrl:secureRootPath+'_acssARes.html',
			controller:'ACSSAResCtrl'
		})
		.state('PIT2.ACSSCRes',{
			url:'/acssCRes',
			templateUrl: secureRootPath+'_acssCRes.html',
			controller:'ACSSCResCtrl'
		})
		.state('PIT2.ACSSAResInApp',{
			url:'/acssAResInApp',
			templateUrl:secureRootPath+'_acssAResInApp.html',
			controller:'ACSSAResCtrlInApp'
		})
		.state('PIT2.ACSSCResInApp',{
			url:'/acssCResInApp',
			templateUrl: secureRootPath+'_acssCResInApp.html',
			controller:'ACSSCResCtrlInApp'
		})
		.state('PIT2.acsAReq',{
			url:'/acsAReq',
			templateUrl: secureRootPath+'_acsAreq.html',
			controller:'ACSAReqCtrl'
		})
		.state("PIT2.reviewCReq",{
			templateUrl:secureRootPath+'_reviewCReq.jsp',
			controller:"ReviewCReqController"
		})
		.state('PIT2.acsCReq',{
			url:'/acsCReq',
			templateUrl: secureRootPath+'_acsCreq.html',
			controller:'ACSCReqCtrl'
		})
		.state('PIT2.mpiARes',{
			url:'/mpiARes',
			templateUrl: secureRootPath+'_mpiAres.html',
			controller:'MPIAResCtrl'
		})
		.state('PIT2.mpiCRes',{
			url:'/mpiCRes',
			templateUrl: secureRootPath+'_mpiCres.html',
			controller:'MPICResCtrl'
		})
		.state('PIT2.requestCertificate',{
			url:'/requestCertificate',
			templateUrl: secureRootPath+'_requestCertificatePIT2.html',
			controller:"RequestCertificateControllerPIT2"
		})
		.state('PIT2.requestCertificateHome',{
			url:'/requestCertificateHome',
			templateUrl: secureRootPath+'_requestCertificateHome.html',
			controller:"RequestCertificateControllerHome"
		})
		.state('PIT2.requestCertificateRes',{
			url:'/requestCertificateRes',
			templateUrl: secureRootPath+'_requestCertificateResPIT2.html',
			controller:"RequestCertificateResponseControllerPIT2"
		})
		.state("PIT2.acsAReqInApp",{
			url:"/acsAReqInApp",
			templateUrl:secureRootPath+"_acsAReqInApp.html",
			controller:"ACSAReqCtrlInApp"
		})
		.state("PIT2.acsCReqInApp",{
			url:"/acsCReqInApp",
			templateUrl:secureRootPath+"_acsCReqInApp.html",
			controller:"ACSCReqCtrlInApp"
		})
		.state('PIT2.OptionalTestCases',{
			url:'/optionalTestCases',
			templateUrl: secureRootPath+'_optionalTestCases.html',
			controller:'ACSTestCasesCtrl'	
		})
		.state('PIT2.OptionalACS3DSTestCases',{
			url:'/OptionalACS3DSTestCases',
			templateUrl: secureRootPath+'_optionalACS3DSTestCases.html',
			controller:'OptionalACS3DSTestCasesCtrl'	
		})
		.state('PIT2.PIT2runACSTest',{
			url:'/PIT2runACSTest',
			templateUrl: secureRootPath+'_pit2RunAcsTest.html',
			controller:'PIT2RunACSTestController'	
		})
		.state('PIT2.runACSTestResPIT2',{
			url:'/PIT2runACSTest/runACSTestResPIT2',
			templateUrl: secureRootPath+'_runAcsTestResPit2.html',
			controller:'PIT2RunACSTestResController'	
		})		
		.state("PIT2.mpiCResInApp",{
			url:"/mpiCResInApp",
			templateUrl:secureRootPath+"_mpiCresInApp.html",
			controller:"MPICResInAppCtrl"	
		})
		.state("reviewCReq",{
			templateUrl:secureRootPath+'_reviewCReq.jsp',
			controller:"ReviewCReqController"
		})
		.state('cRes',{
			url:'/CResponse',
			templateUrl:secureRootPath+'_home.html',
			controller:'CResController'
		})
		.state('PIT2.cRes',{
			url : '/CResponse',
			templateUrl:secureRootPath+'_cRes.html',
			controller : "RevewCResCtrl"
		})
		.state('errorCRes',{
			url:'/ErrorCResponse',
			templateUrl:secureRootPath+'_home.html',
			controller:'ErrorCResController'
		})
		.state('PIT2.errorCRes',{
			url : '/ErrorCResponse',
			templateUrl:secureRootPath+'_errorCRes.html'
			
		})
		.state('PIT2.inAppCReqResponse',{
			url : '/PIT2runACSTest/runACSTestResPIT2/inAppCReqResponse',
			templateUrl:secureRootPath+'_inAppCRes.html',
			controller : "PIT2inAppCResController"
		})
		.state('PIT2.inAppCReqResponse2',{
			url : '/PIT2runACSTest/runACSTestResPIT2/inAppCReqResponse',
			templateUrl:secureRootPath+'_inAppCRes.html',
			controller : "PIT2inAppCResController"
		})
		.state("PIT2.mpiAResInApp",{
			url:"/mpiAResInApp",
			templateUrl:secureRootPath+"_mpiAresInApp.html",
			controller:"MPIAResInAppCtrl"	
		})
		.state('PIT2.PIT2reviewTestActivity',{
			url:'/PIT2reivewTestActivity',
			templateUrl: secureRootPath+'_pit2reviewTestActivity.html',
			controller:'PIT2ReviewTestController'
		})
		.state('PIT2.reviewACS',{
			url:'/PIT2reivewTestActivity/reviewACS',
			templateUrl: secureRootPath+'_pit2reviewACS.html',
			controller:'PIT2ReviewACSController'
		})
		.state('PIT2.reviewMPI',{
			url:'/PIT2reivewTestActivity/reviewMPI',
			templateUrl: secureRootPath+'_pit2reviewMPI.html',
			controller:'PIT2ReviewACSController'
		})
		.state('PIT2.reviewPARESBATCH',{
			url:'/reivewTestActivity/reviewPARESBATCH',
			templateUrl: secureRootPath+'_pit2reviewPARESBATCH.html',
			controller:'PIT2ReviewACSController'
		})
		.state('PIT2.PIT2reviewRequiredResults',{
			url:'/PIT2reviewRequiredResults',
			templateUrl: secureRootPath+'_reviewRequiredResultsPIT2.html',
			controller:'ReviewTestResultsPIT2Controller'
		})
		.state('PIT2.RequiredTestCases',{
			url:'/requiredTestCases',
			templateUrl: secureRootPath+'_requiredTestCases.html',
			controller:'RequiredTestCasesCtrl'	
		})
			.state('PIT2.RequiredACS3DSTestCases',{
			url:'/RequiredACS3DSTestCases',
			templateUrl: secureRootPath+'_requiredACS3DSTestCases.html',
			//templateUrl: secureRootPath+'_requestComplianceLetter.html',
			controller:'RequiredACS3DSTestCasesCtrl'	
			//controller:'ConcludeTestingCtrl'	
			
		})
		.state('PIT2.CTHrunACSTest',{
			url:'/CTHrunACSTest',
			templateUrl: secureRootPath+'_cthRunAcsTest.html',
			controller:'CTHRunACSTestController'	
		})
		.state('PIT2.CTHrunACSTestRes',{
			url:'/CTHrunACSTest/CTHrunACSTestRes',
			templateUrl: secureRootPath+'_cthRunAcsTestRes.html',
			controller:'CTHRunACSTestResController'	
		})
		.state("PIT2.CTHreviewCReq",{
			templateUrl:secureRootPath+'_cthreviewCReq.jsp',
			controller:"CTHReviewCReqController"
		})
		.state('CTHcRes',{
			url:'/CTHCResponse',
			templateUrl:secureRootPath+'_home.html',
			controller:'CTHCResController'
		})
		.state('PIT2.CTHcRes',{
			url : '/CTHCResponse',
			templateUrl:secureRootPath+'_cthcRes.html',
			controller : "CTHRevewCResCtrl"
		})
		.state('PIT2.CTHinAppCReqResponse',{
			url : '/CTHrunACSTest/CTHrunACSTestRes/CTHinAppCReqResponse',
			templateUrl:secureRootPath+'_cthinAppCRes.html',
			controller : "CTHinAppCResController"
		})
		.state('PIT2.CTHinAppCReqResponse2',{
			url : '/CTHrunACSTest/CTHrunACSTestRes/CTHinAppCReqResponse',
			templateUrl:secureRootPath+'_cthinAppCRes.html',
			controller : "CTHinAppCResController"
		})
		.state('PIT2.ValidateCAVV',{
			url : '/ValidateCAVV',
			templateUrl: secureRootPath+'_validateCAVV.html',
			controller : "ValidateCavvCtrl"
		})
		.state('PIT2.VIPResults',{
			url : '/VIPResults',
			templateUrl: secureRootPath+'_vipResults.html',
			controller : "VIPResultsCtrl"
		})
		.state('PIT2.VCMSTesting',{
			url : '/VCMSTesting',
			templateUrl: secureRootPath+'_vcmsTesting.html'
		})
		.state('PIT2.ComplLetterReqs',{
			url : "/ComplianceLetterRequests",
			templateUrl: secureRootPath+"_complianceLetterRequests.html",
			controller : "ComplianceLetterRequestsCtrl"
		})
		.state('PIT2.GenCompLetter',{
			url : "/GenerateComplianceLetter",
			templateUrl: secureRootPath+"_complianceLetterOld.html",
			controller : "ComplianceLetterOldCtrl"
		})
		.state('PIT2.PreviewCompLetter',{
			url : '/PreviewComplianceLetter',
			templateUrl : secureRootPath+'_previewComplLetterAndGeneration.html',
			controller : "PreviewComplLetterCtrl"
		})
		.state('PIT2.concludeTesting',{
			url:'/concludeTesting',
			templateUrl: secureRootPath+'_concludeTesting.html',
			controller:'ConcludeTestingCtrl'
		})
		.state('PIT2.complianceLetter',{
			url : "/ComplianceLetter",
			templateUrl: secureRootPath+"_complianceLetter.html",
			controller : "ComplianceLetterCtrl"
		})
		.state('PIT2.vendorLog',{
			url : "/vendorLog",
			templateUrl: secureRootPath+"_vendorLog.html",
			controller : "vendorLogCtrl"
			
		})
		.state('PIT2.approveDenyCompliance',{
			url : "/approveDenyCompliance",
			templateUrl: secureRootPath+"_approveDenyCompliance.html",
			controller : "ApproveDenyCOmplianceCtrl"
			
		})
		.state('approveDenyCompliance',{
			url : "/pit/approveDenyCompliance",
			templateUrl: secureRootPath+"_approveDenyCompliance.html",
			controller : "ApproveDenyCOmplianceCtrl"
			
		})
		
//		$httpProvider.defaults.headers.post['X-XSRF-TOKEN'] = '*'/*$cookies['XSRF-TOKEN']*/;
		$httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8082';
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];

		//Checking for response Interceptor
		/* This will provide a new token whenever there is a successful response. This token will expire after a set time
		 * which is validated in the server. The client will have to provide the new valid token everytime to maintain session */
		$httpProvider.interceptors.push(function ($q, $rootScope, $location,$localStorage) {
			return {
				'response': function(response) {
					var newToken = response.headers('NEWTOKEN');
					if (newToken != null) {
						$rootScope.authToken = newToken;
						var userData = $localStorage.userData;
						if(userData != undefined){
							userData.token = newToken;
							$localStorage.userData = userData;
						}
					}
					
					return response || $q.when(response);
				}
			};
		});

		/* Register error provider that shows message on failed requests or redirects to login page on
		 * unauthenticated requests */
		$httpProvider.interceptors.push(function ($q, $rootScope, $location,$cookieStore,$cacheFactory,$localStorage,$templateCache) {
			return {
				'responseError' : function(rejection) {
					var status = rejection.status;
					var config = rejection.config;
//					var method = config.method;
//					var url = config.url;
					var errormsg = rejection.data.errorMessage;
					if (status == 401) {
						$cacheFactory.get('$http').removeAll();
						if ($localStorage.userData !== undefined) {
							$rootScope.clearCacheData();
							$location.path('/sessionExpired');
						}
						$rootScope.authenticated = false;
						$rootScope.showErrorAlert = true;
						if(errormsg != null && errormsg != undefined && errormsg!="")
							$rootScope.errorMessage = errormsg;
						else 
							$rootScope.errorMessage = "Invalid User Credentials.";
					} else {
						$rootScope.showErrorAlert = true;
						$rootScope.errorMessage = errormsg;
					}
					return $q.reject(rejection);
				}
			};
		});

		/* Registers auth token interceptor, auth token is either passed by header or by query parameter
		 * as soon as there is an authenticated user */
		$httpProvider.interceptors.push(function ($q, $rootScope, $location) {
			return {
				'request': function(config) {
					if (angular.isDefined($rootScope.authToken)) {
						var authToken = $rootScope.authToken;
						if (appConfig.useAuthTokenHeader) {
							config.headers['X-Auth-Token'] = authToken;
						} else {
							config.url = config.url + "?token=" + authToken;
						}
//						delete $rootScope.authToken;
					}
					return config || $q.when(config);
				}
			};
		});

		/*$provide.decorator("$exceptionHandler",function($delegate,$injector){
	    	
	    	return function(exception,cause){
	    		var $rootScope = $injector.get('$rootScope');
	    		$injector.addError({message:"General Error",reason:exception});
	    		$delegate(exception,cause);
	    	}
	    })*/

	});	

	binApp.run(['$rootScope', '$state', '$stateParams','$location','$cookieStore','$http','$window','$cacheFactory','$templateCache','$localStorage','LoginService', function ($rootScope, $state, $stateParams,$location,$cookieStore,$http,$window,$cacheFactory,$templateCache,$localStorage,LoginService) {

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.requiredText = "(Fields marked with(*) are mandatory)";

		var init = function(){
			
		};

		init();
		
		$rootScope.$on('$locationChangeSuccess', function() {
			console.log("Location change success :: "+$location.path());
			if (!$rootScope.authenticated
				&& ($location.path() != "/sessionExpired"
						&& $location.path() != "/pit/userEnrollment"
						&& $location.path() != "/pit/frgpwd"
						&& $location.path() != "/pit/approveEnrolledUser"
						&& $location.path() != "/pit/userEnrollmentSuccess"
						&& $location.path() != "/pit/approveDenyCompliance")) {
				$rootScope.actualLocation = undefined;
				$state.go("login");
			}else{
				$rootScope.actualLocation = $location.path();
			}
		});        

		$rootScope.$watch(function () {return $location.path()}, function (newLocation, oldLocation) {
			if (!$rootScope.authenticated
					&& newLocation != undefined
					&& (newLocation == "/pit/approveEnrolledUser" || newLocation == "/pit/approveDenyCompliance")) {
				$state.go("login");
			} else if ($rootScope.authenticated && $rootScope.actualLocation != undefined
					&& $rootScope.actualLocation === newLocation) {
				if($window.confirm("You will be logged out, Click Cancel to redirect to home page")) {
					$rootScope.logout();
				}else{
					$state.go("PIT2.welcome");
				}
			}
		});

		$rootScope.$on('$viewContentLoaded', function() {
			$templateCache.removeAll();
			$rootScope.showErrorAlert = false;
			$rootScope.showSuccessAlert = false;
//			$rootScope.complApprovalThroughEmail = false;
			$rootScope.ajaxLoaderPath = loadingImgPath;
		});

		$rootScope.switchBool = function (value) {
			$rootScope[value] = !$rootScope[value];
		};
		
		/**
		 * @author vkallada
		 * Method to logout the user.
		 */
		$rootScope.logout = function() {
			var data = {
					"username":angular.lowercase($rootScope.loggedInUser)
			}
			LoginService.submitLogout(data)
			.then(function successCallback(responseData){
				$rootScope.clearCacheData();
				$location.path('/pit/login');
			},function errorCallback(response){
				$rootScope.clearCacheData();
				$location.path('/pit/login');
			});
		};

		/**
		 * @author vkallada 
		 * Method to clear the users browser cache / local
		 * storage / template cache
		 */
		$rootScope.clearCacheData = function() {
			delete $localStorage.userData;
			delete $rootScope.loggedInUser;
			delete $rootScope.authToken;
			delete $rootScope.userType;
			$cookieStore.remove('selVersion');
			$rootScope.authenticated = false;
			$cacheFactory.get('$http').removeAll();
			$templateCache.removeAll();
		}

		$rootScope.check = false;

		var ctxtPath=$location.protocol()+"://"+$location.host()+":"+$location.port()+path;
		$rootScope.contextPath = ctxtPath;
		$rootScope.complApprovalThroughEmail = false;
		var originalPath = $location.path();
		var absurl = $location.absUrl();
		var pathval = originalPath.split('/');
		var urlendval = pathval[pathval.length - 1];
		if (urlendval == "approveEnrolledUser") {
			$rootScope.clearCacheData();
			var absval = absurl.split('?');
			if (absval != null && absval.length > 1) {
				var tokennme = (absval[absval.length-1]).split('=');
				var tokenval = tokennme[tokennme.length-1]
				$rootScope.token = tokenval;
				$rootScope.redirectFromVendorLog = false;
			}else{
				$rootScope.token = '';
			}
			$location.path("/pit/approveEnrolledUser");
		} else if (urlendval == "approveDenyCompliance") {
			$rootScope.clearCacheData();
			var absval = absurl.split('?');
			if (absval != null && absval.length > 1) {
				var tokennme = (absval[absval.length-1]).split('=');
				var tokenval = tokennme[tokennme.length-1]
				$rootScope.token = tokenval;
				$rootScope.complApprovalThroughEmail = true;
			}else{
				$rootScope.token = '';
			}
			$location.path("/pit/approveDenyCompliance");
		} else if(urlendval == 'frgpwd'){
			$rootScope.clearCacheData();
			var absval=absurl.split('?');
			if (absval != null && absval.length > 1){
				var tokennme = (absval[absval.length-1]).split('=');
				var tokenval = tokennme[tokennme.length-1]
				$rootScope.token = tokenval;
			}else{
				$rootScope.token = '';
			}
			$location.path('/pit/frgpwd');
		} else if(urlendval=='CResponse') {
			abstract:false;
			$location.path('/CResponse');
			var absval=absurl.split('?');
			if(absval!=null && absval.length>1){
				var txnUrl=(absval[absval.length-1]).split('=');
				var txnId=txnUrl[txnUrl.length-1]
				$rootScope.txnId=txnId;
			}else{
				delete $rootScope.txnId;
			}
		} else if(urlendval=='ErrorCResponse') {
			abstract:false;
			$location.path('/ErrorCResponse');
			var absval=absurl.split('?');
			if(absval!=null && absval.length>1){
				var txnUrl = (absval[absval.length - 1])
						.split('=');
				var errrorMessage = txnUrl[txnUrl.length - 1]
				$rootScope.errorMessage = errrorMessage;	
			}else{
				delete $rootScope.errorMessage;
			}
		} else if (urlendval == 'CTHCResponse') {
			abstract: false;
			$location.path('/CTHCResponse');
			var absval = absurl.split('?');
			if (absval != null && absval.length > 1) {
				var txnUrl = (absval[absval.length - 1])
						.split('=');
				var txnId = txnUrl[txnUrl.length - 1]
				$rootScope.txnId = txnId;
			} else {
				delete $rootScope.txnId;
			}
		} else {
			$location.path('/pit/login');
		}

		var userData = $localStorage.userData;
		if(userData !== undefined){
			$rootScope.userData = $localStorage.userData;
			$rootScope.authToken = $rootScope.userData.token;
			$rootScope.loggedInUser = $rootScope.userData.username;
			$rootScope.userType = $rootScope.userData.usrTypCd;
			$rootScope.userAccess = [];
			$rootScope.authenticated = true;
			$rootScope.userAuthorities = [];
			$rootScope.userPit1ComponentType = [];
			$rootScope.userPit2ComponentType = [];
			$rootScope.isAdmin=$rootScope.userData.admin;
			$rootScope.isRegnAdmin=$rootScope.userData.regnAdmin;
			$rootScope.allowPaResbatch=$rootScope.userData.allowPaResbatch;
			$rootScope.allowVIPsubmit=$rootScope.userData.allowVIPsubmit;
			$rootScope.allowVCMSsubmit=$rootScope.userData.allowVCMSsubmit;
			if($rootScope.isAdmin || $rootScope.isRegnAdmin){
				$rootScope.userAccess.push(ROLE_PIT1_ACS);
				$rootScope.userAccess.push(ROLE_PIT1_MRCH);
				$rootScope.userAccess.push(ROLE_PIT2_ACS);
				$rootScope.userAccess.push(ROLE_PIT2_MRCH);
			}else{
				$rootScope.userAccess = $rootScope.userData.userAuthorities;
			}
			if($rootScope.userAccess.length > 0){
				angular.forEach($rootScope.userAccess,function(version){
					if(version == ROLE_PIT1_ACS || version == ROLE_PIT1_MRCH){
						if($rootScope.userAuthorities.length > 0){
							if($rootScope.userAuthorities.indexOf("PIT1") == -1){
								$rootScope.userAuthorities.push("PIT1");
							}
						}else{
							$rootScope.userAuthorities.push("PIT1");
						}
						if(version == ROLE_PIT1_ACS){
							$rootScope.userPit1ComponentType.push("ACS");
						}
						if(version == ROLE_PIT1_MRCH){
							$rootScope.userPit1ComponentType.push("MRCH");
						}

					}else if(version == ROLE_PIT2_ACS || version == ROLE_PIT2_MRCH){
						if($rootScope.userAuthorities.length > 0){
							if($rootScope.userAuthorities.indexOf("PIT2") == -1){
								$rootScope.userAuthorities.push("PIT2");
							}
						}else{
							$rootScope.userAuthorities.push("PIT2");
						}
						if(version == ROLE_PIT2_ACS){
							$rootScope.userPit2ComponentType.push("ACS");
						}
						if(version == ROLE_PIT2_MRCH){
							$rootScope.userPit2ComponentType.push("MRCH");
						}
					}
				})
				if($rootScope.userPit2ComponentType.length==1 && $rootScope.userPit2ComponentType[0]=="MRCH"){
					$rootScope.onlyMPI=true;
				}else{
					$rootScope.onlyMPI=false;
				}
			}else{
				$location.path("/noAccess");
			}
			$location.path(originalPath);
		}

		$rootScope.termsAndCond = function(){
			$window.open("./app/documents/V3DSTS-Terms-of-Service-Agreement.2.2.pdf");
		}

		$rootScope.help = function(){
			$window.open("./app/documents/UsersGuide.pdf");
		}
	}]);

	binApp.controller('MainController', function($scope,VersionChangeService){
		$scope.service = VersionChangeService;
		$scope.version = $scope.service.getVersion(); // To display Versions in the welcome page

	})

}());