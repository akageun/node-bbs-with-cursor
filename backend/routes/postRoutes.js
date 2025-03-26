import postController from '../controllers/postController.js';
import postSchema from '../schemas/postSchema.js';

class PostRoutes {
  constructor() {
    this.controller = postController;
    this.schema = postSchema;
  }

  async register(fastify) {
    // Get all posts
    fastify.get('/api/posts', {
      schema: this.schema.getAllPosts
    }, this.controller.getAllPosts.bind(this.controller));

    // Create a new post
    fastify.post('/api/posts', {
      schema: this.schema.createPost
    }, this.controller.createPost.bind(this.controller));

    // Get a single post
    fastify.get('/api/posts/:id', {
      schema: this.schema.getPostById
    }, this.controller.getPostById.bind(this.controller));

    // Like a post
    fastify.post('/api/posts/:id/like', {
      schema: this.schema.likePost
    }, this.controller.likePost.bind(this.controller));

    // Unlike a post
    fastify.post('/api/posts/:id/unlike', {
      schema: this.schema.unlikePost
    }, this.controller.unlikePost.bind(this.controller));
  }
}

export default async function postRoutes(fastify) {
  const routes = new PostRoutes();
  await routes.register(fastify);
} 