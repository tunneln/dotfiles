#!/bin/sh 
# ---------------------------------------------------------------------------
# tc Server Admin Script
#
# Copyright (c) 2010-2017 Pivotal Software, Inc.  All rights reserved.
# ---------------------------------------------------------------------------
# version: 3.2.6.RELEASE
# build date: 20170525022821

if [ -z "$JAVA_HOME" ]
then
    command -v java >/dev/null 2>&1
    if [ "$?" -eq "1" ]; then
        echo No JAVA_HOME environment variable is defined and can not locate java command.
        exit 1
    fi
    JAVA_CMD=java
else
    JAVA_CMD=$JAVA_HOME/bin/java
fi

SCRIPT="$0"

# SCRIPT may be an arbitrarily deep series of symlinks. Loop until we have the concrete path.
while [ -h "$SCRIPT" ] ; do
  ls=`ls -ld "$SCRIPT"`
  # Drop everything prior to ->
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    SCRIPT="$link"
  else
    SCRIPT=`dirname "$SCRIPT"`/"$link"
  fi
done

RUNTIME_DIR=`dirname "$SCRIPT"`
INSTANCE_DIR=`pwd`

CONF_DIR=`dirname "$SCRIPT"`/conf
CLASSPATH=""

LIB_DIR=`dirname "$SCRIPT"`/lib
for file in "$LIB_DIR"/*.jar
do
  if [ -n "$CLASSPATH" ]
  then
    CLASSPATH=$CLASSPATH:$file
  else
    CLASSPATH=$file
  fi
done

$JAVA_CMD $JAVA_OPTS "-Dtcs.version=3.2.6.RELEASE"  "-Dtcs.edition=developer" "-Djava.util.logging.config.file=$CONF_DIR/commons-logging.properties" "-Druntime.directory=$RUNTIME_DIR" "-Ddefault.instance.directory=$INSTANCE_DIR" -classpath "$CLASSPATH" com.springsource.tcruntime.instance.TcRuntimeAdmin "$@"
EXIT_CODE=$?

exit $EXIT_CODE
