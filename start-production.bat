@echo off
title TazaaConnect - Production Preview Server
cd /d "%~dp0"

:: Add local portable Node.js to PATH
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

echo ========================================================
echo     Building & Running TazaaConnect (Production Mode)
echo ========================================================
echo.

call npm run build
echo.
echo Launching Production Preview at http://localhost:5173/ ...
call npm run preview -- --open --host 127.0.0.1 --port 5173
pause
