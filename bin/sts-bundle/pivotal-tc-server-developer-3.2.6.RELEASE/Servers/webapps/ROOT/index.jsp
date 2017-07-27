<%@ page import="org.apache.catalina.util.ServerInfo" session="false" %>
<!DOCTYPE HTML>
<html>

<head>
	<link rel="shortcut icon" href="http://www.pivotal.io/sites/all/themes/gopo13/images/favicon.ico" type="image/x-icon">
	<title>Pivotal tc Server &#8212; Developer Edition with Spring Insight</title>
	<link type="text/css" rel="stylesheet" href="splash.css">
</head>

<body>
	<div id="container">
		<!-- This page was released with Pivotal tc Server Developer Edition 3.2.6.RELEASE -->
		<!-- Header -->
		<div id="hdr"><span class="utility"><a href="https://network.pivotal.io/products/pivotal-app-suite" title="Pivotal tc Server">Pivotal tc Server</a></span><a href="http://www.pivotal.io/" title="Pivotal"><h1>Pivotal</h1></a></div>
		<div class="clearfix"></div>

		<!-- Body -->
		<div id="content">
    		<div id="intro">
				<!--<h4>Pivotal</h4>-->
				<h2>Pivotal tc Server &#8212; Developer Edition with Spring Insight</h2>
				<h3 class="title">Congratulations! You have successfully setup and started Pivotal tc Server.  You are ready to go!</h3>
			</div>

			<div class="bodyrule"><hr /></div>

			<div>
				<p>This is the default Pivotal tc Server Runtime home page. It is located on the local filesystem at:</p>
				<span class="code">$TC_RUNTIME_INSTANCE_HOME/webapps/ROOT/index.jsp</span>
				<p>where <span class="code">$TC_RUNTIME_INSTANCE_HOME</span> is the root of the tc Runtime instance directory.</p>
				<p>&nbsp;</p>
				<div id="links">
				<h3>For additional information about Pivotal tc Server, see the following links:</h3>
				<ul>
					<li><a href="https://network.pivotal.io/products/pivotal-tcserver">Pivotal tc Server Product Details</a><br />The official home for the Pivotal tc Server.</li>
					<li><a href="http://docs.pivotal.io/tcserver/index.html">Pivotal tc Server Documentation </a><br />Find out what it does, how to use it, and other useful information.</li>
					<li><a href="http://stackoverflow.com/questions/tagged/tcserver">Pivotal tc Server Product Community</a><br />We are active on StackOverflow, so you can ask questions and get answers from Pivotal experts and experienced community members.</li>
					<li><a href="http://www.spring.io/tools">Spring Tool Suite (STS)</a><br />Go here to download the latest STS release with Pivotal tc Server and Spring Insight bundled in it!</li>
					<li><a href="http://www.pivotal.io/contact">Pivotal tc Server Inquiries</a><br />Have a question about Pivotal tc Server? Contact us.</li>
					<li><a href="mailto:tcserver@pivotal.io">Email questions to us</a><br></li>
				</ul>
				</div>
			</div>
		</div>

		<div class="clearfix"></div>
		<div id="versions">
			Pivotal tc Server Developer Edition<br/>
			<% out.println(ServerInfo.getServerInfo()); %>
		</div>

		<div id="ftr">&copy; 2016 Pivotal Software, Inc. All rights reserved.</div>
	</div>

</body>
</html>
