# Start the React Frontend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Frontend Dev Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location web

Write-Host "Starting Vite dev server on http://localhost:3000" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

npm run dev
