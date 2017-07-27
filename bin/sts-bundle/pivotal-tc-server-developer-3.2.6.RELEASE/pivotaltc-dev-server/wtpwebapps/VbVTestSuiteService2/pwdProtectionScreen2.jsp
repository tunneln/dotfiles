<%@ page language="java" contentType="text/html; charset=ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Password Protection</title>
		<style>
		.heading1 {
			color: #EC9400;
			FONT-FAMILY: Arial;
			FONT-SIZE: 13pt;
			font-weight: bold;
		}
		
		.btn {
			text-align: center;
			background-color: #00249F;
			color: white;
			font-size: 10px;
			font-weight: bold;
			border-bottom-style: groove;
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
	</head>
	
	<SCRIPT type="text/javascript">
		function submitPage() {
			document.mainForm.submit();
		}
	
		function clearInputs() {
			document.mainForm.txtPwd.value = "";
		}
	</SCRIPT>
	<body>
		<FORM name="mainForm" method="POST" action="${actionUrl}">
			<INPUT type="hidden" name='cres' value='${cres}'>
			<INPUT type="hidden" name='notificationUrl' value='${notificationUrl}'> <INPUT
				type="hidden" name='threeDSSessionData' value='${threeDSSessionData}'> <INPUT type="hidden"
				name='pwdConfirmScreen' value='${pwdConfirmScreen}'>
			<input type="hidden" name='rReqMessage' value='${rReqMessage}'>	
	
			<TABLE border="0" cellspacing="0" cellpadding="0" align="center">
				<TR>
					<TD height="30" />
				</TR>
				<TR>
					<TD><img src="../../app/images/acss_imgs/visa.gif"></TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
				<TR>
					<TD align="left">&nbsp;</TD>
				</TR>
	
				<TR>
					<TD colspan="2"><LABEL class="heading1"> PASSWORD
							PROTECTION </LABEL></TD>
				</TR>
				<TR>
					<TD align="left" colspan="2" height="40" />
				</TR>
	
				<TR>
					<TD colspan="2"><LABEL>Please enter your Verified by
							Visa password and click submit</LABEL></TD>
				</TR>
				<TR>
					<TD align="left" colspan="2" height="20" />
				</TR>
				<TR>
					<TD>Enter your password</TD>
					<TD align="right"><B>: </B> <input type="password"  autocomplete="off"
						name="txtPwd" size="30"></TD>
				</TR>
				<TR>
					<TD align="left" colspan="2">&nbsp;</TD>
				</TR>
				<TR>
					<TD align="left" colspan="2" height="15" />
				</TR>
				<TR>
					<TD colspan="2" align="center"><input type="button" class="btn"
						value="SUBMIT" onclick="javascript:submitPage()">
						&nbsp;&nbsp;&nbsp; <input type="button" class="btn" value="CANCEL"
						onclick="javascript:clearInputs()"></TD>
				</TR>
			</TABLE>
		</FORM>
	</body>
</html>
