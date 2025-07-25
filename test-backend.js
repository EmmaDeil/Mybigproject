// Simple test to check backend connectivity
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5001,
  path: '/api/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Backend is running! Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Backend is not running or not accessible:', error.message);
});

req.end();
