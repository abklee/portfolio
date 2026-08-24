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
          I’m a software engineer based in Northern Virginia, currently working at Peraton. I'm also a recent graduate of Virginia Tech, receiving my masters in Computer Science in May 2026 and bachelors degrees in computer science and mathematics in 2025. 
          <br/><br/>
          This website is a collection of things I find are worth sharing, ranging from cool projects or research I’m working on to photos from fun trips. Please feel free to contact me about anything you see on here, my email and socials are at the bottom of the page.
        </p>
      </div>
    </div>
  );
}

export default Banner;
