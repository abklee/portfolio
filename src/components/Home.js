import React, { useState, useEffect} from 'react';
import posts from '../data/posts.json';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';
import Banner from './Banner';
import Select from 'react-select';
import { AnimatePresence, motion } from 'framer-motion';

function Home() {
  const [filter, setFilter] = useState('all');

  const [sortOrder, setSortOrder] = useState('newest');

  const [track, setTrack] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playedAgo, setPlayedAgo] = useState(null);

  
  const options = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' }
  ];


  const filteredPosts = (
  filter === 'all' ? posts : posts.filter((p) => p.type === filter)
).sort((a, b) =>
  sortOrder === 'newest'
    ? new Date(b.date) - new Date(a.date)
    : new Date(a.date) - new Date(b.date)
);

  useEffect(() => {
    const username = 'abklee';
    const apiKey = '6cfd27ed445af53c6dc58d5af63d77d2'; // bad practice i know but its just for last.fm so nbd 
    //93d2dca8d83af4a8767b54f929e9997a

    fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`)
    .then((res) => res.json())
    .then((data) => {
      const recent = data.recenttracks.track[0];
      setTrack(recent);

      const nowPlaying = recent['@attr']?.nowplaying === 'true';
      setIsPlaying(nowPlaying);

      if (!nowPlaying && recent.date?.uts) {
        const playedTime = parseInt(recent.date.uts, 10) * 1000;
        const timeAgo = Date.now() - playedTime;
        const minutes = Math.round(timeAgo / 60000);
        const hours = Math.floor(minutes / 60);
        const relativeTime =
          hours > 0 ? `${hours}h ago` : `${minutes}m ago`;

        setPlayedAgo(relativeTime);
      }
    })
    .catch((err) => console.error('Last.fm fetch error:', err));
}, []);

  return (
    <>
      <div className="top-image">
        <div className="top-image">
          <nav className="navbar">
            <Link to="/post/2" className="nav-link ">About</Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link hover-underline">Resume</a>
            <a href="#contact" className="nav-link hover-underline">Contact</a>
          </nav>
        </div>
      </div>
      <div className="container">
        <Banner />
        <div className="post-controls">
          <div className="filter-buttons">
            {['all', 'professional', 'personal'].map((type) => (
              <button
                key={type}
                className={`filter-btn ${filter === type ? 'active-filter' : ''}`}
                onClick={() => setFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <Select
            options={options}
            defaultValue={options[0]}
            onChange={(option) => setSortOrder(option.value)}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '8px',
                borderColor: '#ccc',
                boxShadow: 'none',
                marginLeft: 'auto',
                padding: '4px 8px',
              }),
            }}
          />
        </div>


        <motion.div layout className="post-grid-wrapper">
          <motion.div layout className="post-grid">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
        {track && (
          <a
            href="https://www.last.fm/user/abklee"
            target="_blank"
            rel="noreferrer"
            className="now-playing-container"
          >
            <div className="now-playing-card">
              <img
                className="now-playing-cover"
                src={track.image?.[3]?.['#text'] || track.image?.[2]?.['#text']}
                alt={track.name}
              />
              <div className="now-playing-info">
                <p className="now-playing-label">what i'm listening to</p>
                <p className="now-playing-title">{track.name}</p>
                <p className="now-playing-artist">{track.artist['#text']}</p>
                <p className="now-playing-status">
                {isPlaying ? 'Now Playing' : playedAgo ? `Last played ${playedAgo}` : ''}
                </p>
              </div>
            </div>
          </a>
        )}

        <div id="contact" className="footer">
          <a href="https://www.linkedin.com/in/alex-klee" target="_blank" rel="noopener noreferrer">
            <img src="/assets/linkedin.svg" alt="LinkedIn" className="footer-icon" />
          </a>
          <a href="https://www.instagram.com/abklee3" target="_blank" rel="noopener noreferrer">
            <img src="/assets/insta.svg" alt="Instagram" className="footer-icon" />
          </a>
          <a href="mailto:alex.klee111@gmail.com">
            <img src="/assets/mail.svg" alt="Email" className="footer-icon" />
          </a>
        </div>
        
      </div>

      

    </>
  );
}

export default Home;
