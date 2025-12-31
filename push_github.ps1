# Script para fazer push automático no GitHub
# Este script será executado às 00:00 de 01/01/2026

$RepoPath = "c:\Users\pedro_odx2f7c\Downloads\Auroreal-main\Auroreal-main"
$LogFile = "$RepoPath\push_log.txt"

# Registra o início
Add-Content -Path $LogFile -Value "=== Push iniciado em $(Get-Date) ==="

try {
    Set-Location $RepoPath
    
    # Adiciona todas as alterações
    git add -A
    Add-Content -Path $LogFile -Value "git add: OK"
    
    # Faz o commit
    git commit -m "Remove promoção de fim de ano - 01/01/2026"
    Add-Content -Path $LogFile -Value "git commit: OK"
    
    # Faz o push (força o push para sobrescrever)
    git push -u origin main --force
    Add-Content -Path $LogFile -Value "git push: OK"
    
    Add-Content -Path $LogFile -Value "=== Push concluído com sucesso em $(Get-Date) ==="
}
catch {
    Add-Content -Path $LogFile -Value "ERRO: $_"
}

