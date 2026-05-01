# QuickShare

A premium PIN-based secure file and text sharing platform built with the MERN stack (MongoDB, Express, React, Node) and styled with a dark glassmorphism aesthetic using Tailwind CSS & Framer Motion.

## Features
- **No Login Required**: Just upload and share instantly.
- **Auto-Expiring**: Data automatically deletes after 10 minutes or right after the first download.
- **Premium UI**: Dark mode, glassmorphism design with Framer Motion animations.
- **Secure**: 6-digit PIN system for end-to-end feel.

## Tech Stack
- Frontend: Vite (React), Tailwind CSS, Framer Motion, Axios, Lucide Icons.
- Backend: Node.js, Express, Multer, Mongoose, UUID.
- Database: MongoDB.

## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or Atlas)

### Setup Instructions

1. **Clone the Repository**
2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with PORT=5000 and MONGO_URI
   npm start
   ```
3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Environment Variables
**backend/.env**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/quickshare
FRONTEND_URL=http://localhost:5173
```

**client/.env**
```env
VITE_API_URL=http://localhost:5000/api
```

## Deployment
- **Frontend** can be easily deployed to Vercel/Netlify.
- **Backend** can be deployed to Render/Heroku.
- Ensure CORS in the backend allows your production frontend URL.
