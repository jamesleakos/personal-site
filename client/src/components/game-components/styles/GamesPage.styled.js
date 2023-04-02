import styled from 'styled-components';
import '../../styles/constants.css';

export const GamesPageStyled = styled.div`

  .projects {
    width: 100vw;
    background-color: var(--background-color-dark-main);
    padding: var(--post-list-margin) 0;
  }

  .projects-section {
    text-align: left;
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }

  .projects .section-title {
    color: var(--text-color-light-main);
    border-bottom: 1px solid var(--text-color-light-main);
  }

  .work-section {
    width: 100vw;
    padding: var(--post-list-margin) 0;
  }

  .current-work {
    background-color: var(--background-color-light-secondary);
  }

  .section-content {
    text-align: left;
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
  
  @media screen and (max-width: 1000px) {
    .section-content {
      width: 90%;
    }
  }

  .section-title {
    position: relative;
    display: block;
    text-align: left;
    font-family: var(--main-title-font);
    font-size: 1.5rem;
    border-bottom: 1px solid black;
  }

  .description {
    position: relative;
    display: block;
    text-align: left;
  }

  .description a {
    font-style: italic;  
    transition: 0.5s ease;
  }
  
  .description a:hover {
    color: var(--text-accent);
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
  
`;
