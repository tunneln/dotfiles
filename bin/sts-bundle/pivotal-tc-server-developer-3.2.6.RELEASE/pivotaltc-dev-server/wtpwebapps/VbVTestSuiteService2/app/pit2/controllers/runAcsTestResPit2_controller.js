/**
 * @author pvulupala
 */
'use strict';

var pit2runACSTestResCtrlMod = angular
		.module('PIT2RunACSTestResCtrlModule', []);

pit2runACSTestResCtrlMod
		.controller(
				'PIT2RunACSTestResController',
				[
						'$scope',
						'$state',
						'$rootScope',
						'$window',
						'PIT2RunACSTest',
						'PIT2ReviewService',
						'ValidateCAVVService',
						function($scope, $state, $rootScope, $window,
								PIT2RunACSTest, PIT2ReviewService,
								ValidateCAVVService) {

							$scope.showCReqDiv = true;
							$scope.showVIPBtn = false;
							$scope.isACS = false;
							$scope.service = PIT2RunACSTest;
							$scope.reqUrl = $scope.service.data.AcsUrl;
							$scope.cmpType = $scope.service.data.ComponentType;
							if($scope.cmpType == 'ACS' || $scope.cmpType == 'ACS_REQUIRED'){
								$scope.isACS = true;
							}
							$scope.aResMessage = vkbeautify.json(
									$scope.service.data.ResponseMessage, 2);
							$scope.reqTestCase = $scope.service.data.TestcaseNme;
							$scope.aReqMessage = vkbeautify.json(
									$scope.service.data.RequestMessage, 2);
							$scope.aResMessageObj = angular
									.fromJson($scope.aResMessage);
							$scope.aReqMessageObj = angular
									.fromJson($scope.aReqMessage);
							
							if ($scope.aResMessageObj!=null && $scope.aResMessageObj.authenticationValue != null
									&& $scope.aResMessageObj.authenticationValue != undefined) {
								$scope.showVIPBtn = true;
							}

							var respEl = angular.element(document
									.querySelector('#respinfoId'));
							respEl.html($scope.service.data.ResponseInfo);

							if ($scope.service.data.AResErrorXmlMsg != null) {
								$scope.aresErrorMsg = vkbeautify.json(
										$scope.service.data.AResErrorXmlMsg, 2);
							}

							if ($scope.service.data.ExpectedResponse != null) {
								$scope.expectedResponse = vkbeautify
										.json(
												$scope.service.data.ExpectedResponse,
												2);
							}

							if ($scope.service.data.CReqMessage != null) {
								$scope.cReqMessage = vkbeautify.json(
										$scope.service.data.CReqMessage, 2);
							}

							$scope.cRequrl = $scope.service.data.TermUrl;

							$scope.cReqName = $scope.service.data.CReqtcNme;
							if ($scope.service.data.CReqtcNme == null
									|| $scope.service.data.CReqtcNme == "") {
								$scope.showCReqDiv = false;
							}
							$scope.submitBtn = true;
							$scope.tcBtn = true;
							$scope.runAcsBtn = true;

							$scope.submitCReq = function() {
								$scope.submitBtn = false;
								$scope.tcBtn = false;
								$scope.runAcsBtn = false;
								$scope.showVIPBtn = false;
								$scope.loading = true;
								var cReqData = {
									"CreqACSURL" : $scope.cRequrl,
									"CreqText" : $scope.cReqMessage,
									"TransactionID" : $scope.service.data.TransactionID,
									"SelectedTestCase" : $scope.service.data.CReqTcId
								}

								if ($scope.service.data.DeviceType == "02") {
									PIT2RunACSTest
											.reviewCReq(cReqData)
											.then(
													function(compressedCReq) {
														$scope.service.CReqCompressedData = compressedCReq.data;
														$state
																.go('PIT2.reviewCReq');
													})
								}

								if ($scope.service.data.DeviceType == "01") {
									PIT2RunACSTest
											.processInappCReq(cReqData)
											.success(
													function(resData) {
														$scope.service.data = resData;
														$state
																.go('PIT2.inAppCReqResponse');
													})
											.error(
													function(response, status) {
														$state
																.go('PIT2.runACSTestResPIT2');
														$scope.loading = false;
														$scope.submitBtn = true;
													})
								}
							}

							$scope.showAcsScrn = function() {
//								$state.go('PIT2.PIT2runACSTest');
								$state.go("PIT2.OptionalTestCases");
							}

							$scope.tcDetails = function() {
								PIT2ReviewService.noTestCases = false;
								$scope.submitBtn = false;
								$scope.runAcsBtn = false;
								$scope.tcBtn = false;
								$scope.showVIPBtn = false;
								$scope.loading = true;
								var id = $scope.service.data.TransactionID;
								var component = $scope.cmpType;

								PIT2ReviewService
										.reviewTestCase(id, component)
										.success(
												function(response, status,
														headers) {
													PIT2ReviewService.data = response;
													PIT2ReviewService.backBtn = true;
													if (component == 'ACS'
															|| component == 'ACS_REQUIRED') {
														$state
																.go('PIT2.reviewACS');
													} else {
														PIT2ReviewService.acsBtnForMPI = true;
														if(response != null && response !=undefined && response != ""){
															$state
															.go('PIT2.reviewMPI');
														}else{
															
															PIT2ReviewService.noTestCases = true;
															$state
															.go('PIT2.reviewMPI');
														}
													}
												})
										.error(function(response, status) {
											//$state.go('PIT2.PIT2runACSTest');
											$state.go('PIT2.OptionalTestCases');
										})
							}

							$scope.jsonFormat = function(type) {
								if (type == "ARes") {
									var aRes = $scope.aResMessage;
									$scope.aResMessage = vkbeautify.json(aRes,
											1);
								}
								if (type == "expARes") {
									var expctdaRes = $scope.aResMessage;
									$scope.aResMessage = vkbeautify.json(
											expctdaRes, 1);
								}
								if (type == "CReq") {
									var cReq = $scope.cReqMessage;
									$scope.cReqMessage = vkbeautify.json(cReq,
											1);
								}
							}

							$scope.jsonUnformat = function(type) {
								if (type == "ARes") {
									var aRes = $scope.aResMessage;
									$scope.aResMessage = vkbeautify
											.jsonmin(aRes);
								}
								if (type == "expARes") {
									var expctdaRes = $scope.expectedResponse;
									$scope.expectedResponse = vkbeautify
											.jsonmin(expctdaRes);
								}
								if (type == "CReq") {
									var cReq = $scope.cReqMessage;
									$scope.cReqMessage = vkbeautify
											.jsonmin(cReq);
								}
							}
							$scope.submitToVip = function() {

								var data = {
									"Pan" : $scope.aReqMessageObj.acctNumber,
									"ExpiryDate" : $scope.aReqMessageObj.cardExpiryDate,
									"eci" : "05"/*$scope.aResMessageObj.eci*/,
									"Cavv" : $scope.aResMessageObj.authenticationValue
								}
								$scope.submitBtn = false;
								$scope.runAcsBtn = false;
								$scope.tcBtn = false;
								$scope.showVIPBtn = false;
								$scope.loading = true;
								/*
								 * Angular service call to submit the user
								 * enrollment data
								 */
								ValidateCAVVService
										.submitVIPRequest(data)
										.then(
												function successCallback(
														response) {
													$scope.loading = false;
													ValidateCAVVService.VIPResponseData = response.data;
													$state
															.go("PIT2.VIPResults");
												},
												function errorCallback(response) {
													$scope.submitBtn = true;
													$scope.runAcsBtn = true;
													$scope.tcBtn = true;
													$scope.showVIPBtn = true;
													$scope.loading = false;
													$rootScope.showSuccessAlert = false;
													$rootScope.showErrorAlert = true;
													if (response.data.errorMessage != undefined
															&& response.data.errorMessage != null)
														$rootScope.errorMessage = response.data.errorMessage;
													else
														$rootScope.errorMessage = "Error getting results from VIP";
													$window.scrollTo(0, 0);
												});
							}
						} ]);
