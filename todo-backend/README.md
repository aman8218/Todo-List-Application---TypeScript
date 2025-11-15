# Todo List Application - Backend

A robust RESTful API built with Node.js, Express, TypeScript, and MongoDB for managing todos with user authentication.

## 🚀 Features

- **User Authentication**
  - User registration (signup)
  - User login (signin) with JWT tokens
  - Password reset via email
  - Protected routes with JWT middleware

- **Todo Management**
  - Create new todos
  - Read all todos for authenticated user
  - Read single todo by ID
  - Update todo details
  - Delete todos
  - Toggle todo completion status

- **Error Handling & Logging**
  - Centralized error handling middleware
  - All errors logged to MongoDB for debugging
  - Proper HTTP status codes and error messages

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier)
- Gmail account for email functionality (optional for password reset)

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Email**: Nodemailer
- **Validation**: Zod
- **Development**: ts-node-dev

## 📦 Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd todo-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

4. **MongoDB Atlas Setup**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account and cluster
   - Get your connection string
   - Replace `<password>` with your database user password
   - Add your IP address to the whitelist (or use 0.0.0.0/0 for development)

5. **Gmail App Password Setup (for password reset feature)**
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an App Password for "Mail"
   - Use this app password in the `EMAIL_PASS` field

## 🚀 Running the Application

**Development mode** (with hot reload):
```bash
npm run dev
```

**Production build**:
```bash
npm run build
npm start
```

**Run tests**:
```bash
npm test
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/signin` | Login user | No |
| POST | `/api/auth/forgot-password` | Request password reset | No |
| PUT | `/api/auth/reset-password/:resetToken` | Reset password with token | No |
| GET | `/api/auth/me` | Get current user info | Yes |

### Todo Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/todos` | Get all todos for user | Yes |
| GET | `/api/todos/:id` | Get single todo | Yes |
| POST | `/api/todos` | Create new todo | Yes |
| PUT | `/api/todos/:id` | Update todo | Yes |
| DELETE | `/api/todos/:id` | Delete todo | Yes |
| PATCH | `/api/todos/:id/toggle` | Toggle completion status | Yes |

### Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Check server status | No |

## 📝 API Request Examples

### Sign Up
```json
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Sign In
```json
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Todo
```json
POST /api/todos
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
```

### Update Todo
```json
PUT /api/todos/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

## 🗂️ Project Structure
```
src/
├── config/
│   └── database.ts          # MongoDB connection
├── models/
│   ├── User.ts              # User model with password hashing
│   ├── Todo.ts              # Todo model
│   └── ErrorLog.ts          # Error logging model
├── middleware/
│   ├── auth.ts              # JWT authentication middleware
│   └── errorHandler.ts      # Global error handler
├── routes/
│   ├── auth.routes.ts       # Authentication routes
│   └── todo.routes.ts       # Todo CRUD routes
├── controllers/
│   ├── auth.controller.ts   # Auth logic
│   └── todo.controller.ts   # Todo logic
├── utils/
│   ├── logger.ts            # Error logging utility
│   └── email.ts             # Email sending utility
└── server.ts                # App entry point
```

## 🔒 Security Features

- Passwords hashed using bcryptjs (10 salt rounds)
- JWT tokens for stateless authentication
- Protected routes with authentication middleware
- Password reset tokens expire after 10 minutes
- CORS enabled for frontend communication
- Input validation on all routes

## 🐛 Error Logging

All backend errors are automatically logged to MongoDB in the `errorlogs` collection with the following information:
- Error message and stack trace
- HTTP status code
- Request method and URL
- User ID (if authenticated)
- Timestamp

## 🧪 Testing

The project includes a comprehensive test suite that covers:
- Health check endpoint
- User signup and signin
- Invalid credentials handling
- Password reset flow
- All CRUD operations for todos
- Todo completion toggling
- Unauthorized access rejection

Run tests with:
```bash
npm test
```

## 📄 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port number | No (default: 5000) |
| MONGODB_URI | MongoDB connection string | Yes |
| JWT_SECRET | Secret key for JWT signing | Yes |
| JWT_EXPIRE | JWT expiration time | No (default: 7d) |
| EMAIL_HOST | SMTP host for emails | Yes* |
| EMAIL_PORT | SMTP port | Yes* |
| EMAIL_USER | Email account username | Yes* |
| EMAIL_PASS | Email account password | Yes* |
| FRONTEND_URL | Frontend URL for CORS | Yes |

*Required only if password reset feature is needed

## 🚧 Known Limitations

- Email functionality requires Gmail configuration (or any SMTP service)
- Password reset tokens are valid for 10 minutes only
- JWT tokens don't have refresh token mechanism (tokens expire after 7 days)

## 🔮 Future Enhancements

- Add refresh token mechanism
- Implement rate limiting
- Add todo categories/tags
- Add todo priority levels
- Add due dates for todos
- Add file attachments to todos
- Implement real-time updates with WebSockets

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

## 📜 License

This project is created as part of an internship assignment.

---

**Author**: Aman
**Last Updated**: 15 November 2025