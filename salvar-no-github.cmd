@echo off
rem Salva as mudancas do projeto no GitHub (branch main) e apaga a branch gh-pages
rem (antiga publicacao pelo GitHub Pages). O site continua no ar so pelo Firebase Hosting.
rem Se existir um arquivo mensagem-commit.txt na pasta, ele vira a mensagem do commit.
cd /d "%~dp0"

echo === 1/3 Registrando as mudancas (commit) ===
set GITNAME=
for /f "delims=" %%n in ('git config user.name') do set GITNAME=%%n
if "%GITNAME%"=="" (
  git config user.name "MuriloSlZak"
  git config user.email "MuriloSlZak@users.noreply.github.com"
)
git add -A
if exist "mensagem-commit.txt" (
  git commit -F "mensagem-commit.txt"
  if not errorlevel 1 del "mensagem-commit.txt"
) else (
  git commit -m "Atualizacao do app - %DATE% %TIME%" -m "Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
)
if errorlevel 1 echo (nada novo para registrar ou commit falhou - veja acima)

echo.
echo === 2/3 Enviando para o GitHub (branch main) ===
git push origin main
if errorlevel 1 goto :erro

echo.
echo === 3/3 Apagando a branch gh-pages (antiga publicacao pelo GitHub) ===
git push origin --delete gh-pages
if errorlevel 1 echo (branch gh-pages ja nao existia ou nao pode ser apagada - tudo bem)

echo.
echo PRONTO! Mudancas salvas no GitHub.
if "%~1"=="nopause" exit /b 0
pause
exit /b 0

:erro
echo.
echo ERRO ao enviar para o GitHub (veja acima). Se pediu login, faca o login e rode de novo.
if "%~1"=="nopause" exit /b 1
pause
exit /b 1
