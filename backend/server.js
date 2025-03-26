import fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = fastify({
  logger: true
});

// CORS 설정
app.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
});

// MongoDB 연결
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const options = {
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose.connect(uri, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// 라우트 등록
app.register(postRoutes);

// 서버 시작
const start = async () => {
  try {
    await connectDB();
    await app.listen({
      port: parseInt(process.env.PORT) || 3000,
      host: process.env.HOST || '0.0.0.0'
    });
    console.log('Server is running on port 3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start(); 