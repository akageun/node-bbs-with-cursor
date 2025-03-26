class PostSchema {
  constructor() {
    this.schema = {
      getAllPosts: {
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                title: { type: 'string' },
                content: { type: 'string' },
                author: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                likes: { type: 'number' }
              }
            }
          }
        }
      },

      createPost: {
        body: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            author: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              author: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              likes: { type: 'number' }
            }
          }
        }
      },

      getPostById: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              author: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              likes: { type: 'number' }
            }
          }
        }
      },

      likePost: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              author: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              likes: { type: 'number' }
            }
          }
        }
      },

      unlikePost: {
        params: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              author: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
              likes: { type: 'number' }
            }
          }
        }
      }
    };
  }

  static getInstance() {
    if (!PostSchema.instance) {
      PostSchema.instance = new PostSchema();
    }
    return PostSchema.instance;
  }

  getSchema() {
    return this.schema;
  }
}

export default PostSchema.getInstance().getSchema(); 