import { test, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { buildTestServer, closeTestServer } from '../test/testServer.js';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';

let app;
let testPost;

beforeAll(async () => {
  app = await buildTestServer();
});

afterAll(async () => {
  await closeTestServer(app);
});

beforeEach(async () => {
  // 각 테스트 전에 데이터베이스 초기화
  await mongoose.connection.collection('posts').deleteMany({});
  
  // 테스트용 게시물 생성
  testPost = await Post.create({
    title: 'Test Post',
    content: 'This is a test post content',
    author: 'Test Author'
  });
});

test('GET /api/posts should return all posts', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/api/posts'
  });

  expect(response.statusCode).toBe(200);
  const posts = JSON.parse(response.payload);
  expect(Array.isArray(posts)).toBe(true);
  expect(posts.length).toBe(1);
  expect(posts[0].title).toBe('Test Post');
});

test('POST /api/posts should create a new post', async () => {
  const newPost = {
    title: 'New Test Post',
    content: 'This is a new test post content',
    author: 'New Test Author'
  };

  const response = await app.inject({
    method: 'POST',
    url: '/api/posts',
    payload: newPost
  });

  expect(response.statusCode).toBe(201);
  const createdPost = JSON.parse(response.payload);
  expect(createdPost.title).toBe(newPost.title);
  expect(createdPost.content).toBe(newPost.content);
  expect(createdPost.author).toBe(newPost.author);
  expect(createdPost.likes).toBe(0);
});

test('GET /api/posts/:id should return a single post', async () => {
  const response = await app.inject({
    method: 'GET',
    url: `/api/posts/${testPost._id}`
  });

  expect(response.statusCode).toBe(200);
  const post = JSON.parse(response.payload);
  expect(post._id).toBe(testPost._id.toString());
});

test('POST /api/posts/:id/like should increment likes', async () => {
  const response = await app.inject({
    method: 'POST',
    url: `/api/posts/${testPost._id}/like`
  });

  expect(response.statusCode).toBe(200);
  const updatedPost = JSON.parse(response.payload);
  expect(updatedPost.likes).toBe(1);
});

test('POST /api/posts/:id/unlike should decrement likes', async () => {
  // 먼저 좋아요를 추가
  await Post.findByIdAndUpdate(testPost._id, { $inc: { likes: 1 } });

  const response = await app.inject({
    method: 'POST',
    url: `/api/posts/${testPost._id}/unlike`
  });

  expect(response.statusCode).toBe(200);
  const updatedPost = JSON.parse(response.payload);
  expect(updatedPost.likes).toBe(0);
});

test('POST /api/posts/:id/unlike should not go below 0', async () => {
  const response = await app.inject({
    method: 'POST',
    url: `/api/posts/${testPost._id}/unlike`
  });

  expect(response.statusCode).toBe(200);
  const updatedPost = JSON.parse(response.payload);
  expect(updatedPost.likes).toBe(0);
}); 