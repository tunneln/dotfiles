<%@ page language="java" contentType="text/html; charset=ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%-- <%@page import="com.visa.acss.util.ACSSConst"%> --%>
<html>
	<head>
		<%-- <LINK type="text/css" rel="stylesheet" href="script/style.css" /> --%>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Card holder Enrollment During Shopping</title>
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
	<body>
		<%--
            Object tempResMsg = request.getAttribute(ACSSConst.PARAM_RESMSG);
            Object tempLogId = request.getAttribute(ACSSConst.PARAM_INMSG_DTL_ID);
            Object tempTermUrl = request.getAttribute(ACSSConst.PARAM_TERM_URL);
            Object tempMd = request.getAttribute(ACSSConst.PARAM_MSG_MD);
            
            String resMsg = (String)((tempResMsg != null) ? tempResMsg : "");
            String logId = (String)((tempLogId != null) ? tempLogId : "");
            String termUrl = (String)((tempTermUrl != null) ? tempTermUrl : "");
            String mD = (String)((tempMd != null) ? tempMd : "");
        --%> 
		<DIV id="main">
			<DIV id="content">
				<FORM name="mainForm" method="POST" action="${actionUrl}">
	
					<%-- <INPUT type="hidden" name='<%=ACSSConst.PARAM_FROM_HTML %>' value = "true"> --%>
					<INPUT type="hidden" name='cres' value='${cres}'>
					<%-- <INPUT type="hidden" name='<%=ACSSConst.PARAM_INMSG_DTL_ID %>' value='<%=logId %>'> --%>
					<INPUT type="hidden" name='notificationUrl' value='${notificationUrl}'> <INPUT
						type="hidden" name='threeDSSessionData' value='${threeDSSessionData}'>
					<input type="hidden" name='rReqMessage' value='${rReqMessage}'>
	
					<TABLE border="0" cellspacing="0" cellpadding="0" align="center">
						<TR>
							<TD width="20%" colspan="2" nowrap><IMG
								src="../../app/images/acss_imgs/visaSmall.gif" /> &nbsp;&nbsp;&nbsp; <IMG
								src="../../app/images/acss_imgs/verified_by_visa_grey_box.gif" border="0" width="110"
								height="65" /></TD>
						</TR>
						<TR>
							<TD align="center"><LABEL class="heading1">CREATE
									YOUR PASSWORD</LABEL></TD>
						</TR>
						<TR>
							<TD align="left">&nbsp;</TD>
						</TR>
						<TR>
							<TD align="center">This is a test environment to simulate the
								ACS.</TD>
						</TR>
						<TR>
							<TD align="left">&nbsp;</TD>
						</TR>
						<TR>
							<TD align="center">Please click continue to proceed</TD>
						</TR>
						<TR>
							<TD align="left">&nbsp;</TD>
						</TR>
						<TR>
							<TD align="left">&nbsp;</TD>
						</TR>
	
						<TR>
							<TD align="center"><input type="submit" class="btn"
								value="CONTINUE" /></TD>
						</TR>
					</TABLE>
				</FORM>
			</DIV>
			<DIV id="footer">
				<%-- <jsp:include page="../footer.jsp"  flush="true"/> --%>
				<center>
					<table>
						<TR>
							<TD align="middle"><IMG src="../../app/images/acss_imgs/footer.gif" /></TD>
						</TR>
					</table>
				</center>
			</DIV>
		</DIV>
	</body>
</html>
