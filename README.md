# Todo Backend API

A robust RESTful API for a Todo List application built with Node.js, Express, TypeScript, and PostgreSQL. This backend provides secure user authentication, CRUD operations for todos, and follows best practices for modern web development.

## 🚀 Features

- 🔐 JWT-based authentication
- 📝 CRUD operations for todos
- 👤 User management
- 🔍 Input validation using Zod
- 📊 PostgreSQL database with TypeORM
- 📝 API documentation with Swagger
- 🎯 TypeScript for type safety
- 📈 Structured logging with Pino
- 🐳 Docker support
- 🧪 Jest testing setup

## 🛠️ Tech Stack

- **Runtime:** Node.js 20
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT
- **Validation:** Zod
- **Logging:** Pino
- **Documentation:** Swagger
- **Testing:** Jest
- **Containerization:** Docker

## 📋 Prerequisites

- Node.js 20 or higher
- Docker and Docker Compose
- PostgreSQL (if running locally)

## 🚀 Getting Started

### Using Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-backend
   ```

2. Start the application:
   ```bash
   docker compose up
   ```

The application will be available at `http://localhost:3000`

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tododb
   JWT_SECRET=your-super-secret-key
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## 📚 API Documentation

Once the server is running, you can access the Swagger documentation at:
```
http://localhost:3000/api-docs
```

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📝 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the TypeScript code
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment (development/production) | development |
| DATABASE_URL | PostgreSQL connection string | - |
| JWT_SECRET | Secret key for JWT | - |

## 📦 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── types/          # TypeScript types
└── utils/          # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- TypeORM team for the excellent ORM
- All contributors who have helped shape this project 