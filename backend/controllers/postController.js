import Post from '../models/Post.js';

class PostController {
  constructor() {
    this.Post = Post;
  }

  // Get all posts
  async getAllPosts(request, reply) {
    try {
      const posts = await this.Post.find().sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  // Create a new post
  async createPost(request, reply) {
    try {
      const post = new this.Post(request.body);
      await post.save();
      return post;
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  // Get a single post by ID
  async getPostById(request, reply) {
    try {
      const post = await this.Post.findById(request.params.id);
      if (!post) {
        reply.code(404).send({ error: 'Post not found' });
        return;
      }
      return post;
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  // Like a post
  async likePost(request, reply) {
    try {
      const post = await this.Post.findByIdAndUpdate(
        request.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      );
      
      if (!post) {
        reply.code(404).send({ error: 'Post not found' });
        return;
      }
      return post;
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }

  // Unlike a post
  async unlikePost(request, reply) {
    try {
      const post = await this.Post.findByIdAndUpdate(
        request.params.id,
        { $inc: { likes: -1 } },
        { new: true }
      );
      
      if (!post) {
        reply.code(404).send({ error: 'Post not found' });
        return;
      }
      return post;
    } catch (error) {
      reply.code(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default new PostController(); 