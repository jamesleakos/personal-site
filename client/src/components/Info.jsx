// dependancies
import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

// imports
import './styles/Info.css';

function Info() {
  return (
    <div className='info'>
      <div className='info-block'>
        <p>James Leakos is a software engineer and former professional runner living in Flagstaff, AZ and San Francisco, CA. He is a member of the Coconino County Search and Rescue team and enjoys backcountry skiing, mountain biking, and flying planes. He has released one video game, and has another on the way.</p>
        <br /><br />
      </div>
      <div className='links-block'>
        <div>
          <p className='links-title'>INFO</p>
          <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Resume</a>
          <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Contact</a>
          <br />
        </div>
        <div>
          <p className='links-title'>BLOG</p>
          <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Adventure</a>
          <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Running</a>
          <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>History</a>
          <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Art</a>
          <Link className='links-item reacting-link' to="/all-posts">Posts</Link>
          <br />
        </div>
        <div>
          <p className='links-title'>WORK</p>
            <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Artemis</a>
            <a className='links-item reacting-link' href='https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/'>Projects</a>
            <br />
        </div>
        <div>
          <p className='links-title'>FOLLOW</p>
            <a className='links-item reacting-link' href='https://github.com/jamesleakos'>Github</a>
            <a className='links-item reacting-link' href='https://www.instagram.com/jamesleakos/'>Instagram</a>
            <a className='links-item reacting-link' href='https://www.linkedin.com/in/jamesleakos/'>LinkedIn</a>
            <br />
        </div>
      </div>
    </div>
  )
}

export default Info;