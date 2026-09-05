Set-Location $PSScriptRoot
Start-Transcript -Path (Join-Path $PSScriptRoot 'publicar.log') -Force | Out-Null
try {
  Write-Host '=== 1/4 Instalando dependencias do projeto (npm install) ==='
  npm install
  if ($LASTEXITCODE -ne 0) { throw 'npm install falhou' }

  Write-Host '=== 2/4 Instalando o Firebase CLI (so na primeira vez) ==='
  if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
    npm install -g firebase-tools
    if ($LASTEXITCODE -ne 0) { throw 'instalacao do firebase-tools falhou' }
  } else {
    Write-Host 'Firebase CLI ja instalado.'
  }

  Write-Host '=== 3/4 Login no Firebase (vai abrir o navegador; escolha a conta do projeto e permita) ==='
  firebase login
  if ($LASTEXITCODE -ne 0) { throw 'firebase login falhou' }

  Write-Host '=== 4/4 Exportando o site e publicando no Firebase Hosting ==='
  npm run deploy
  if ($LASTEXITCODE -ne 0) { throw 'deploy falhou' }

  Write-Host ''
  Write-Host 'PRONTO! Site publicado em https://grupofourappfinancas.web.app'
} catch {
  Write-Host ''
  Write-Host "ERRO: $_"
  Write-Host 'Manda um print desta janela (ou o arquivo publicar.log) pro Claude.'
} finally {
  Stop-Transcript | Out-Null
}
