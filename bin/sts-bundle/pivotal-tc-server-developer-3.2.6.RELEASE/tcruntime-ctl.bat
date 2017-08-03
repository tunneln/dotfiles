@echo off
rem ---------------------------------------------------------------------------
rem tc Runtime Control Script
rem
rem Copyright (c) 2010-2017 Pivotal Software, Inc.  All rights reserved.
rem ---------------------------------------------------------------------------

rem tcruntime-ctl.bat  This Win32 script takes care of starting and stopping
rem                     tomcat and installing and removing the service.
rem version: 3.2.6.RELEASE
rem build date: 20170525022821

setlocal enabledelayedexpansion

set TCRUNTIME_VER=3.2.6.RELEASE

rem where do we create tc Runtime instances. Overide any
rem existing settings from environment here
rem set INSTANCE_BASE=setme

set instance=%1
set action=%2
set stop_timeout=5

if "%instance%" == "help" (
  set ret=0
  if NOT "%action" == "" (
    echo ERROR help command doesn't have arguments
    set ret=1
  )
  goto usage
)
if "%instance%" == "" (
  echo ERROR First parameter must be an instance name
  set ret=1
  goto usage
)

if "%action%" == "" (
  echo ERROR Second parameter must be an instance command
  set ret=1
  goto usage
)

set stop_timeout_candidate=%3

if "%action%" == "stop" ( 
  if not "%stop_timeout_candidate:~0,1%" == "-" (
    set stop_timeout=%stop_timeout_candidate%
  )
)

if "%action%" == "restart" (
  if not "%stop_timeout_candidate:~0,1%" == "-" (
    set stop_timeout=%stop_timeout_candidate%
  )
)

set user_candidate=%3

if "%action%" == "install" (
  if not "%user_candidate:~0,1%" == "-" (
    set user=%user_candidate%
  )
)

if "%action%" == "reinstall" (
  if not "%user_candidate:~0,1%" == "-" (
    set user=%user_candidate%
  )
)

rem %~dp0 is location of current script under NT
set _REALPATH=%~dp0
set SCRIPT_PATH=!_REALPATH!

rem Determine CATALINA_BASE first
if not "!INSTANCE_BASE!" == "" goto gotInstanceBase

rem Check for the -i or -n argument only if INSTANCE_BASE is not set
set /a FOUND_ARG=0
FOR %%A IN (%*) DO (
  if !FOUND_ARG! == 1 (
    set /a FOUND_ARG-=1
    set INSTANCE_BASE=%%~fA
  )
  if %%A == -n (
    set /a FOUND_ARG+=1
  ) else (
      if %%A == -i (
        set /a FOUND_ARG+=1
      )
  )
)

rem Check for the -d argument
set /a FOUND_ARG=0
FOR %%A IN (%*) DO (
  if !FOUND_ARG! == 1 (
    set /a FOUND_ARG-=1
    set _REALPATH=%%~fA
  )
  if %%A == -d (
    set /a FOUND_ARG+=1
  )
)


if not "!INSTANCE_BASE!" == "" goto gotInstanceBase
set INSTANCE_BASE=!CD!

:gotInstanceBase
rem Make sure instance base exists
if NOT EXIST "!INSTANCE_BASE!" (
  echo ERROR Instance base directory "!INSTANCE_BASE!" does not exist
  endlocal
  set INSTANCE_BASE=
  exit /b 1
)

rem Strip instance_base of trailing backslash
:beginstriptrail
IF "!INSTANCE_BASE:~-1!"=="\" (
  set INSTANCE_BASE=!INSTANCE_BASE:~0,-1!
  goto beginstriptrail
) else (
  goto donestriptrail
)
:donestriptrail


set INSTANCE_NAME=%instance%
set CATALINA_BASE=!INSTANCE_BASE!\%INSTANCE_NAME%

set /p LAYOUT=<"!CATALINA_BASE!\.layout"
if "%LAYOUT%" == "combined" (
  goto combined
) else (
  goto separate
)

