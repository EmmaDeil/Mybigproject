# AgriTech Login Instructions

## Backend Status
The backend server is currently not running, but the application has been configured with fallback authentication to allow testing.

## Available Login Credentials

### Admin Accounts (Full Admin Access)
1. **Primary Admin**
   - **Email**: eclefzy@gmail.com
   - **Password**: admin123

2. **System Admin** 
   - **Email**: admin@agritech.com
   - **Password**: password

### Customer Accounts
1. **Demo User**
   - **Email**: demo@agritech.com
   - **Password**: demo123

2. **Test User**
   - **Email**: test@test.com
   - **Password**: test123

## Features Available in Offline Mode
1. **Admin Dashboard**: Full admin functionality including order management and farmer coordination
2. **Product Browsing**: View all 24 products with detailed information
3. **Shopping Cart**: Add products to cart and simulate ordering
4. **User Authentication**: Login/Register with fallback system

## To Start Backend Server (Optional)
If you want to use the full backend functionality:

1. **Easy Method**: Double-click `start-fullstack.bat` 
2. **Manual Method**: 
   - Open terminal: `cd backend`
   - Start server: `node server.js`
3. **npm Method**: `npm install concurrently --save-dev` then `npm run start`

## Current Frontend URL
The frontend is running on: http://localhost:5175

## Notes
- The application will automatically detect if the backend is available
- If backend is unavailable, it will use offline/fallback mode
- All admin functions work in offline mode with localStorage persistence
- The specialized AdminNavbar is now active for admin users
