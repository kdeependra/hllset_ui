# Start the Flask Backend API

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Backend API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location api

Write-Host "Starting Flask server on http://localhost:8000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

python app.py
