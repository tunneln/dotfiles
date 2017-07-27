@echo off
rem ---------------------------------------------------------------------------
rem tc Server Admin Script
rem
rem Copyright (c) 2010-2017 Pivotal Software, Inc.  All rights reserved.
rem ---------------------------------------------------------------------------
rem version: 3.2.6.RELEASE
rem build date: 20170525022821

SET /A ARG_COUNT=0
FOR %%A IN (%*) DO SET /A ARG_COUNT+=1

IF "%OS%" == "Windows_NT" SETLOCAL

IF NOT "%JAVA_HOME%" == "" goto JavaHomeSet
FOR /f "delims=" %%a in ('where java') do @set JAVA_BIN=%%a
IF NOT EXIST "%JAVA_BIN%" (
echo No JAVA_HOME environment variable is defined and can not locate java command.
)
GOTO:EOF

:JavaHomeSet
SET SCRIPT_DIR=%~dp0%

set RUNTIME_DIR=%SCRIPT_DIR:~0,-1%
set INSTANCE_DIR=%CD%

set CLASSPATH=

PUSHD "%SCRIPT_DIR%lib"
FOR %%G IN (*.*) DO CALL:APPEND_TO_CLASSPATH lib %%G
POPD
GOTO Continue

: APPEND_TO_CLASSPATH
set filename=%~2
set suffix=%filename:~-4%
if %suffix% equ .jar set CLASSPATH=%CLASSPATH%;"%SCRIPT_DIR%%~1\%filename%"
GOTO:EOF

:Continue
rem If there is a trailing back slash, strip if off
IF %INSTANCE_DIR:~-1%==\ SET INSTANCE_DIR=%INSTANCE_DIR:~0,-1%

"%JAVA_HOME%\bin\java" %JAVA_OPTS% -Dtcs.version=3.2.6.RELEASE -Dtcs.edition=developer -Djava.util.logging.config.file="%SCRIPT_DIR%\conf\commons-logging.properties" -Druntime.directory="%RUNTIME_DIR%" -Ddefault.instance.directory="%INSTANCE_DIR%" -classpath %CLASSPATH% com.springsource.tcruntime.instance.TcRuntimeAdmin %*
SET _RET=%ERRORLEVEL%
IF %_RET% EQU 1 (
    IF %ARG_COUNT% EQU 0 (
        pause
    )
)

exit /b %_RET%
