// dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import BackgroundImage from '../main-components/BackgroundImage.jsx';
import TileScroller from '../utility-components/scrollers/base-tile-scroller/TileScroller.jsx';
import WorkTile from '../work-components/WorkTile.jsx';

// styles
import { GamesPageStyled } from './styles/GamesPage.styled.js';

// page
function GamesPage({ isMobile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .post('/page/games')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const projectMapper = () => {
    const projects = [
      {
        title: 'Legends of Leakos',
        description:
          'Currently in development - a Multiplayer card game in the style of Hearthstone and Magic: the Gathering.',
        url: 'https://legendsofleakos.com',
        tags: ['TypeScript', 'React', 'Express', 'NoSQL', 'AWS'],
        image_url:
          'https://ik.imagekit.io/hfywj4j0a/LoL/canyon_city_N6bb4PTK3.png',
      },
      {
        title: 'Artemis: God-Queen of the Hunt',
        description:
          'My first released game. a single-player sidescroller / ultrahard platformer with a small competitive speed-running community. ',
        url: 'https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/',
        tags: ['C#', 'Unity'],
        image_url: 'https://ik.imagekit.io/hfywj4j0a/Personal_Site/artemis.jpg',
      },
      {
        title: 'Houses of System Seven',
        description:
          "Online Strategy Card Game. I made this because my friends didn't have a good place to play Coup online.",
        url: 'http://playsystemseven.com/',
        tags: ['Websockets', 'Node.js / Express.js', 'React', 'MongoDB', 'AWS'],
        image_url:
          'https://ik.imagekit.io/hfywj4j0a/HOSS_Images/council_2_-xtCInoWU.png',
      },
    ];

    return projects.map((project, index) => {
      return <WorkTile key={project.title + index + ''} project={project} />;
    });
  };

  return (
    <GamesPageStyled>
      <Navbar />
      <div className='main-content'>
        <BackgroundImage
          height='100vh'
          imageURL='Personal_Site/artemis_thorns.jpeg'
        />
        <div className='projects'>
          <div className='projects-section'>
            <p className='section-title'>My Games</p>
            <TileScroller Mapper={projectMapper} />
          </div>
        </div>
        <BackgroundImage
          height='100vh'
          imageURL='Personal_Site/trollherds_3.png'
        />
        {/* <div className='current-work work-section'>
          <div className='section-content'>          
            <p className='section-title' >Artemis</p>
            <p className='description' >desc</p>
          </div>
        </div> */}
      </div>
      <Footer />
    </GamesPageStyled>
  );
}

export default GamesPage;
