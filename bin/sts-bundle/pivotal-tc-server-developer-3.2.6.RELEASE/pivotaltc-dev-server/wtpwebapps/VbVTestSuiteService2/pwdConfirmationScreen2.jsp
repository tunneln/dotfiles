<%@ page language="java" contentType="text/html; charset=ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Password Confirmation</title>
		<style>
			.heading1 {
				color: #EC9400;
				FONT-FAMILY: Arial;
				FONT-SIZE: 13pt;
				font-weight: bold;
			}
			.btn{
				text-align: center;
				background-color:#00249F;
				color: white;
				font-size: 10px;
				font-weight :bold;
				border-bottom-style:groove;
				border-right-style: groove;
				border-bottom: thin;
				border-right: thin;
				cursor: pointer;
				text-decoration: none;
				padding: 0px;
			}
			.btn:HOVER {
				cursor: pointer;
			}
		</style>
		<SCRIPT type="text/javascript">
			function showResponseStub() {
				document.location.href = "ResponseStub.html";
				return false;
			}
		
			function submitPage() {
				document.mainForm.submit();
			}
		</SCRIPT>	
	</head>
	
	<body>
		<FORM name="mainForm" method="POST" action="${actionUrl}">
			<INPUT type="hidden" name='cres' value='${cres}'>
			<INPUT type="hidden" name='notificationUrl' value='${notificationUrl}'> <INPUT
				type="hidden" name='threeDSSessionData' value='${threeDSSessionData}'> <INPUT type="hidden"
				name='pwdConfirmScreen' value='${pwdConfirmScreen}'>
			<INPUT type="hidden"
				name='rReqMessage' value='${rReqMessage}'>	
	
			<TABLE border="0" cellspacing="0" cellpadding="0" align="center">
				<TR>
					<TD height="30" />
				</TR>
				<TR>
					<TD><img src="../../../app/images/acss_imgs/visa.gif" ></TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
					<TD><LABEL class="heading1">Verification Successful</LABEL></TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
	
					<TD>Your password has been confirmed, giving you enhanced
						safety for this purchase</TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
					<TD>Please click continue to proceed</TD>
				</TR>
	
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
					<TD align="center"><input type="button" class="btn"
						value="CONTINUE" onclick="javascript:submitPage()"></TD>
				</TR>
			</TABLE>
		</FORM>
	</body>
</html>
