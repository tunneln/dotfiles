@echo off
rem ---------------------------------------------------------------------------
rem tc Runtime Provisioning Script
rem
rem Copyright (c) 2010-2017 Pivotal Software, Inc.  All rights reserved.
rem ---------------------------------------------------------------------------
rem version: 3.2.6.RELEASE
rem build date: 20170525022821

SET /A ARG_COUNT=0
FOR %%A IN (%*) DO SET /A ARG_COUNT+=1

IF "%OS%" == "Windows_NT" SETLOCAL

IF NOT "%JAVA_HOME%" == "" goto JavaHomeSet
echo The JAVA_HOME environment variable is not defined
GOTO:EOF

:JavaHomeSet
IF NOT EXIST "%JAVA_HOME%\bin\java.exe" (
  echo "%JAVA_HOME%\bin\java.exe doesn't exist"
  GOTO:EOF
)

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

"%JAVA_HOME%\bin\java" %JAVA_OPTS% -Druntime.directory="%RUNTIME_DIR%" -Ddefault.instance.directory="%INSTANCE_DIR%" -classpath %CLASSPATH% com.springsource.tcruntime.instance.TcRuntimeInstance %*
SET _RET=%ERRORLEVEL%
IF %_RET% EQU 1 (
    IF %ARG_COUNT% EQU 0 (
        pause
    )
)

exit /b %_RET%
