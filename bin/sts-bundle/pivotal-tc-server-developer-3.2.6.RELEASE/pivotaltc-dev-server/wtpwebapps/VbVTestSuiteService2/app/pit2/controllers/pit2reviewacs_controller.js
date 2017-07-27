'use strict';

var pit2reviewACS= angular.module('PIT2ReviewACSMod',[]);
pit2reviewACS.controller('PIT2ReviewACSController',['PIT2ReviewService','$scope','$location','$state',function(PIT2ReviewService,$scope,$location,$state){
	$scope.service = PIT2ReviewService;
	$scope.cavv_checked=true;
	$scope.reviewtcData = $scope.service.data;
	$scope.cavv;
	$scope.PAtranaction = 'None';
	$scope.format = false;
	$scope.isRunACSTCD = PIT2ReviewService.backBtn;
	$scope.isCthBckBtn = PIT2ReviewService.cthBckBtn
	$scope.isDecodeCavvARes=false;
	$scope.isDecodeCavvRReq=false;
	$scope.dispRUNAcsBtn = false;
	$scope.dispCthRUNAcsBtn = false;
	$scope.dispVIPReqHead = false;
	$scope.noTestCasesdisp = PIT2ReviewService.noTestCases
	$scope.noResMsg = false;
	
	if($scope.noTestCasesdisp == true){
		$scope.noResMsg = true;
	}else{
		$scope.noResMsg = false;
	}
	angular.forEach($scope.reviewtcData,function(tcData,index){
		if(tcData.TestCaseType == "Y"){
			$scope.dispCthRUNAcsBtn = true;
		}else if(tcData.TestCaseType == "N"){
			$scope.dispRUNAcsBtn = true;
		}
		if(tcData.Type=="ACS"){  // ACS logic
		
			if(tcData.MsgCode=="AReq"){
				tcData.AReqMsg=vkbeautify.json(tcData.AReqMsg,2);
			}
			if(tcData.MsgCode=="ARes"){
				tcData.AResMsg=vkbeautify.json(tcData.AResMsg,2);
				$scope.encodedCavvAResMsg=vkbeautify.json(tcData.AResMsg,2);
				$scope.encodedCavvAResMsgMin=vkbeautify.jsonmin(tcData.AResMsg,2);
				if(tcData.DecodedARes!=null){
					$scope.isDecodeCavvARes=true;
					$scope.decodedCavvAResMsg=vkbeautify.json(tcData.DecodedARes,2);
					$scope.decodedCavvAResMsgMin=vkbeautify.jsonmin(tcData.DecodedARes,2);
				}
				$scope.cavv = tcData.AllowCAVV;
				if($scope.cavv==1){
					$scope.ca = true;
				}else{
					$scope.ca = false;
				}
				$scope.cavvSuccess = tcData.AllowCAVVSuccess;

				if(tcData.ExpctesResACS!=null)
					tcData.ExpctesResACS=vkbeautify.json(tcData.ExpctesResACS,2);
			}

			if(tcData.MsgCode=="CReq"){
				tcData.CReqMsg=vkbeautify.json(tcData.CReqMsg,2);
			}
			if(tcData.MsgCode=="CRes"){
				tcData.CResMsg=vkbeautify.json(tcData.CResMsg,2);
				if(tcData.ExpctesResACS!=null)
					$scope.expctedPAResACS=vkbeautify.json(tcData.ExpctesResACS,2);
			}
			if(tcData.MsgCode=="RReq"){
				tcData.RReqMsg=vkbeautify.json(tcData.RReqMsg,2);
				$scope.encodedCavvRReqMsg=vkbeautify.json(tcData.RReqMsg,2);
				$scope.encodedCavvRReqMsgMin=vkbeautify.jsonmin(tcData.RReqMsg,2);
				if(tcData.DecodedRReq!=null){
					$scope.isDecodeCavvRReq=true;
					$scope.decodedCavvRReqMsg=vkbeautify.json(tcData.DecodedRReq,2);
					$scope.decodedCavvRReqMsgMin=vkbeautify.jsonmin(tcData.DecodedRReq,2);
				}
				$scope.cavv = tcData.AllowCAVV;
				if($scope.cavv==1){
					$scope.ca = true;
				}else{
					$scope.ca = false;
				}
				$scope.cavvSuccess = tcData.AllowCAVVSuccess;

				if(tcData.ExpctesResACS!=null)
					tcData.ExpctesResACS=vkbeautify.json(tcData.ExpctesResACS,2);
			}
			if(tcData.MsgCode=="RRes"){
				tcData.RResMsg=vkbeautify.json(tcData.RResMsg,2);
			}
			if(tcData.MsgCode=="VIPReq"){
				tcData.VipReqMsg=vkbeautify.json(tcData.VipReqMsg,2);
				$scope.dispVIPReqHead = true;
			}
			if(tcData.MsgCode=="VIPResp"){
				console.log("tcData.VipResMsg :" +tcData.VipResMsg);
				tcData.VipResMsg=vkbeautify.json(tcData.VipResMsg,2);
			}
			
		}

		if(tcData.Type=="MPI"){  // MPI logic
			
			if(tcData.MsgCode=="AReq"){
				tcData.AReqMsg=vkbeautify.json(tcData.AReqMsg,2);
			}

			if(tcData.MsgCode=="ARes"){
				tcData.AResMsg=vkbeautify.json(tcData.AResMsg,2);
				$scope.encodedCavvAResMsg=vkbeautify.json(tcData.AResMsg,2);
				$scope.encodedCavvAResMsgMin=vkbeautify.jsonmin(tcData.AResMsg,2);
				if(tcData.DecodedARes!=null){
					$scope.isDecodeCavvARes=true;
					$scope.decodedCavvAResMsg=vkbeautify.json(tcData.DecodedARes,2);
					$scope.decodedCavvAResMsgMin=vkbeautify.jsonmin(tcData.DecodedARes,2);
					
				}
				$scope.cavv = tcData.AllowCAVV;
				if($scope.cavv==1){
					$scope.ca = true;
				}else{
					$scope.ca = false;
				}
				$scope.cavvSuccess = tcData.AllowCAVVSuccess;
			}

			if(tcData.MsgCode=="CReq"){
				tcData.CReqMsg=vkbeautify.json(tcData.CReqMsg,2);
			}
			if(tcData.MsgCode=="CRes"){
				tcData.CResMsg=vkbeautify.json(tcData.CResMsg,2);
			}

			if(tcData.MsgCode=="RReq"){
				tcData.RReqMsg=vkbeautify.json(tcData.RReqMsg,2);
				$scope.encodedCavvRReqMsg=vkbeautify.json(tcData.RReqMsg,2);
				$scope.encodedCavvRReqMsgMin=vkbeautify.jsonmin(tcData.RReqMsg,2);
				if(tcData.DecodedRReq!=null){
					$scope.isDecodeCavvRReq=true;
					$scope.decodedCavvRReqMsg=vkbeautify.json(tcData.DecodedRReq,2);
					$scope.decodedCavvRReqMsgMin=vkbeautify.jsonmin(tcData.DecodedRReq,2);
				}
				$scope.cavv = tcData.AllowCAVV;
				if($scope.cavv==1){
					$scope.ca = true;
				}else{
					$scope.ca = false;
				}
				$scope.cavvSuccess = tcData.AllowCAVVSuccess;

				if(tcData.ExpctesResACS!=null)
					tcData.ExpctesResACS=vkbeautify.json(tcData.ExpctesResACS,2);
			}
			if(tcData.MsgCode=="RRes"){
				tcData.RResMsg=vkbeautify.json(tcData.RResMsg,2);
			}
			if(tcData.MsgCode=="PReq"){
				tcData.PReqMsg=vkbeautify.json(tcData.PReqMsg,2);
			}
			if(tcData.MsgCode=="PRes"){
				tcData.PResMsg=vkbeautify.json(tcData.PResMsg,2);
			}
		}

		if(tcData.Type=="PARES BATCH"){  //PARES_BATCH logic

			if(tcData.MsgCode=="CRes"){
				tcData.CResMsg=vkbeautify.json(tcData.CResMsg,2);
				$scope.encodedCavvCResMsg=vkbeautify.json(tcData.CResMsg,2);
				$scope.decodedCavvCResMsg=vkbeautify.json(tcData.DecodedARes,2);
			}
		}

	})




	$scope.jsonFormat= function(index,tcMessage){

		if($scope.reviewtcData[index].MsgCode == "AReq"){
			$scope.reviewtcData[index].AReqMsg = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="ARes"){
			$scope.format = false;
			$scope.reviewtcData[index].AResMsg = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="VEResExp"){
			$scope.reviewtcData[index].ExpctesResACS = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="CReq"){
			$scope.reviewtcData[index].CReqMsg = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="CRes"){
			$scope.reviewtcData[index].CResMsg = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="PAResExp"){
			$scope.reviewtcData[index].ExpctesResACS = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="PATransReq"){
			$scope.reviewtcData[index].PATransReqMsg = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="RReq"){
			$scope.format = false;
			$scope.reviewtcData[index].RReqMsg = vkbeautify.json(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="RRes"){
			$scope.reviewtcData[index].RResMsg = vkbeautify.json(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="PReq"){
			$scope.reviewtcData[index].PReqMsg = vkbeautify.json(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="PRes"){
			$scope.reviewtcData[index].PResMsg = vkbeautify.json(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="VIPReq"){
			$scope.reviewtcData[index].VipReqMsg = vkbeautify.json(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="VIPResp"){
			$scope.reviewtcData[index].VipResMsg = vkbeautify.json(tcMessage);
		}

	}


	$scope.reviewTCObj = {};

	$scope.jsonUnformat= function(index,tcMessage){

		console.log("index : "+index);
		console.log("size of the list : "+$scope.reviewtcData[0]);
		console.log("Object type  : "+$scope.reviewtcData[index].Type);

		if($scope.reviewtcData[index].MsgCode == "AReq"){
			$scope.reviewtcData[index].AReqMsg = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="ARes"){
			$scope.format = true;
			$scope.reviewtcData[index].AResMsg = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="VEResExp"){
			$scope.reviewtcData[index].ExpctesResACS = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="CReq"){
			$scope.reviewtcData[index].CReqMsg = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="CRes"){
			$scope.reviewtcData[index].CResMsg = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="PAResExp"){
			$scope.reviewtcData[index].ExpctesResACS = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="PATransReq"){
			$scope.reviewtcData[index].PATransReqMsg = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="RReq"){
			$scope.format = true;
			$scope.reviewtcData[index].RReqMsg = vkbeautify.jsonmin(tcMessage);
		}else if($scope.reviewtcData[index].MsgCode=="RRes"){
			$scope.reviewtcData[index].RResMsg = vkbeautify.jsonmin(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="PReq"){
			$scope.reviewtcData[index].PReqMsg = vkbeautify.jsonmin(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="PRes"){
			$scope.reviewtcData[index].PResMsg = vkbeautify.jsonmin(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="VIPReq"){
			$scope.reviewtcData[index].VipReqMsg = vkbeautify.jsonmin(tcMessage);
		}
		else if($scope.reviewtcData[index].MsgCode=="VIPResp"){
			$scope.reviewtcData[index].VipResMsg = vkbeautify.jsonmin(tcMessage);
		}

	}
	$scope.cavv_Encode = function(index,value){
		
		if($scope.reviewtcData[index].MsgCode == "ARes"){
			if(value){
				if($scope.format){
				$scope.reviewtcData[index].AResMsg = $scope.encodedCavvAResMsgMin;
				}else{
					$scope.reviewtcData[index].AResMsg = $scope.encodedCavvAResMsg;
				}
			}else{
				if($scope.format){
					$scope.reviewtcData[index].AResMsg = $scope.decodedCavvAResMsgMin
				}else{
				$scope.reviewtcData[index].AResMsg = $scope.decodedCavvAResMsg;
				}
			}
		}else{
			if(value){
				if($scope.format){
				$scope.reviewtcData[index].RReqMsg = $scope.encodedCavvRReqMsgMin;
				}else{
					$scope.reviewtcData[index].RReqMsg = $scope.encodedCavvRReqMsg;
				}
			}else{
				if($scope.format){
					$scope.reviewtcData[index].RReqMsg = $scope.decodedCavvRReqMsgMin
				}else{
				$scope.reviewtcData[index].RReqMsg = $scope.decodedCavvRReqMsg;
				}
			}
		}
	
	}
	
	$scope.showAcsScrn = function() {
//		$state.go('PIT2.PIT2runACSTest');
		$state.go('PIT2.OptionalTestCases');
	}

	$scope.showCthAcsScrn = function() {
//		$state.go('PIT2.CTHrunACSTest');
		$state.go('PIT2.RequiredTestCases');
	}
	
	$scope.back = function(){
		PIT2ReviewService.isReturn = true;
		$state.go(PIT2ReviewService.backActionState);
	}

}]);