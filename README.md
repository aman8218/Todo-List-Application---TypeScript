# Todo List Application - Full Stack

A modern, full-stack todo list application built with React, TypeScript, Node.js, Express, and MongoDB. Features include user authentication, CRUD operations for todos, password reset functionality, and a beautiful responsive UI.

## 🎥 Demo Video

[**Watch Demo Video**](YOUR_GOOGLE_DRIVE_LINK_HERE)

> **Note**: Replace `YOUR_GOOGLE_DRIVE_LINK_HERE` with your actual Google Drive video link

## 📸 Screenshots

### Desktop View
![Dashboard](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)

### Mobile View
![Mobile](https://via.placeholder.com/400x800?text=Mobile+Screenshot)

> **Note**: Replace placeholder images with your actual screenshots

## ✨ Features

### User Management
- ✅ User Registration (Signup)
- ✅ User Login (Signin) with JWT Authentication
- ✅ Forgot/Reset Password via Email
- ✅ Secure Password Hashing
- ✅ Protected Routes

### Todo Management
- ✅ Create Todo
- ✅ Read/List All Todos
- ✅ Update Todo
- ✅ Delete Todo with Confirmation
- ✅ Mark Todo as Completed/Incomplete
- ✅ Filter Todos (All, Active, Completed)
- ✅ Todo Statistics Dashboard

### Technical Features
- ✅ Full TypeScript Implementation (No JavaScript files)
- ✅ Error Logging to MongoDB
- ✅ JWT Token Authentication
- ✅ Form Validation with Zod
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Beautiful Toast Notifications
- ✅ Loading States & Error Handling
- ✅ Custom Confirmation Modals

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v6
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query v5
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Email Service**: Nodemailer
- **Validation**: Zod
- **Development**: ts-node-dev

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- MongoDB Atlas Account (free tier)
- Gmail Account (for password reset emails)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd todo-app
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd todo-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# PORT=5000
# MONGODB_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=your_super_secret_jwt_key
# JWT_EXPIRE=7d
# EMAIL_HOST=smtp.gmail.com
# EMAIL_PORT=587
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_gmail_app_password
# FRONTEND_URL=http://localhost:5173

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend folder (from root)
cd todo-frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start frontend server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
todo-app/
├── todo-backend/           # Backend API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # Mongoose models
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── server.ts      # Entry point
│   ├── test-api.ts        # API testing script
│   ├── package.json
│   └── tsconfig.json
│
└── todo-frontend/         # Frontend React App
    ├── src/
    │   ├── api/          # API integration
    │   ├── components/   # React components
    │   ├── hooks/        # Custom hooks
    │   ├── pages/        # Page components
    │   ├── schemas/      # Zod validation schemas
    │   ├── store/        # Zustand store
    │   ├── types/        # TypeScript types
    │   ├── utils/        # Utility functions
    │   ├── App.tsx       # Main App component
    │   └── main.tsx      # Entry point
    ├── package.json
    └── vite.config.ts
```

## 🔧 Configuration Guide

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Replace `<password>` with your database user password
7. Add connection string to backend `.env` file

### Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Other (Custom name)"
5. Generate password
6. Copy the 16-character password
7. Add to backend `.env` as `EMAIL_PASS`

## 🧪 Testing

### Backend API Testing

```bash
# Navigate to backend folder
cd todo-backend

# Run automated tests
npm test

# This will test:
# - Health check
# - User signup/signin
# - Password reset
# - All todo CRUD operations
# - Authentication & authorization
```

### Manual Testing Checklist

- [ ] User can sign up with valid credentials
- [ ] User can sign in with correct credentials
- [ ] User receives password reset email
- [ ] User can reset password using token
- [ ] User can create a new todo
- [ ] User can view all todos
- [ ] User can edit a todo
- [ ] User can delete a todo
- [ ] User can mark todo as complete/incomplete
- [ ] User can filter todos (all/active/completed)
- [ ] Responsive design works on mobile
- [ ] Error messages display correctly
- [ ] Loading states work properly

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:

- 📱 **Mobile** (320px - 767px)
- 📱 **Tablet** (768px - 1023px)
- 💻 **Desktop** (1024px and above)

## 🔐 Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- HTTP-only cookies support (optional)
- Protected API routes
- Password reset tokens expire after 10 minutes
- Input validation on both frontend and backend
- CORS configuration
- SQL injection prevention with Mongoose
- XSS protection

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Login user |
| POST | `/api/auth/forgot-password` | Request password reset |
| PUT | `/api/auth/reset-password/:token` | Reset password |
| GET | `/api/auth/me` | Get current user |

### Todos
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completion |

## 🎨 UI Features

- Modern gradient backgrounds
- Smooth animations and transitions
- Beautiful card designs
- Toast notifications
- Custom confirmation modals
- Loading spinners
- Empty states
- Hover effects
- Focus states for accessibility

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```bash
# Check your MONGODB_URI in .env
# Ensure IP is whitelisted in MongoDB Atlas
# Verify database user credentials
```

**Email Not Sending**
```bash
# Verify EMAIL_USER and EMAIL_PASS in .env
# Check Gmail App Password is correct
# Enable "Less secure app access" if needed
```

### Frontend Issues

**White Screen**
```bash
# Ensure backend is running on port 5000
# Check VITE_API_URL in .env
# Clear browser cache
# Check browser console for errors
```

**Styles Not Loading**
```bash
# Delete node_modules and package-lock.json
# Run npm install again
# Restart dev server
```

## 📝 Assumptions Made

1. Users have access to Gmail for password reset functionality
2. MongoDB Atlas free tier is sufficient for the application
3. Application runs in development mode on localhost
4. Users have modern browsers with JavaScript enabled
5. Internet connection is available for API calls
6. Node.js v18+ is installed on the system

## 🚀 Deployment

### Backend Deployment (Railway/Render)

1. Push code to GitHub
2. Connect your Railway/Render account
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect your Vercel/Netlify account
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_URL`
6. Deploy

## 🔮 Future Enhancements

- [ ] Dark mode toggle
- [ ] Todo categories and tags
- [ ] Priority levels for todos
- [ ] Due dates and reminders
- [ ] Search functionality
- [ ] Drag and drop reordering
- [ ] Todo sharing between users
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Real-time updates with WebSockets
- [ ] Todo templates
- [ ] Recurring todos
- [ ] File attachments

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@aman8218](https://github.com/aman8218/)
- Email: ak5654707@gmail.com
- LinkedIn: [Aman821](https://www.linkedin.com/in/aman821)

## 📄 License

This project was created as part of an internship assignment.

## 🙏 Acknowledgments

- Thanks to the team for providing this opportunity
- React and Node.js communities for excellent documentation
- All open-source libraries used in this project

---

**⭐ If you found this project helpful, please give it a star!**

**📧 For any questions or issues, please open an issue on GitHub.**

**Last Updated**: November 2025