@echo off
title Push YCC Trust Code to GitHub (https://github.com/lokeshsugandham/ycc-trust)
echo =========================================================================
echo Pushing YCC Charitable Trust Code to GitHub...
echo Repository: https://github.com/lokeshsugandham/ycc-trust.git
echo =========================================================================

cd /d "%~dp0"

git init
git add .
git commit -m "Initial commit - Complete YCC Charitable Trust Web Application"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/lokeshsugandham/ycc-trust.git
git push -u origin main

echo =========================================================================
echo Done! Please check your repository at: https://github.com/lokeshsugandham/ycc-trust
echo =========================================================================
pause
