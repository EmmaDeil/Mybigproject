# AgriTech Server Architecture

## How the Servers Work

### 🎨 **Frontend Server (Vite)**
- **Command**: `npm run dev`
- **Port**: http://localhost:5175 (or next available)
- **Purpose**: Serves the React application
- **Technology**: Vite development server
- **Files**: All files in `src/` directory

### 🔧 **Backend Server (Node.js)**
- **Command**: `cd backend && node server.js`
- **Port**: http://localhost:5001
- **Purpose**: API server, database connection, authentication
- **Technology**: Express.js + MongoDB
- **Files**: All files in `backend/` directory

## Why They're Separate

### ✅ **Correct Architecture:**
```
Frontend (React/Vite) ←→ API calls ←→ Backend (Express/Node) ←→ MongoDB
     Port 5175                           Port 5001
```

### ❌ **Not This:**
```
Both running together in one process
```

## Available Commands

### **Run Frontend Only:**
```bash
npm run dev
```

### **Run Backend Only:**
```bash
cd backend
node server.js
```

### **Run Both Together:**
```bash
# Option 1: Use the batch file
start-fullstack.bat

# Option 2: Manual (two separate terminals)
Terminal 1: cd backend && node server.js
Terminal 2: npm run dev

# Option 3: With concurrently (after installing)
npm install concurrently --save-dev
npm run fullstack
```

## What Each Does

### **Frontend (`npm run dev`):**
- Starts Vite development server
- Serves React application
- Hot module replacement (HMR)
- Only handles UI and client-side logic

### **Backend (`node server.js`):**
- Starts Express API server
- Connects to MongoDB Atlas
- Handles authentication (JWT)
- Manages database operations
- Provides REST API endpoints

## The Batch File Approach

The `start-fullstack.bat` file:
1. **Tests MongoDB connection** first
2. **Starts backend** in separate terminal window
3. **Waits 3 seconds** for backend to initialize
4. **Starts frontend** in separate terminal window
5. **Shows login credentials**

This way each server runs independently but they communicate via HTTP requests.

## Summary

- **`npm run dev`** = Frontend only (React/Vite)
- **`node server.js`** = Backend only (Express/MongoDB)
- **`start-fullstack.bat`** = Both, but in separate processes
- **They communicate via HTTP** on different ports
