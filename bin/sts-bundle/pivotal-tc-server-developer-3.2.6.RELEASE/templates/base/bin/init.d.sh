#!/bin/sh
#
# ---------------------------------------------------------------------------
# tc Runtime application server bootup script
#
# Copyright (c) 2010-2017 Pivotal Software, Inc.  All rights reserved.
# ---------------------------------------------------------------------------
# chkconfig: 2345 80 20
# description: Start up the tc Runtime application server
### BEGIN INIT INFO
# Provides: tcserver
# Required-Start: $ALL
# Required-Stop:
# Should-Stop:
# Default-Start:  2 3 5
# Default-Stop:
### END INIT INFO
# version: 3.2.6.RELEASE
# build date: 20170525022821

# Source function library.

# The user account that will run the tc Runtime instance
TC_RUNTIME_USER="${runtime.user:tcserver}"
PRGDIR="<INSTANCE_LOCATION>/bin"

# DO NOT EDIT BEYOND THIS LINE
RETVAL=$?

setup () {
	#Absolute path
	PRGDIR=`cd "$PRGDIR" ; pwd -P`
}

stop() {
	if [ -x "$PRGDIR/tcruntime-ctl.sh" ]; then
		echo "Stopping tcServer"
		/bin/su -s /bin/sh $TC_RUNTIME_USER $PRGDIR/tcruntime-ctl.sh stop
		RETVAL=$?
	else
		echo "Startup script $PRGDIR/tcruntime-ctl.sh doesn't exist or is not executable."
		RETVAL=255
	fi
}

status() {
	if [ -x "$PRGDIR/tcruntime-ctl.sh" ]; then
		echo "Status-ing tcServer"
		/bin/su -s /bin/sh $TC_RUNTIME_USER $PRGDIR/tcruntime-ctl.sh status
		RETVAL=$?
	else
		echo "Startup script $PRGDIR/tcruntime-ctl.sh doesn't exist or is not executable."
		RETVAL=255
	fi
}

start() {
	id -u $TC_RUNTIME_USER  > /dev/null 2>&1
	if [ "$?" == "1" ]; then
		echo "User $TC_RUNTIME_USER doesn't exist. Can not start!"
		RETVAL=255
	else 
		if [ -x "$PRGDIR/tcruntime-ctl.sh" ]; then
			echo "Starting tcServer"
			/bin/su -s /bin/sh $TC_RUNTIME_USER $PRGDIR/tcruntime-ctl.sh start
			RETVAL=$?
		else
			echo "Startup script $PRGDIR/tcruntime-ctl.sh doesn't exist or is not executable."
			RETVAL=255
		fi
	fi
}

setup

case "$1" in
	start)
		start
		;;
	stop)
		stop
		;;
	restart)
		stop
		start
		;;
	status)
		status
		;;
	*)
		echo $"Usage: $0 {start|stop|restart|status}"
		exit 1
		;;
esac

exit $RETVAL
