import './About.css';

import _ from 'lodash';
import React, { useEffect } from 'react';

function About() { 
  useEffect(() => {
    window.scrollTo(0,0);
  },[])

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Favonius.gg</h1>
        <p>Favonius.gg is a website that aims to help players build their characters and form teams to compete in the most challenging content in the game. You can view the statistics on how players of different skills and preferences like to build and use certain characters.</p>
        <p>This is a hobby project by Bouhm who is obsessed with sharing the many ways players find success and enjoyment in the game with the community.</p>
      </div>
      <hr />
      <div className="about-section">
        <h2>How are you collecting data?</h2>
        <p>Favonius.gg collects its data using the APIs from HoYoLAB. Only data from users who opt-in to display their Battle Chronicles publicly can be collected. Due to the API rate limit, it takes a long time to accumulate a large sample size. Favonius.gg will perform rolling updates and perform updates in batches.</p>
      </div>
      <div className="about-section">
        <h2>How can I contribute?</h2>
        <p>Creating an account in HoYoLAB (which is miHoYo's official forum) if you haven't done so already and toggling your Battle Chronicle to 'Public' in your profile will allow your data to be visible. Favonius.gg collects data indiscriminately so it won't have your data for certain.</p>
      </div>
      <div className="about-section">
        <h2>Where is my 4-Bloodstained Chivalry Klee build?</h2>
        <p>There are several reasons why a build might not be included. If the build is used by a very small percentage of players, it is omitted. With a large enough sample size, the displayed builds will skew toward established meta builds. You can apply filters to search for less conventional builds such as those used by Barbara mains.</p>
      </div>
      <div className="about-section">
        <h2>How can I contact you?</h2>
        <p>You can find me in Discord as <b>Bouhm#2205</b>. I'd love to hear your feedback, suggestions, and/or criticisms!</p>
      </div>
      <div className="pls">Please contribute by setting your Battle Chronicle to public in HoYoLAB. Thank you!
        <img src="/assets/pls.png" alt="pls"/>
      </div>
    </div>
  )
}

export default About
