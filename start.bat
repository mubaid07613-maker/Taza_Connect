@echo off
title TazaaConnect - Local Dev Server
cd /d "%~dp0"

:: Add local portable Node.js to PATH
set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

echo ========================================================
echo        Starting TazaaConnect Hackathon Platform
echo ========================================================
echo.
echo Launching local server at http://localhost:5173/ ...
echo Your default web browser will open automatically.
echo.
echo (To stop the server, press Ctrl+C or close this window)
echo ========================================================
echo.

:: Launch Vite with automatic browser opening
call npm run dev -- --open --host 127.0.0.1 --port 5173
pause
