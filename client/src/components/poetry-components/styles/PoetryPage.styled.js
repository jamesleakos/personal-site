import styled from 'styled-components';
import '../../styles/constants.css';

export const PoetryPageStyled = styled.div`
  .main-page-content {
    width: 100vw;
    background-color: var(--background-color-light-main);
    padding: var(--post-list-margin) 0;
  }

  .poem-section {
    text-align: left;
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    min-height: calc(100vh - var(--nav-bar-height) - var(--footer-height) - 2 * var(--post-list-margin));
  }

  .top-bar {
    border-bottom: 1px solid black;
    margin-bottom: 20px;
  }

  .section-title {
    position: relative;
    display: inline-block;
    text-align: left;
    font-family: var(--main-title-font);
    font-size: 1.5rem;
    margin-bottom: 0;
    // border-bottom: 1px solid black;
  }

  .poem-span-holder {
    display: block;
    min-height: 100px;
    margin: 100px 20% 0 20%;
    padding-bottom: 100px;
    text-align: center;
  }
`;
