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

## Tech Stack

### Backend
- Node.js
- Fastify (Web Framework)
- MongoDB (Database)
- Mongoose (ODM)
- dotenv (Environment Variables)

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
git clone https://github.com/yourusername/node_bbs.git
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
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .env
├── .gitignore
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