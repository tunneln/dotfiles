#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Quickstart instance creation script
#
# Copyright (c) 2010-2017 Pivotal Software, Inc.  All rights reserved.
# ---------------------------------------------------------------------------
# version: 3.2.6.RELEASE
# build date: 20170525022821


get_JAVAHOME() {
PRETTY_REQUIRED_VERSION=1.6

# Transform the required version string into a number that can be used in comparisons
REQUIRED_VERSION=`echo $PRETTY_REQUIRED_VERSION | sed -e 's;\.;0;g'`

if [ -z $JAVA_HOME ]
then 
    JAVA_EXE=`type -p java`
    JAVA_HOME=`echo $JAVA_EXE | awk '{ print substr($1, 1, length($1)-9); }'`
    echo "Found JAVA_HOME in PATH: $JAVA_HOME"
fi

# Check JAVA_HOME directory to see if Java version is adequate
if [ $JAVA_HOME ]
then
    JAVA_EXE=$JAVA_HOME/bin/java
    # Grep out the line containing 'version' and strip quotes from the 3rd record which is the java version
    VERSION=`$JAVA_EXE -version 2>&1 | grep "version" | awk '{ print substr($3, 2, length($3)-2); }'`
    VERSION=`echo $VERSION | awk '{ print substr($1, 1, 3); }' | sed -e 's;\.;0;g'`
    if [ $VERSION ]
    then
        if [ $VERSION -ge $REQUIRED_VERSION ]
        then
            JAVA_HOME=`echo $JAVA_EXE | awk '{ print substr($1, 1, length($1)-9); }'`
        else
            JAVA_HOME=
        fi
    else
        JAVA_HOME=
    fi
fi

# If the existing JAVA_HOME directory is adequate, then leave it alone
# otherwise, use 'locate' to search for other possible java candidates and
# check their versions. If 'locate' not found then skip this step
if [ $JAVA_HOME ]
then
    :
elif [ command -v locate >/dev/null 2>&1 ]
then
    for JAVA_EXE in `locate bin/java | grep java$ | xargs echo`
    do
        if [ $JAVA_HOME ] 
        then
            :
        else
            # Grep out the line containing 'version' and strip quotes from the 3rd record which is the java version
            VERSION=`$JAVA_EXE -version 2>&1 | grep "version" | awk '{ print substr($3, 2, length($3)-2); }'`
            VERSION=`echo $VERSION | awk '{ print substr($1, 1, 3); }' | sed -e 's;\.;0;g'`
            if [ $VERSION ]
            then
                if [ $VERSION -ge $REQUIRED_VERSION ]
                then
                    JAVA_HOME=`echo $JAVA_EXE | awk '{ print substr($1, 1, length($1)-9); }'`
                fi
            fi
        fi
    done
fi

# If the correct Java version is detected, then export the JAVA_HOME environment variable
if [ $JAVA_HOME ]
then
    export JAVA_HOME
    echo "JAVA_HOME is set to: $JAVA_HOME"
else
    echo "A valid 'java' executable was not found or was not set to a supported version."
    echo "Please set JAVA_HOME to version $PRETTY_REQUIRED_VERSION or greater."
    exit 1;
fi
}

# Find the default instance dir
# First see if the /var/opt/pivotal... dir exists, since it should be when created with the RPM, else use installation dir
getDefaultInstanceDirectory(){
	DEFAULT_INSTANCE_DIR="/var/opt/pivotal/pivotal-tc-server-standard"
	if [[ ! -d "$DEFAULT_INSTANCE_DIR" && ! -w "DEFAULT_INSTANCE_DIR" ]]; then
		DEFAULT_INSTANCE_DIR="$1"
	fi
	export DEFAULT_INSTANCE_DIR
}


# Start main script
echo ""
echo "** This script will guide you through the creation and configuration of a tcServer instance with a nio and nio-ssl connector **"
echo ""

get_JAVAHOME

TCSERVER_HOME_DIR="$( cd "$( dirname "$0" )/.." && pwd )" 

getDefaultInstanceDirectory "$TCSERVER_HOME_DIR"

# Get the instance directory from the user
DIR_EXISTS=""
echo "Please specify the directory to install the instance [default: $DEFAULT_INSTANCE_DIR]:"
while [ -z $DIR_EXISTS ] 
do
	read "INSTANCE_DIRECTORY"
	if [ -z "$INSTANCE_DIRECTORY" ]; then
		INSTANCE_DIRECTORY="$DEFAULT_INSTANCE_DIR"
	fi
	if [ ! -d "$INSTANCE_DIRECTORY" ]; then
	    echo "Directory '$INSTANCE_DIRECTORY' does not exist. Please try a different directory location:"
	elif [ ! -w "$INSTANCE_DIRECTORY" ]; then
		    echo "Directory '$INSTANCE_DIRECTORY' is not writeable. Please try a different directory location:"
	else
		DIR_EXISTS="true"
	fi
done

# Get the instance name from the user
FOUND_INSTANCE=""
echo "Please enter a name for the instance [default: EXAMPLE-INSTANCE]:"
# Make sure it doesn't already exist
while [ -z $FOUND_INSTANCE ]
do
	read "INSTANCE_NAME"
	if [ -z "$INSTANCE_NAME" ]; then
		INSTANCE_NAME="EXAMPLE-INSTANCE"
	fi
	if [ -d "$INSTANCE_DIRECTORY/$INSTANCE_NAME" ]; then
	    echo "Instance name '$INSTANCE_NAME' already exists. Please try a different name:"
	else 
		FOUND_INSTANCE="true"
	fi
done

# Should the instance be started?
echo "Would you like to start instance '$INSTANCE_NAME' (Y/N)? [default: N]:"
read "START_INSTANCE"

# Create the instance
echo ""
echo "Creating instance with common templates nio and nio-ssl with the command:"
echo "   $TCSERVER_HOME_DIR/tcruntime-instance.sh create --interactive --instance-directory $INSTANCE_DIRECTORY -t nio -t nio-ssl $INSTANCE_NAME"
echo ""
"$TCSERVER_HOME_DIR/tcruntime-instance.sh" create --interactive --instance-directory "$INSTANCE_DIRECTORY" -t nio -t nio-ssl "$INSTANCE_NAME"

if [ "$?" !=  "0" ]; then
	echo "Error: Instance creation had a problem. Exiting."
    exit 1
fi


# Start instance?
echo ""
if [[ -n $START_INSTANCE && ( $START_INSTANCE = "y" || $START_INSTANCE = "Y" ) ]]; then
	echo "Starting $INSTANCE_NAME with command:"
	echo "   $TCSERVER_HOME_DIR/tcruntime-ctl.sh -n $INSTANCE_DIRECTORY $INSTANCE_NAME start"
	echo ""
    "$TCSERVER_HOME_DIR/tcruntime-ctl.sh" -n "$INSTANCE_DIRECTORY" "$INSTANCE_NAME" start
fi
	
