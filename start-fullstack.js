#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🌾 Starting AgriTech Full Stack Application...\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Start backend server
function startBackend() {
  log('🔧 Starting Backend Server...', colors.yellow);
  
  const backend = spawn('node', ['server.js'], {
    cwd: path.join(__dirname, 'backend'),
    stdio: 'inherit',
    shell: true
  });

  backend.on('error', (err) => {
    log(`❌ Backend Error: ${err.message}`, colors.red);
  });

  backend.on('close', (code) => {
    log(`Backend process exited with code ${code}`, colors.red);
  });

  return backend;
}

// Start frontend server
function startFrontend() {
  log('🎨 Starting Frontend Development Server...', colors.yellow);
  
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  frontend.on('error', (err) => {
    log(`❌ Frontend Error: ${err.message}`, colors.red);
  });

  frontend.on('close', (code) => {
    log(`Frontend process exited with code ${code}`, colors.red);
  });

  return frontend;
}

// Start both servers
const backendProcess = startBackend();

// Wait a bit for backend to start, then start frontend
setTimeout(() => {
  const frontendProcess = startFrontend();
  
  // Display information after both are starting
  setTimeout(() => {
    console.log('\n' + '='.repeat(50));
    log('🚀 Both servers are running!', colors.green);
    log('📱 Frontend: http://localhost:5175', colors.cyan);
    log('🔧 Backend:  http://localhost:5001', colors.cyan);
    console.log('\n' + colors.yellow + '🔐 Admin Login:' + colors.reset);
    console.log('   Email: eclefzy@gmail.com');
    console.log('   Password: admin123');
    console.log('\n' + colors.yellow + '👤 Demo User Login:' + colors.reset);
    console.log('   Email: demo@agritech.com');
    console.log('   Password: demo123');
    console.log('\n' + '='.repeat(50));
  }, 2000);

  // Handle process termination
  process.on('SIGINT', () => {
    log('\n🛑 Shutting down servers...', colors.yellow);
    backendProcess.kill();
    frontendProcess.kill();
    process.exit(0);
  });

}, 3000);

// Keep the process alive
process.stdin.resume();
