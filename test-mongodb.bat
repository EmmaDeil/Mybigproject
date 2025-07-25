@echo off
title MongoDB Connection Test
color 0B

echo.
echo ========================================
echo    🔍 MongoDB Connection Test
echo ========================================
echo.

cd backend
node test-mongodb.js

echo.
echo Press any key to continue...
pause >nul
