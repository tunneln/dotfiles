<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript"
	src="../../vendor/scripts/angular_1.5.7/angular.min.js"></script>
<script type="text/javascript"
	src="../../vendor/scripts/angular_1.5.7/angular-cookies.min.js"></script>

<script>
	var iframeApp = angular.module("IFrameApp",['ngCookies']);
	iframeApp.controller("TestCtrl",["$scope","$cookieStore","$sce",function($scope,$cookieStore,$sce){
		$scope.cookieVal = $cookieStore.get("Iframe");
		$scope.compressedCReq = $scope.cookieVal.CompressedCReq;
		$scope.termUrl = $scope.cookieVal.TermUrl;
		$scope.md = $scope.cookieVal.Md;
		$scope.creqAcsUrl = $sce.trustAsResourceUrl($scope.cookieVal.CreqACSURL);
		
	}]);
	
	function submitPage(){
        document.forms['postHiddenCReqToACSForm'].submit();
    }
	
</script>
</head>
<body ng-app="IFrameApp" ng-controller="TestCtrl" onload="submitPage();">
	<form name="postHiddenCReqToACSForm" method="POST"
		action="{{creqAcsUrl}}">
		<input type="hidden" name="cReq" ng-model="compressedCReq"
			value="{{compressedCReq}}" class="form-control input-sm"></input> <input
			type="hidden" name="notificationURL" ng-model="termUrl" value="{{termUrl}}"
			class="form-control input-sm"></input> <input type="hidden" name="MD"
			ng-model="merchantData" value="{{md}}" class="form-control input-sm"></input>
		<br><br><br><br><br>	
		<br><br><br><br><br>
		<table border="0" cellspacing="0" cellpadding="0" align="center">
			<tr>
				<td height="15" />
			</tr>
			<tr>
				<td align="center" VALIGN="top" />
				<td align="center"><img
					src="../../images/acss_imgs/wait.gif"></td>
			</tr>
			<tr>
				<td align="center" VALIGN="top" />
				<td height="15" align="center" valign="middle">Please wait a
					few moments while we process your request</td>
			</tr>
		</table>
	</form>
</body>
</html>