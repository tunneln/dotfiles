<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

</head>
<body>
	<form name="postCReqToACSForm" method="POST" action="{{creqAcsUrl}}">
		<div class="row">
			<div class="col-md-2">
				<label>CReq :</label>
			</div>
			<div class="col-md-4">
				<input name="creq" ng-model="compressedCReq"
					value="{{compressedCReq}}" class="form-control input-sm"></input>
			</div>
		</div>
		
		<div class="row">
			<div class="col-md-2">
				<label>MD : </label>
			</div>
			<div class="col-md-4">
				<input name="threeDSSessionData" ng-model="threeDSSessionData"
					value="{{threeDSSessionData}}" class="form-control input-sm"></input>
			</div>
		</div>
		<br>
		
		<input type="submit" value="Submit" class="btn btn-primary btn-sm"
			style="cursor: pointer;">

	</form>
</body>
</html>