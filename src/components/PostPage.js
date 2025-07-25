import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import posts from '../data/posts.json';

function PostPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <div className="container">Post not found.</div>;

  const renderContentWithMedia = (content) => {
  const lines = content.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // PDF block
    if (line.startsWith('[[pdf:') && line.endsWith(']]')) {
      const pdfPath = line.slice(6, -2).trim();
      elements.push(
        <div key={`pdf-${i}`} className="pdf-wrapper">
          <iframe
            src={pdfPath}
            title="PDF Document"
            className="post-pdf-viewer"
            frameBorder="0"
          />
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-download"
          >
            Open in new tab ↗
          </a>
        </div>
      );
      continue;
    }

    // Image block
    if (line.startsWith('[[image:') && line.endsWith(']]')) {
      const imagePath = line.slice(8, -2).trim();
      elements.push(
        <div key={`img-${i}`} className="image-wrapper">
          <img
            src={`/${imagePath}`}
            alt="Post Visual"
            className="post-inline-image"
          />
        </div>
      );
      continue;
    }

    // Grid block
    if (line.startsWith('[[grid:')) {
      const gridImages = [];

      i++; // move to first line of grid images
      while (i < lines.length && !lines[i].trim().startsWith(']]')) {
        const img = lines[i].trim();
        if (img) gridImages.push(img);
        i++;
      }

      elements.push(
        <div key={`grid-${i}`} className="image-grid">
          {gridImages.map((imgPath, j) => (
            <a key={j} href={`/${imgPath}`} target="_blank" rel="noopener noreferrer">
              <img src={`/${imgPath}`} alt={`Grid ${j}`} className="grid-image" />
            </a>
          ))}
        </div>
      );
      continue;
    }

    // Default to markdown
    elements.push(
      <div key={`md-${i}`} className="markdown-block">
        <ReactMarkdown>{line}</ReactMarkdown>
      </div>
    );
  }

  return elements;
};




  return (
    <div className="post-container">
      <Link to="/" className="back-link">← Back</Link>
      <h1 className="post-title">{post.title}</h1>
      <p className="post-meta">{post.date} • {post.type}</p>
      <div className="post-content">
        {renderContentWithMedia(post.content)}
      </div>
    </div>
  );
}

export default PostPage;
