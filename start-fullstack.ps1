# AgriTech Full Stack Startup Script
# This script starts both backend and frontend servers

Write-Host "🌾 Starting AgriTech Full Stack Application..." -ForegroundColor Green
Write-Host ""

# Function to start backend
function Start-Backend {
    Write-Host "🔧 Starting Backend Server..." -ForegroundColor Yellow
    Set-Location -Path "backend"
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "node server.js" -WindowStyle Normal
    Set-Location -Path ".."
    Write-Host "✅ Backend server started on http://localhost:5001" -ForegroundColor Green
}

# Function to start frontend
function Start-Frontend {
    Write-Host "🎨 Starting Frontend Development Server..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3  # Wait for backend to initialize
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
    Write-Host "✅ Frontend server will start on http://localhost:5175 (or next available port)" -ForegroundColor Green
}

# Start both servers
Start-Backend
Start-Frontend

Write-Host ""
Write-Host "🚀 Both servers are starting up!" -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:5175" -ForegroundColor Cyan
Write-Host "🔧 Backend:  http://localhost:5001" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔐 Admin Login:" -ForegroundColor Yellow
Write-Host "   Email: eclefzy@gmail.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "👤 Demo User Login:" -ForegroundColor Yellow
Write-Host "   Email: demo@agritech.com" -ForegroundColor White
Write-Host "   Password: demo123" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
