import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' });
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
      setNewPost({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handlePostClick = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleLike = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/like`, {
        method: 'POST'
      });
      const updatedPost = await response.json();
      setPosts(posts.map(post => 
        post._id === id ? updatedPost : post
      ));
      if (selectedPost && selectedPost._id === id) {
        setSelectedPost(updatedPost);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/${id}/unlike`, {
        method: 'POST'
      });
      const updatedPost = await response.json();
      setPosts(posts.map(post => 
        post._id === id ? updatedPost : post
      ));
      if (selectedPost && selectedPost._id === id) {
        setSelectedPost(updatedPost);
      }
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>게시판</h1>
      </header>
      <main>
        <div className="post-form">
          <h2>새 게시글 작성</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="작성자"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            />
            <textarea
              placeholder="내용"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <button type="submit">작성</button>
          </form>
        </div>

        <div className="posts-list">
          <h2>게시글 목록</h2>
          {posts.map((post) => (
            <div key={post._id} className="post-item" onClick={() => handlePostClick(post._id)}>
              <h3>{post.title}</h3>
              <p>작성자: {post.author}</p>
              <p>작성일: {new Date(post.createdAt).toLocaleDateString()}</p>
              <div className="like-buttons">
                <button onClick={(e) => handleLike(e, post._id)}>👍 {post.likes}</button>
                <button onClick={(e) => handleUnlike(e, post._id)}>👎</button>
              </div>
            </div>
          ))}
        </div>

        {selectedPost && (
          <div className="post-detail">
            <h2>게시글 상세</h2>
            <h3>{selectedPost.title}</h3>
            <p>작성자: {selectedPost.author}</p>
            <p>작성일: {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
            <p>{selectedPost.content}</p>
            <div className="like-buttons">
              <button onClick={(e) => handleLike(e, selectedPost._id)}>👍 {selectedPost.likes}</button>
              <button onClick={(e) => handleUnlike(e, selectedPost._id)}>👎</button>
            </div>
            <button onClick={() => setSelectedPost(null)}>닫기</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 