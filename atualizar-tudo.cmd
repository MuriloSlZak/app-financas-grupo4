@echo off
rem Atualiza tudo com dois cliques:
rem   1) publica o site no Firebase Hosting (publicar.ps1)
rem   2) salva as mudancas no GitHub (salvar-no-github.cmd)
cd /d "%~dp0"

echo ==========================================
echo  PASSO 1 de 2: publicar o site no Firebase
echo ==========================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0publicar.ps1"

echo.
echo ==========================================
echo  PASSO 2 de 2: salvar as mudancas no GitHub
echo ==========================================
call "%~dp0salvar-no-github.cmd" nopause

echo.
echo ==========================================
echo  FIM. Confira acima se os dois passos deram PRONTO.
echo ==========================================
pause
