@echo off
rem Publica o site no Firebase Hosting com dois cliques.
rem Roda: npm install -> instala Firebase CLI (se faltar) -> firebase login -> npm run deploy
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publicar.ps1"
pause
