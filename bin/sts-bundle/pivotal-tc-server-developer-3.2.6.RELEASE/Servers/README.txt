Operating System Family: unix
Virtual Machine Architecture: x64
Virtual Machine Name: hotspot
========================================================================================================================
Template: base
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Sets Xmx to 512M
* Sets Xss to 256K
* Adds a control script to the instance
* Adds the Windows service wrapper libraries
* Adds a default jmxremote configuration with a read/write user called 'admin' 
with a generated password
* Adds a default JULI logging configuration
* Adds a default server configuration containing:
	* A JRE memory leak prevention listener
	* A tc Runtime Deployer listener
	* A JMX socket listener
	* A LockOutRealm to prevent attempts to guess user passwords via a 
brute-force attack
	* An in-memory user database
	* A threadpool that has up to 300 threads
	* A host that uses 'webapps' as its app base
	* An AccessLogValve
* Adds a default Tomcat user configuration that is empty
* Adds an init.d script configured to start the instance as a specific user
* Adds a root web application
========================================================================================================================
Template: base-tomcat-85
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Add Tomcat 8-specific Servlet 3.1 Specification
* Add Tomcat 8-specific web.xml as a watched resource
========================================================================================================================
Template: jmx-ssl
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Updates the JmxSocketListener to use SSL for all JMX communication
* Adds sample certificate and key files that can be used to test the SSL 
configuration
========================================================================================================================
Template: apr
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Adds an APRLifecycleListener to detect the APR-based native library required 
to use the APR/native connector
* Adds an APR/native (APR) connector for HTTP

NOTE: That the APR/native library must be present in order to use the APR 
connector
========================================================================================================================
Template: diagnostics
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Adds a JDBC resource that integrates with request diagnostics to report slow 
queries
* Adds a ThreadDiagnosticsValve at the Engine level to report slow running 
requests
========================================================================================================================
Template: apr-ssl
Version: 3.2.6.RELEASE
Build Date: 20170525022821

The Apache Portable Runtime (APR) library improves scalability, performance, 
and integration with native server technologies.

* Adds an APRLifecycleListener to detect the APR-based native library required 
to use the APR/native connector
* Adds an APR/native connector for HTTPS
* Adds sample certificate and key files that can be used to test the SSL 
configuration

NOTE: That the APR/native library must be present in order to use the APR 
connector
========================================================================================================================
Template: nio
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Adds a Non-Blocking IO (NIO) connector for HTTP
========================================================================================================================
Template: ajp
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Adds an Apache JServ Protocol (AJP) connector
========================================================================================================================
Template: nio-ssl
Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Adds a Non-Blocking IO (NIO) connector for HTTPS
* Adds sample certificate and key files that can be used to test the SSL 
configuration
