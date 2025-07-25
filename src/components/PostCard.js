import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="post-card hover-card">
      <img src={post.thumbnail} alt="thumbnail" className="card-thumb" />
      <h2>{post.title}</h2>
      <p className="post-meta">{post.date} • {post.type}</p>
      <p className="post-summary">{post.subject}</p>
    </Link>
  );
}

export default PostCard;