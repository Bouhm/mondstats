import './About.css';

import React from 'react';

import LLImage from '../ui/LLImage';

function About() { 
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Mondstats</h1>
        <p>Mondstats is a website that aims to help players build characters and teams to improve their gameplay. You can browse statistics on how players like to build and use certain characters.</p>
        <p>This is a hobby project by Bouhm who loves to explore and share the many ways players find success and enjoyment in the game.</p>
      </div>
      <hr />
      <div className="about-section">
        <h2>How are you collecting data?</h2>
        <p>Mondstats collects its data using the APIs from HoYoLAB. Only data from users who opt-in to display their Battle Chronicles publicly can be collected. Due to the API rate limit, it takes a long time to accumulate data. The aggregate data is updated routinely and any data more than 6 weeks old is purged every patch cycle. Since data collection is slow, small chunks are updated at a time in order of time since last update.</p>
      </div>
      <div className="about-section">
        <h2>How reliable is the information on site?</h2>
        <p>I encourage players to be critical about interpreting the data presented on this site. Behavioral data does not translate into an objective conclusion on what is the 'best' due to many factors including player investment, playstyle, etc. To objectively evaluate an optimal build or team, a theorycrafting resource will be better suited for your needs.</p>
      </div>
      <div className="about-section">
        <h2>How can I contribute?</h2>
        <p>Creating an account in HoYoLAB (miHoYo's official forum) if you haven't done so already and toggling your Battle Chronicle to 'Public' in your profile will allow your data to be visible. Mondstats collects data indiscriminately so it won't have your data for certain.</p>
      </div>
      <div className="about-section">
        <h2>Where is my 4-Bloodstained Chivalry Klee build?</h2>
        <p>There are several reasons why a build might not be included. If the build is used by a very small percentage of players, it is omitted. With a large enough sample size, the displayed builds will skew toward established meta builds. You can apply filters to search for less conventional builds such as those used by Barbara mains.</p>
      </div>
      <div className="about-section">
        <h2>How is the data filtered?</h2>
        <p>All of the character and team data is filtered to only include characters that are fully built (complete artifact sets and equipped with at least 3-star weapons) and from abyss battles that have been 3-starred. Additional filtering is applied when aggregating to exclude stats that represent a VERY small percentage of players.</p>
      </div>
      <div className="about-section">
        <h2>How can I contact you about an issue?</h2>
        <p>You can find me in Discord under <b>Bouhm#2205</b>. I'd love to hear your feedback, suggestions, and/or criticisms!</p>
      </div>
      <div className="pls">
        Please contribute by setting your Battle Chronicle to public in HoYoLAB. Thank you!
        <LLImage src="/assets/pls.webp" alt="pls"/>
      </div>
      <div className="hoyolab-image">
        <LLImage src="/assets/hoyolab.webp" alt="hoyolab" />
      </div>
    </div>
  )
}

export default About
