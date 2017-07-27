<%-- Prevent the creation of a session --%>
<%@ page session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%
	/* HttpSession ses = request.getSession();
	String s1 = String.valueOf(ses.getAttribute("inovant_csrf_token"));     */
%>

<HTML>
<HEAD>
<TITLE>Send CRes to NotificationURL</TITLE>
</HEAD>
<BODY>
<FORM NAME="postCResToMPIForm" ACTION="<c:out value="${notificationURL}"/>" METHOD="post">

<TABLE BORDER="1" CELLPADDING="10" CELLSPACING="0" ALIGN="center">
	<TR>
		<TD ALIGN="center">
			<TABLE BORDER="0" CELLPADDING="5" CELLSPACING="0">
			    <TR> 
			        <TH COLSPAN="2" ALIGN="center"> 
			            <FONT SIZE="+2">
			                <c:out value="Send CRes to NotificationURL"/>
			            </FONT>
			        </TH>
			    </TR>
			    <TR> 
			        <TH ALIGN="center" COLSPAN="2">
			            <FONT COLOR="red">
			                <c:out value="${errorMessage}"/>
			            </FONT>
			        </TH>   
			    </TR>
			    <TR>
			        <TH ALIGN="right" VALIGN="top">
			            Response to CReq:
			        </TH>
			        <TD>
			            <TEXTAREA ROWS="16" COLS="100" WRAP="on" READONLY><c:out value="${cres}"/></TEXTAREA>
			        </TD>
			    </TR>
			    <TR>
			        <TD ALIGN="center" COLSPAN="2">
			            <INPUT TYPE="submit" value="Submit">
			            <INPUT TYPE="hidden" NAME="cres" VALUE="${compressedCRes}" escapeXml="false"/>
			            <INPUT TYPE="hidden" NAME="threeDSSessionData" VALUE="${threeDSSessionData}"/>
			            <%-- <input type="hidden" name="csrf" value="<c:out value="<%=s1%>"/>"> --%>
			        </TD>
			    </TR>
			</TABLE>
		</TD>
		</TR>
	</TABLE>
</FORM>
</BODY>
</HTML>
