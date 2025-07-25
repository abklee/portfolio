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
          I’m an engineer and mathematician interested in the structural as well as behavioral aspects of software systems — how models learn,
          how software breaks at the lowest level, and how mathematical tools can be used to understand both.
          <br /><br />
          Currently I'm working as a Data Science Engineer Intern at Peraton in Blacksburg, Virginia, and a
          recent graduate of Virginia Tech, where I’ll return this fall for my accelerated
          Master’s in Computer Science.
          <br /><br />
          This site is a collection of things I find worth sharing, research, projects, work, and some occasional fun. Please feel free to contact me about anything you see on here, my email and socials are at the bottom of the page.
        </p>
      </div>
    </div>
  );
}

export default Banner;
