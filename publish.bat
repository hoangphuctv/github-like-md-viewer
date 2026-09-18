@echo off
setlocal EnableExtensions

set "BUMP=patch"
if /i "%~1"=="major" set "BUMP=major"
if /i "%~1"=="minor" set "BUMP=minor"
if /i "%~1"=="patch" set "BUMP=patch"
if /i "%~1"=="help" goto :usage
if /i "%~1"=="-h" goto :usage
if /i "%~1"=="--help" goto :usage
if not "%~1"=="" (
  if /i not "%~1"=="major" if /i not "%~1"=="minor" if /i not "%~1"=="patch" (
    echo Unknown option: %~1
    echo.
    goto :usage
  )
)

cd /d "%~dp0"

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publish.ps1" -Bump %BUMP%
if errorlevel 1 (
  echo.
  echo Publish failed.
  exit /b 1
)

echo Done.
exit /b 0

:usage
echo.
echo Usage: publish.bat [patch^|minor^|major]
echo.
echo   patch  Bump patch version (default), e.g. 0.1.0 -^> 0.1.1
echo   minor  Bump minor version, e.g. 0.1.0 -^> 0.2.0
echo   major  Bump major version, e.g. 0.1.0 -^> 1.0.0
echo.
echo Creates dist\github-like-md-viewer-vX.Y.Z.zip for Chrome Web Store upload.
echo.
exit /b 1