:combined
if not exist "!CATALINA_BASE!\conf\tomcat.version" goto guessTV
set /p TOMCAT_VER2=<"!CATALINA_BASE!\conf\tomcat.version"
if exist "!_REALPATH!\tomcat-%TOMCAT_VER2%" (
  set CATALINA_HOME=!_REALPATH!\tomcat-%TOMCAT_VER2%
  set TOMCAT_VER=%TOMCAT_VER2%
) else if exist "!TOMCAT_VER2!" (
  set CATALINA_HOME="!TOMCAT_VER2!"
  set TOMCAT_VER=!TOMCAT_VER2:*tomcat-=!
)
set TC_MAJOR_VERSION=%TOMCAT_VER:~0,1%
set CATALINA_HOME=!CATALINA_BASE!
goto checkCH

:testVersion
rem function testVersion
rem var testVersion_1 contains the version name
rem var testVersion_returnTo contains the label to return back to
if %testVersion_1% == "" (
  set TC_MAJOR_VERSION=""
  set RETURN="1"
  goto %testVersion_returnTo%
)

rem The following assumes version is wrapped in double quotes,
rem so first digit is actually second character.
set TC_MAJOR_VERSION=%testVersion_1:~1,1%
if not %TC_MAJOR_VERSION% == 7 if not %TC_MAJOR_VERSION% == 8 (
  set RETURN="1"
  goto %testVersion_returnTo%
)
set RETURN="0"
goto %testVersion_returnTo%

:getTC_MAJOR_VERSION
set /p TC_FILE_VERSION=<"!CATALINA_BASE!\conf\tomcat.version"
set CURRENT_TC_VERSION="!TC_FILE_VERSION!"
rem If %TC_FILE_VERSION% contains backslashes
if not !TC_FILE_VERSION:\=! == !TC_FILE_VERSION! (
  set TEMP_TOMCAT_VER=!TC_FILE_VERSION:*tomcat-=!
  set CURRENT_TC_VERSION="!TEMP_TOMCAT_VER!"
) else if not !TC_FILE_VERSION! == "" (
  set TEMP_TOMCAT_VER=!TC_FILE_VERSION!
)

set testVersion_1="!TEMP_TOMCAT_VER!"
set testVersion_returnTo=returnToGetTC_MAJOR_VERSION
goto testVersion

:returnToGetTC_MAJOR_VERSION
if %RETURN% == "1" (
  set TC_MAJOR_VERSION="7"
)
goto %getTC_MAJOR_VERSION_returnTo%

:separate
rem Check for tomcat.version file and read it in to set CATALINA_HOME
rem tomcat.version can contain either a version (eg: 6.0.20.A) or
rem a full pathname (eg: C:\foo\bar\tomcat-6.0.20.A) and we need
rem to handle both

if not "%TOMCAT_VER%" == "" goto guessCH
if not exist "!CATALINA_BASE!\conf\tomcat.version" goto guessTV
set /p TOMCAT_VER2=<"!CATALINA_BASE!\conf\tomcat.version"
if exist "!_REALPATH!\tomcat-%TOMCAT_VER2%" (
  set CATALINA_HOME=!_REALPATH!\tomcat-%TOMCAT_VER2%
  set TOMCAT_VER=%TOMCAT_VER2%
) else if exist "!TOMCAT_VER2!" (
  set CATALINA_HOME="!TOMCAT_VER2!"
  set TOMCAT_VER=!TOMCAT_VER2:*tomcat-=!
)

set testVersion_1="%TOMCAT_VER%"
set testVersion_returnTo=returnToGetTOMCAT_VERSION
goto testVersion

:returnToGetTOMCAT_VERSION
if %RETURN% == "1" (
  set getTC_MAJOR_VERSION_returnTo=returnToPickingCURRENT_TC_VERSION
  goto getTC_MAJOR_VERSION

  :returnToPickingCURRENT_TC_VERSION
  for /f %%d in ('dir /o:n /ad /b tomcat-%TC_MAJOR_VERSION%*') do set lastd=%%d
  set TOMCAT_VER=!lastd:tomcat-=!
  echo "Warning: Unable to locate tomcat runtime version %CURRENT_TC_VERSION%, using the latest version %TOMCAT_VER%"
  echo "Warning: Please update the tomcat.version to a valid version."
)
goto guessCH

