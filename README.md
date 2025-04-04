# Node.js Bulletin Board System (BBS) with Cursor AI

A modern bulletin board system built with Node.js, Fastify, and React.

## Features

- Create, read, update, and delete posts
- Like/unlike posts
- Real-time updates
- Modern UI with React
- RESTful API with Fastify
- MongoDB database
- Environment-based configuration
- Comprehensive test coverage

## Screenshots

![Main Page](docs/img.png)
![Post Detail](docs/img_1.png)

## Tech Stack

### Backend
- Node.js
- Fastify (Web Framework)
- MongoDB (Database)
- Mongoose (ODM)
- dotenv (Environment Variables)
- Jest (Testing Framework)

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/akageun/node_bbs_with_cursor.git
cd node_bbs
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

4. Create a `.env` file in the root directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/bbs
MONGODB_USER=root
MONGODB_PASSWORD=1234

# Server Configuration
PORT=3000
HOST=0.0.0.0

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

## Running the Application

### Development Mode

Run both backend and frontend concurrently:
```bash
npm run dev:full
```

Or run them separately:

Backend:
```bash
npm run dev
```

Frontend:
```bash
npm run client
```

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Start the backend:
```bash
npm start
```

## Testing

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Run tests with coverage report:
```bash
npm run test:coverage
```

### Test Coverage

The project includes comprehensive test coverage for the backend API endpoints:

- GET /api/posts
- POST /api/posts
- GET /api/posts/:id
- POST /api/posts/:id/like
- POST /api/posts/:id/unlike

Each endpoint is tested for:
- Successful responses
- Error handling
- Data validation
- Edge cases

## API Endpoints

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts/:id/like` - Like a post
- `POST /api/posts/:id/unlike` - Unlike a post

## Project Structure

```
node_bbs/
├── backend/
│   ├── controllers/
│   │   └── postController.js
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── postRoutes.js
│   ├── schemas/
│   │   └── postSchema.js
│   ├── test/
│   │   └── testServer.js
│   ├── __tests__/
│   │   └── post.test.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .env
├── .gitignore
├── jest.config.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Fastify team for the amazing web framework
- React team for the frontend library
- MongoDB team for the database
- Jest team for the testing framework

## Docker Support

### Running with Docker Compose

1. Build and start the application:
```bash
docker-compose up --build
```

2. Run tests:
```bash
docker-compose run --rm test
```

3. Stop the application:
```bash
docker-compose down
```

### Docker Commands

Build the application:
```bash
docker build -t node-bbs .
```

Run the application:
```bash
docker run -p 3000:3000 node-bbs
```

Run tests:
```bash
docker build -t node-bbs-test -f Dockerfile.test .
docker run node-bbs-test
```

## CI/CD

This project uses GitHub Actions for continuous integration. The CI pipeline includes:

- Running tests
- Code linting
- Test coverage reporting
- Docker build verification

The pipeline runs on:
- Push to main branch
- Pull requests to main branch

### CI Pipeline Steps

1. **Test Job**
   - Sets up Docker Buildx
   - Builds and runs tests in Docker container
   - Uploads test coverage report as artifact

2. **Lint Job**
   - Sets up Node.js environment
   - Installs dependencies
   - Runs ESLint