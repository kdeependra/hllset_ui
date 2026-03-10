# Start both Backend and Frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Full Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; .\start-backend.ps1"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; .\start-frontend.ps1"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Application Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Close the PowerShell windows to stop the servers" -ForegroundColor Yellow