:guessTV
rem need to auto determine TOMCAT_VER from DIR
rem Simplest way is to loop thru and keep the last
rem one as the "latest" (lex sorting)
set CURRENT_DIR=!cd!
cd /D !_REALPATH!
FOR /D %%X IN (tomcat-*) DO (set TOMCAT_VER2=%%X)
cd /D !CURRENT_DIR!
rem TOMCAT_VER2 now contains either tomcat-<whatever> or NUL
rem Now strip off the 'tomcat-' part
set TOMCAT_VER=!TOMCAT_VER2:tomcat-=!

:guessCH
rem Guess CATALINA_HOME if not defined
if not "!CATALINA_HOME!" == "" goto checkCH
set CURRENT_DIR=!cd!
set CATALINA_HOME=!_REALPATH!\tomcat-%TOMCAT_VER%
if not "!CATALINA_HOME!" == "" goto gotHome

:checkCH
if exist "!CATALINA_HOME!\bin\catalina.bat" goto okHome
cd /D !_REALPATH!
cd ..
set CATALINA_HOME=!cd!
cd /D !CURRENT_DIR!

:gotHome
if exist "!CATALINA_HOME!\bin\catalina.bat" goto okHome
echo ERROR The CATALINA_HOME environment variable is not defined correctly
echo ERROR This environment variable is needed to run this program
echo ERROR CATALINA_HOME is "!CATALINA_HOME!"
endlocal
rem set INSTANCE_BASE=
exit /b 1

:okHome
if "%JSSE_HOME%" == "" goto noJsse
set CLASSPATH=!CLASSPATH!;!JSSE_HOME!\lib\jcert.jar;!JSSE_HOME!\lib\jnet.jar;!JSSE_HOME!\lib\jsse.jar

:noJsse
set CLASSPATH=!CLASSPATH!;!CATALINA_HOME!\bin\bootstrap.jar

if not "!CATALINA_BASE!" == "" goto gotBase
set CATALINA_BASE=!CATALINA_HOME!

:gotBase
if not "!CATALINA_TMPDIR!" == "" goto gotTmpdir
set CATALINA_TMPDIR=!CATALINA_BASE!\temp

:gotTmpdir
set ARCH=win32
if EXIST "!CATALINA_BASE!\conf\wrapper.arch" (
    set /p ARCH=<"!CATALINA_BASE!\conf\wrapper.arch"
)

if not "%JRE_HOME%" == "" echo "WARNING: JRE_HOME environment variable has been set. This will override JAVA_HOME set by the instance configuration"
set JAVA_OPTS=

set tomcat_bin=!CATALINA_BASE!\bin\%ARCH%\wrapper.exe
set wrapper_conf=!CATALINA_BASE!\conf\wrapper.conf

set default_flags=

rem shift
if NOT "%action%" == "batch" (
  if NOT EXIST "%wrapper_conf%" (
      echo ERROR Server file "%wrapper_conf%" does not exist
      endlocal
      rem set INSTANCE_BASE=
      exit /b 1
  )
)

set wrapper_update0=%JAVA_OPTS% %CATALINA_OPTS%
set wrapper_update1=set.CATALINA_BASE=%CATALINA_BASE%
set wrapper_update2=set.CATALINA_HOME=%CATALINA_HOME%
set wrapper_update3=set.ARCH=%ARCH%
set wrapper_update4=
if not "%user%" == "" (
    set wrapper_update4=wrapper.ntservice.account=.\%user% wrapper.ntservice.password.prompt=TRUE
)

rem Generate a service name based on the location of the instance
set catbase=%CATALINA_BASE%
set catbase=%catbase:\=-%
set catbase=%catbase: =-%
set catbase=%catbase::=%
set wrapper_update6=set.wrapper.ntservice.id=tcruntime-%catbase%


set wrapper_update5=set.INSTANCE_NAME=%INSTANCE_NAME%



