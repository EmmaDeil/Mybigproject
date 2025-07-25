const { spawn } = require('child_process');
const path = require('path');

console.log('🌾 Starting AgriTech Full Stack Application...\n');

// Use concurrently to run both servers
const concurrently = spawn('npx', [
  'concurrently',
  '--kill-others-on-fail',
  '--prefix', 'name',
  '--names', 'BACKEND,FRONTEND',
  '--prefix-colors', 'yellow,cyan',
  '"cd backend && node server.js"',
  '"vite"'
], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

concurrently.on('error', (err) => {
  console.error('❌ Error starting servers:', err.message);
  console.log('\n💡 Try installing concurrently first:');
  console.log('   npm install concurrently --save-dev');
});

concurrently.on('close', (code) => {
  console.log(`\n🛑 Servers stopped with code ${code}`);
});

// Display information
setTimeout(() => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Both servers should be running now!');
  console.log('📱 Frontend: http://localhost:5175 (or next available port)');
  console.log('🔧 Backend:  http://localhost:5001');
  console.log('\n🔐 Admin Login: eclefzy@gmail.com / admin123');
  console.log('👤 Demo Login: demo@agritech.com / demo123');
  console.log('\n💡 Press Ctrl+C to stop both servers');
  console.log('='.repeat(60));
}, 3000);

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down both servers...');
  concurrently.kill();
  process.exit(0);
});
