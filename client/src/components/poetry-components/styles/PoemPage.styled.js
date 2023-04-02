import styled from 'styled-components';
import '../../styles/constants.css';

export const PoemPageStyled = styled.div`
  .poem-content {
    padding: var(--post-list-margin);
    text-align: left;
    min-height: calc(100vh - var(--nav-bar-height) - var(--footer-height) - 2 * var(--post-list-margin));
  }

  .top-bar {
    border-bottom: 1px solid black;
    margin-bottom: 20px;
  }

  .poem-title {
    position: relative;
    display: inline-block;
    text-align: left;
    font-family: var(--main-title-font);
    font-size: 1.5rem;
    // border-bottom: 1px solid black;
  }

  .poem-body {
    margin-bottom: 40px;
  }

  .poem-explanation {
    font-style: italic;
  }

  .menu-button {
    display: inline-block;
    margin-right: 10px;
    font-size: .8rem;
    padding: 5px;
    color: var(--text-color-secondary);
    border: 1px solid var(--border-color-dim);
    transition: 0.5s ease;
  }

  .menu-button:hover {
    border: 1px solid var(--border-color-bright);
    color: var(--border-color-bright);
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
`;