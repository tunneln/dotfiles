'use strict';
var reviewTestActModpit2 = angular.module('PIT2ReviewTestMod',[]);

reviewTestActModpit2.controller('PIT2ReviewTestController',['PIT2ReviewService','$rootScope','$scope','$http','$state','$timeout','$location','$interval',function(PIT2ReviewService,$rootScope,$scope,$http,$state,$timeout,$location,$interval){

	//Jquery code for datepicker

	$(function() {
		setTimeout(function(){
			var current_date = $( "#datepicker" ).val();
			//console.log("in ready :: "+current_date);
			$("#datepicker")[tog(current_date)]('x');

			$( "#datepicker" ).datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});

			$( "#datepicker" ).change(function(){

				var get_date = $( "#datepicker" ).val();
				console.log("in change :: "+get_date);
				$("#datepicker")[tog(get_date)]('x');
			});

			function tog(v){
				//console.log("v:: "+v);
				return v?'addClass':'removeClass';} 
			$(document).on('input', '.clearable', function(){
				$(this)[tog(this.value)]('x');
			}).on('mousemove', '.x', function( e ){
				$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
			}).on('touchstart click', '.onX', function( ev ){
				ev.preventDefault();
				$(this).removeClass('x onX').val('').change();
			});
			/*
		if($( "#datepicker" ).val().length == 0){
			console.log("get_date with length:: "+$( "#datepicker" ).val().length);
			$('#datepicker')[tog(this.value)]('x');
		}else{
			console.log("get_date without leenggth :: "+$( "#datepicker" ).val().length);
		}*/


			$("#datepicker").keydown(function(){
				var theEvent = window.event;
				var key = theEvent.keyCode || theEvent.which;
				if (key === 9 || key === 16) { //TAB was pressed
					return;
				}else {
					return false;
				}
			});

			var current_date_end = $( "#datepickerEnd" ).val();
			$("#datepickerEnd")[tog(current_date_end)]('x');

			$( "#datepickerEnd" ).datepicker({
				dateFormat : 'yy-mm-dd',
				changeMonth : true,
				changeYear : true
			});
			$( "#datepickerEnd" ).change(function(){
				var get_date_end = $( "#datepickerEnd" ).val();
				$(this)[tog(get_date_end)]('x');
			});

			function tog(v){
				return v?'addClass':'removeClass';} 

			$(document).on('input', '.clearable', function(){
				$(this)[tog(this.value)]('x');
			}).on('mousemove', '.x', function( e ){
				$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
			}).on('touchstart click', '.onX', function( ev ){
				ev.preventDefault();
				$(this).removeClass('x onX').val('').change();
			});

			$("#datepickerEnd").keydown(function(){
				var theEvent = window.event;
				var key = theEvent.keyCode || theEvent.which;
				if (key === 9 || key === 16) { //TAB was pressed
					return;
				}else {
					return false;
				}
			});


		});
	}, 5000);

	/*	$(function() {

		setTimeout(function(){
			var current_date_end = $( "#datepickerEnd" ).val();
				$("#datepickerEnd")[tog(current_date_end)]('x');

		$( "#datepickerEnd" ).datepicker({
			dateFormat : 'yy-mm-dd',
			changeMonth : true,
			changeYear : true
		});
		$( "#datepickerEnd" ).change(function(){
			var get_date_end = $( "#datepickerEnd" ).val();
			$(this)[tog(get_date_end)]('x');
		});

		function tog(v){
			return v?'addClass':'removeClass';} 

		$(document).on('input', '.clearable', function(){
			$(this)[tog(this.value)]('x');
		}).on('mousemove', '.x', function( e ){
			$(this)[tog(this.offsetWidth-18 < e.clientX-this.getBoundingClientRect().left)]('onX');
		}).on('touchstart click', '.onX', function( ev ){
			ev.preventDefault();
			$(this).removeClass('x onX').val('').change();
		});

		$("#datepickerEnd").keydown(function(){
			var theEvent = window.event;
			var key = theEvent.keyCode || theEvent.which;
			if (key === 9 || key === 16) { //TAB was pressed
				return;
			}else {
				return false;
			}
		});
	});
	 }, 5000);*/

	//angular code
	$scope.curPage = 0;
	$scope.pageSize = 10;
	$scope.service = PIT2ReviewService;
	$scope.testerId = $rootScope.loggedInUser;
	$scope.userType=$rootScope.userType;
	$scope.isAdmin=$rootScope.isAdmin;
	$scope.isRegnAdmin=$rootScope.isRegnAdmin;
	$scope.dropdownShow=false;
	$scope.comptype='';
	$scope.comlen = '';
	$scope.threeDSServer = '3DS Server';
	$scope.testType = 'All';

	if($rootScope.userAccess.length > 0){
		if($rootScope.userPit2ComponentType.length > 1){

			$scope.dropdownShow = true;
			$scope.comlen = $rootScope.userPit2ComponentType.length;

		}else if($rootScope.userPit2ComponentType == 'ACS'){
			$scope.dropdownShow = false;
			$scope.component='ACS';
			$scope.comlen = $rootScope.userPit2ComponentType.length;
		}else{
			$scope.dropdownShow = false;
			$scope.component='MPI';
			$scope.comlen = $rootScope.userPit2ComponentType.length;
		}

	}

	var mytimeout;
	var headers={"Content-Type":' application/json' };
	var len = 0;
	var count=0;
	$scope.resLen;
	$scope.numberOfPages = function() {
		$scope.noOfPages = Math.ceil(len/$scope.pageSize);
	};

	$scope.stopTimeout = function() {
		$timeout.cancel(mytimeout);
	}

	$scope.startTimeout = function() {
		var but_val = angular.element(document
				.querySelector('#ssb'));
		count++;
		but_val.val("Stop Auto Reload");
		mytimeout = $timeout(function() {

			$scope.getUserTestCases();
			$scope.startTimeout();
			if (count == 10) {
				but_val.val("Start Auto Reload");
				$scope.stopTimeout();
				count = 0;
			}
		}, 30000);

	} 

	$scope.stopTimeout();



	$scope.auto_reload = function(){
		var button_value=angular.element(document.querySelector('#ssb'));
		if(button_value.val()=="Start Auto Reload"){
			button_value.val("Stop Auto Reload");
			$scope.startTimeout();
		}else{
			button_value.val("Start Auto Reload");
			$scope.stopTimeout();
			count=0;
		}
	}

	$scope.getUserTestCases = function(){
		$scope.curPage = 0;
		$rootScope.showErrorAlert = false;
		$rootScope.errorMessage = '';
		if($scope.testerId==""){
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "Please Enter the Valid Tester ID";
			return;
		}

		if(($scope.minTestId!=undefined && $scope.maxTestId!= undefined) && (parseInt($scope.minTestId) > parseInt($scope.maxTestId))){
			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "Invalid Max Test ID";
			return;
		}

		if(($scope.startDate!=undefined && $scope.endDate!=undefined) && (($scope.startDate) > ($scope.endDate)) &&
				$scope.startDate!="" && $scope.endDate!=""){

			$rootScope.showErrorAlert = true;
			$rootScope.errorMessage = "Invalid End Date";
			return;	
		}
		var data = {
				"Email":angular.lowercase($scope.testerId),
				"MinTransactionID":$scope.minTestId,
				"StartDate":$scope.startDate,
				"StartTime":$scope.startTime,
				"Status":$scope.status,
				"ComponentType":$scope.component,
				"MaxTransactionID":$scope.maxTestId,
				"EndDate":$scope.endDate,
				"EndTime":$scope.endTime,
				"TestCaseType" : $scope.testType
		}
		/*$scope.pageLoading = true;
		ReviewService.reviewLoad(data).then(function(response,status,headers){
			$scope.resData = response.data.revDispList;
			$scope.pageLoading = false;
			if($scope.resData != undefined){
				$scope.resLen = $scope.resData.length;
				len = $scope.resLen;
				$scope.numberOfPages();
			}else{
				$scope.resLen = 0;
				len = $scope.resLen;
			}
		})*/
		
		$scope.pageLoading = true;
		PIT2ReviewService.reviewLoad(data).then(function successCallback(response,status,headers){
			$scope.resData = response.data.revDispList;
			$scope.pageLoading = false;
			if($scope.resData != undefined){
				$scope.resLen = $scope.resData.length;
				len = $scope.resLen;
				$scope.numberOfPages();
			}else{
				$scope.resLen = 0;
				len = $scope.resLen;
			}
		},function errorCallback(response){
			$scope.pageLoading = false;
			$rootScope.showSuccessAlert = false;
			$rootScope.showErrorAlert = true;
			if(response.data.errorMessage != undefined && response.data.errorMessage != null)
				$rootScope.errorMessage = response.data.errorMessage;
			$scope.resLen = 0;
			len = $scope.resLen;
		});
	}

	if(PIT2ReviewService.isReturn){

		PIT2ReviewService.isReturn = false;
		$scope.testerId = PIT2ReviewService.email;
		$scope.component = PIT2ReviewService.componentType;
		$scope.startDate = PIT2ReviewService.startDate;
		$scope.endDate = PIT2ReviewService.endDate;
		$scope.status = PIT2ReviewService.status;
		$scope.testType = PIT2ReviewService.testType;
		$scope.startTime = PIT2ReviewService.startTime;
		$scope.endTime = PIT2ReviewService.endTime;
		$scope.resData = PIT2ReviewService.previousSearchResults;
		$scope.resLen = $scope.resData.length;
		len = $scope.resLen;
		$scope.numberOfPages();
		$scope.curPage = PIT2ReviewService.currentPage;
		if($scope.selectedComponent=="ACS"){
			$scope.title="Review ACS Required Test Results";
		}else if($scope.selectedComponent=="MPI"){
			$scope.title="Review 3DS Server Required Test Results";
		}
	}else{
		$scope.getUserTestCases();
	}

	$scope.testId = function(id,component){


		PIT2ReviewService.reviewTestCase(id,component).success(function(response,status,headers){
			$scope.service.data = response;

			if(component == 'ACS' || component == 'ACS_REQUIRED'){
				$state.go('PIT2.reviewACS');
			}else if(component == 'MPI' || component == 'MPI_REQUIRED'){
				$state.go('PIT2.reviewMPI');
			}else{
				$state.go('PIT2.reviewPARESBATCH')
			}
			PIT2ReviewService.backActionState = "PIT2.PIT2reviewTestActivity";
			PIT2ReviewService.email = $scope.testerId;
			PIT2ReviewService.componentType = $scope.component;
			PIT2ReviewService.startDate = $scope.startDate;
			PIT2ReviewService.endDate = $scope.endDate;
			PIT2ReviewService.status = $scope.status;
			PIT2ReviewService.testType = $scope.testType;
			PIT2ReviewService.startTime = $scope.startTime;
			PIT2ReviewService.endTime = $scope.endTime;
			PIT2ReviewService.previousSearchResults = $scope.resData;
			PIT2ReviewService.currentPage = $scope.curPage;
			PIT2ReviewService.backBtn = false;
			PIT2ReviewService.cthBckBtn = false;
			PIT2ReviewService.noTestCases = false;
		}).error(function(response,status){
			$state.go('PIT2.PIT2reviewTestActivity');
		})		

	}
}
]);

angular.module('PIT2ReviewTestMod').filter('pagination', function() {
	return function(input, start) {
		if (!input || !input.length) {
			return;
		}
		start = +start;
		return input.slice(start);
	};
});

reviewTestActModpit2.filter('htmlvw', ['$sce',function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	};
}]);

reviewTestActModpit2.filter('beautify',function(){
	return function(val){
		return vkbeautify.json(val, 2);
	}
});
