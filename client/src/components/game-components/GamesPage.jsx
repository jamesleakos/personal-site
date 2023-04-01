// dependencies
import React, { useState, useEffect } from 'react';

// comps
import Footer from '../main-components/Footer.jsx';
import Navbar from '../main-components/Navbar.jsx';
import TileScroller from '../utility-components/TileScroller.jsx';
import WorkTile from '../work-components/WorkTile.jsx';

// styles
import { GamesPageStyled } from './styles/GamesPage.styled.js';

function GamesPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const projectMapper = () => {
    const projects = [
      {
        title: 'Legends of Leakos',
        description: 'Multiplayer card game in the style of Hearthstone and Magic: the Gathering',
        url: 'https://legendsofleakos.com',
        tags: ['TypeScript', 'React', 'Express', 'NoSQL', 'AWS'],
        image_url: 'https://ik.imagekit.io/hfywj4j0a/LoL/canyon_city_N6bb4PTK3.png',
      },
      {
        title: 'Artemis: God-Queen of the Hunt',
        description: 'Single-player action-adventure game',
        url: 'https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/',
        tags: ['C#', 'Unity'],
        image_url: 'https://ik.imagekit.io/hfywj4j0a/Personal_Site/artemis.jpg',
      },
      {
        title: 'Houses of System Seven',
        description: 'Online Strategy Card Game',
        url: 'http://playsystemseven.com/',
        tags: ['Websockets', 'Node.js / Express.js', 'React', 'MongoDB', 'AWS'],
        image_url: 'https://ik.imagekit.io/hfywj4j0a/HOSS_Images/council_2_-xtCInoWU.png',
      },
    ]

    return projects.map((project, index) => {
      return (
        <WorkTile
          key={project.title + index + ''}
          project={project}
        />
      );
    });
  };
  
  return (
    <GamesPageStyled>
      <Navbar />
      <div className='main-content'>
        <div className='projects'>
          <div className='projects-section'>          
            <p className='section-title' >My Games</p>
            <TileScroller Mapper={projectMapper}/>
          </div>
        </div>
        <div className='current-work work-section'>
          <div className='section-content'>          
            <p className='section-title' >Current</p>
            <p className='description' >After the release of my first title <a href="https://store.steampowered.com/app/1081850/Artemis_GodQueen_of_The_Hunt/">Artemis</a>, I began working tinkering with my next idea, a multiplayer card game in the style of <a href="https://hearthstone.blizzard.com/en-us">Hearthstone</a> and <a href="https://magic.wizards.com/en">Magic: the Gathering</a>. In April of 2022, I left my job at Tracksmith and have been working in earnest on <a href="https://legendsofleakos.com">Legends of Leakos</a> and doing contract dev work.</p>
          </div>
        </div>
        <div className='past-work work-section'>
          <div className='section-content'>          
            <p className='section-title' >Past Work</p>
            <p className='description' >After a short career as a professional runner post-college, my first “real job” was as a developer and analyst at FDO Partners, a quantitative hedge fund in Cambridge, MA. I was responsible for writing software (a lot of Monte Carlo simulations!) to model fund performance, optimize cash management and distributions to investors, manage risk, and determine purchasing strategy. I also worked on a number of projects to improve the firm’s data infrastructure, including a data warehouse and a data visualization tool.</p><br />
            <p>I left FDO to join Tracksmith, again as a developer and analyst, and rose to become Director of Analytics and Business Intelligence. I was responsible for the company’s data science and data infrastructure. I wrote custom ingestion pipelines for disparate data sources (inc Shopify, Google Analytics, Returnly) to centralize record-keeping for 100,000+ customers. I built and left them with custom analytics that lead materials / inventory purchasing strategy each quarter.</p>
          </div>
        </div>
      </div>
      <Footer />
    </GamesPageStyled>
  )
}

export default GamesPage;