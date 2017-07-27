Version: 3.2.6.RELEASE
Build Date: 20170525022821

* Adds a jvmRoute attribute to the Engine element to uniquely identify the node
* Adds a Cluster configuration (default without the WAR farm deployer) at the 
Engine level. By default, multicast
  discovery will be used to identify other nodes in the cluster. If multicast 
is not enabled on the sub-net or if
  multiple tc Runtime clusters may be present on the same subnet then this 
should be re-configured to use static
  membership.
