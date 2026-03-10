# HLLSet & Fractal Manifold UI - Quick Start Guide

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "HLLSet & Fractal Manifold UI - Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Node.js is not installed. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if Python is installed
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "[OK] $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Python is not installed. Please install Python 3.8+ from https://python.org" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
Write-Host ""

# Install frontend dependencies
Write-Host "1. Installing frontend dependencies..." -ForegroundColor Cyan
Set-Location web
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Frontend dependencies installed" -ForegroundColor Green
Set-Location ..

Write-Host ""

# Install backend dependencies
Write-Host "2. Installing backend dependencies..." -ForegroundColor Cyan
Set-Location api
pip install -r requirements.txt
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "[OK] Backend dependencies installed" -ForegroundColor Green
Set-Location ..

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host "  1. Run: .\start-backend.ps1" -ForegroundColor White
Write-Host "  2. In another terminal, run: .\start-frontend.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Or run both at once with: .\start-all.ps1" -ForegroundColor White
Write-Host ""
