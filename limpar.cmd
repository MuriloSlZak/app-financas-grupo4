@echo off
rem Apaga arquivos que o app NAO usa: logs, pastas geradas e sobras do modelo padrao do Expo.
rem Pode rodar quantas vezes quiser. Nada aqui afeta o site nem o codigo do app.
rem No final, registra a limpeza no GitHub (chama salvar-no-github.cmd).
cd /d "%~dp0"

echo === 1/4 Apagando logs ===
del /q publicar.log firebase-debug.log ui-debug.log 2>nul

echo === 2/4 Apagando pastas geradas (voltam sozinhas quando voce publica) ===
if exist dist rmdir /s /q dist
if exist .expo rmdir /s /q .expo
if exist .firebase rmdir /s /q .firebase

echo === 3/4 Apagando sobras do modelo padrao do Expo ===
if exist scripts rmdir /s /q scripts
del /q "src\components\external-link.tsx" 2>nul
del /q "src\components\hint-row.tsx" 2>nul
del /q "src\components\web-badge.tsx" 2>nul
if exist "src\components\ui" rmdir /s /q "src\components\ui"
del /q "assets\images\react-logo.png" 2>nul
del /q "assets\images\react-logo@2x.png" 2>nul
del /q "assets\images\react-logo@3x.png" 2>nul
del /q "assets\images\tutorial-web.png" 2>nul
del /q "assets\images\expo-badge.png" 2>nul
del /q "assets\images\expo-badge-white.png" 2>nul
del /q "assets\images\android-icon-background.png" 2>nul
del /q "assets\images\android-icon-monochrome.png" 2>nul
if exist "assets\expo.icon" rmdir /s /q "assets\expo.icon"

echo === 4/4 Registrando a limpeza no GitHub ===
> "mensagem-commit.txt" echo Remove arquivos nao usados (logs, sobras do modelo Expo e script reset-project)
>> "mensagem-commit.txt" echo.
>> "mensagem-commit.txt" echo Co-Authored-By: Claude Fable 5.1 ^<noreply@anthropic.com^>
call "%~dp0salvar-no-github.cmd" nopause

echo.
echo PRONTO! Limpeza feita e registrada no GitHub.
pause
