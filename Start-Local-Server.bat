@echo off
title YCC Charitable Trust - Local Web Server
echo Starting YCC Charitable Trust Website on http://localhost:3000/ ...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
