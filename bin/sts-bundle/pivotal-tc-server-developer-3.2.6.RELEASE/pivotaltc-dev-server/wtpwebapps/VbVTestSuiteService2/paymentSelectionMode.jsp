<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<style>
.heading1 {
	color: #EC9400;
	FONT-FAMILY: Arial;
	FONT-SIZE: 13pt;
	font-weight: bold;
}

.btn {
	text-align: center;
	background-color: #3385ff;
	color: white;
	font-size: 30px;
	font-weight: bold;
	border: none;
	cursor: pointer;
	border-radius:5px;
	text-decoration: none;
	width: 97%;
	padding: 0px;
}

.btn:HOVER {
	cursor: pointer;
}
</style>
</head>
<body>
	<FORM name="mainForm" method="POST" action="${actionUrl}">
		<input type="hidden" name='cres' value='${cres}'> <input
			type="hidden" name='notificationUrl' value='${notificationUrl}'>
		<input type="hidden" name='threeDSSessionData'
			value='${threeDSSessionData}'> <input type="hidden"
			name='pwdConfirmScreen' value='${pwdConfirmScreen}'> <input
			type="hidden" name='rReqMessage' value='${rReqMessage}'>
		<table border="1" cellspacing="0" cellpadding="0" align="center"
			height="auto" width="25%">
			<tr style="background-color: #666666;">
				<td align="center">9:23 AM</td>
			</tr>
			<tr style="background-color: #809fff;">
				<td colspan="2"><span style="margin-left: 80%;">Cancel</span><br>
					<h4 style="margin-left: 19%;">SECURE CHECKOUT</h4></td>
			</tr>
			<!-- <tr><td><h4>SECURE CHECKOUT</h4></td></tr> -->
			<tr>
				<td colspan="2">
					<table border="0">
						<tr></tr>
						<tr></tr>
						<tr>
							<td><span style="color: green;"><b>YourBank</b></span>&nbsp;&nbsp;<span><b>Card
									Network</b></span></td>
						</tr>
						<tr></tr>
						<tr>
							<td align="center"><h4>Payment Security</h4></td>
						</tr>
						<tr>
							<td><p>Hi Steve, your online payment is
									being secured using Card Network. Please select the option
									where you would like to receive the code from YourBank</p></td>
						</tr>
						<tr></tr>
						<tr>
							<td><input type="radio" name="otpTarget" checked="checked">Mobile *** *** *321<br>
								<input type="radio" name="otpTarget">Email a*******3@g****.com</td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr>
							<td align="center"><input type="submit"
								class="btn" value="NEXT"></td>
						</tr>
						<tr></tr>
						<tr></tr>
						<tr>
							<td>Learn more about
								authentication&nbsp;&nbsp;&#8595;</td>
						</tr>
						<tr>
							<td>Need some help ?&nbsp;&nbsp;&#8595;</td>
						</tr>
					</table>
				</td>	
			</tr>
		</table>
	</FORM>
</body>
</html>