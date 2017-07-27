<%@ page language="java"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<SCRIPT type="text/javascript">

    function showResponseStub(){
        document.location.href ="ResponseStub.html";
        return false;
    }
    
    function submitPage(){
        document.forms['postCResToPITForm'].submit();
    }

</SCRIPT>
</head>

<body onload="submitPage()">
	<FORM NAME="postCResToPITForm" ACTION="${notificationUrl}"
		METHOD="post">
		<%-- <input type="hidden" name="csrf" value="${csrf}"> --%>
		<TABLE border="0" cellspacing="0" cellpadding="0" align="center">
			<TR>
				<TD height="15" />
			</TR>
			<TR>
				<TD width="23%" colspan="2" nowrap="nowrap" valign="top"
					align="left"></TD>
			</TR>
			<TR>
				<TD align="left" height="10">&nbsp;</TD>
			</TR>
			<TR>
				<TD align="left" colspan="3"><LABEL class="pageheading"></LABEL></TD>
			</TR>
			<TR>
				<TD height="20" />
			</TR>
			<TR>
				<TD></TD>
				<TD align="center"><LABEL class="heading1"></LABEL></TD>
			</TR>
			<TR>
				<TD height="50" />
			</TR>
			<TR>
				<TD ALIGN="center" VALIGN="top" />
				<TD align="center"><IMG
					src="../../../app/images/acss_imgs/wait.gif"></TD>
			</TR>
			<TR>
				<TD ALIGN="center" VALIGN="top" />
				<TD height="15" align="center" valign="middle">Please wait a
					few moments while we process your request</TD>
			</TR>
			<TR>
				<TD></TD>
				<TD ALIGN="center"></TD>
			</TR>
			<TR>
				<TD></TD>
				<TD align="center"></TD>
			</TR>
			<TR>
				<TD height="200" /></TD>
			</TR>
			<TR>
				<TD />
				<TD>
					<center>
						<table>
							<TR>
								<TD align="middle"></TD>
							</TR>
						</table>
					</center>
				</TD>
			</TR>

		</TABLE>
		<INPUT TYPE="hidden" NAME="cres" VALUE='${cres}'>
		<INPUT TYPE="hidden" NAME="threeDSSessionData" VALUE='${threeDSSessionData}'>
	</FORM>
</body>
</html>