if /i "%action%" == "start" (
    echo Starting instance at %CATALINA_BASE%
    "%tomcat_bin%" -t "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "stop" (
    echo Stopping instance at %CATALINA_BASE%
    "%tomcat_bin%" -p "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6% wrapper.shutdown.timeout=%stop_timeout%

) else if /i "%action%" == "restart" (
    echo Restarting instance at %CATALINA_BASE%
    "%tomcat_bin%" -p "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6% wrapper.shutdown.timeout=%stop_timeout%
    "%tomcat_bin%" -t "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "install" (
    echo Installing instance at %CATALINA_BASE%
    "%tomcat_bin%" -i "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "uninstall" (
    echo Uninstalling instance at %CATALINA_BASE%
    "%tomcat_bin%" -r "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "reinstall" (
    echo Reinstalling instance at %CATALINA_BASE%
    "%tomcat_bin%" -r "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%
    "%tomcat_bin%" -i "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "run" (
    echo Running instance at %CATALINA_BASE%
    "%tomcat_bin%" -c "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "status" (
    echo Instance name:          %INSTANCE_NAME%
    echo Runtime version:        %TOMCAT_VER%
    echo tc Runtime Base:        %CATALINA_BASE%
    "%tomcat_bin%" -q "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "verbose-status" (
    echo Instance name:          %INSTANCE_NAME%
    echo Runtime version:        %TOMCAT_VER%
    echo tc Runtime Base:        !CATALINA_BASE!
    echo tc Runtime Home:        !CATALINA_HOME!
    echo tc Runtime Install dir: !_REALPATH!
    echo Instances directory:    !INSTANCE_BASE!
    echo Script directory:       !SCRIPT_PATH!
    echo Script version:         %TCRUNTIME_VER%
    echo Service Information:    %wrapper_update6%
    echo Windows architecture:   %ARCH%
    "%tomcat_bin%" -q "%wrapper_conf%" %wrapper_update0% "%wrapper_update1%" "%wrapper_update2%" "%wrapper_update3%" %wrapper_update4% %wrapper_update5% %wrapper_update6%

) else if /i "%action%" == "batch" (
    call "%CATALINA_HOME%\bin\catalina.bat" run

) else if /i "%action%" == "help" (
  set ret=0
  if NOT "%2" == "" (
    echo ERROR help command doesn't have arguments
    set ret=1
  )
  goto usage

) else (
    if not "%action%" == "" (
        echo WARN Command %action% was not recognized!
        echo.
    )
  :usage
  echo Usage from tc Runtime installation directory:
  echo   tcruntime-ctl.bat INSTANCE_NAME COMMAND [OPTIONS]
  echo.
  echo Usage from tc Runtime instance directory:
  echo   tcruntime-ctl.bat COMMAND [OPTIONS]
  echo.
  echo   COMMAND
  echo     install           - installs the instance as a Windows service,
  echo                         service name defined in wrapper.conf
  echo     uninstall         - uninstalls the Windows service for this instance
  echo     reinstall         - reinstalls the Windows service for this instance
  echo     start             - starts the Windows service for this instance
  echo     run               - starts an instance as a foreground process
  echo     stop [TIMEOUT]    - stops a running tc Runtime Windows service, forcing
  echo                         termination of the service if it does not exit
  echo                         gracefully within timeout seconds [default: 5 seconds]
  echo     restart [TIMEOUT] - restarts a running tc Runtime Windows service, forcing
  echo                         termination of the service if it does not exit
  echo                         gracefully within timeout seconds [default: 5 seconds]
  echo     batch             - runs an instance using the catalina.bat script as a batch job
  echo     status            - reports the status of a tc Runtime instance
  echo     verbose-status    - reports the status of a tc Runtime instance with more detail
  echo     help              - this output
  echo.
  echo   [OPTIONS]
  echo       -i ^<dir^>,       - Specifies the directory that contains the
  echo         -n ^<dir^>        instance. The default is the current working
  echo                         directory.
  echo       -d ^<dir^>        - The full path to the tc Runtime installation directory
  echo                         [default: location of this script]
  echo.
  echo.
  endlocal
  rem set INSTANCE_BASE=
  pause
  exit /b %_ret% 
)
endlocal & set _ret=%ERRORLEVEL%
rem set INSTANCE_BASE=
exit /b %_ret%
