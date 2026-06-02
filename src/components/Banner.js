import React from 'react';
import profile from '../test.jpg';

function Banner() {
  return (
    <div className="banner-content">
      <div className="banner-image-wrapper">
        <img src={profile} alt="Profile" className="banner-profile-image" />
      </div>
      <div className="banner-text">
        <h1 className="banner-title">Hi, I'm Alex</h1>
        <p className="banner-description">
          I’m an engineer and mathematician based in Virginia, focused on how software works, why it breaks, and how to make it better.
          <br /><br />
          I'm a recent graduate of Virginia Tech, receiving my masters in Computer Science in May 2026 and bachelors degrees in computer science and mathematics in 2025. Following my graduation I'll be heading up to northern Virginia to return to working at Peraton as a software engineer.     
          <br /><br />
          This site is a collection of things I find worth sharing, research, projects, work, and some occasional fun. Please feel free to contact me about anything you see on here, my email and socials are at the bottom of the page.
        </p>
      </div>
    </div>
  );
}

export default Banner;
