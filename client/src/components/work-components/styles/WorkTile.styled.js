import styled from 'styled-components';
import '../../styles/constants.css';

export const WorkTileStyled = styled.div`
  display: inline-block;
  width: 300px;
  // height: calc(var(--work-list-height) * .9);
  padding: 0 10px 0 0;
  margin: 0 var(--post-list-margin) 0 0;
  border-right: .5px solid var(--text-color-light-main);
  text-align: left;
  transition: 0.5s ease;

  @media screen and (max-width: 800px) {
    width: 200px;
  }

  .tile-title {
    color: var(--text-color-light-main);
    font-family: var(--main-title-font);
    margin: 10px 0 10px 0;
    font-size: 1.5rem;
    max-width: var(--post-tile-width);
  }
  
  .description {
    color: var(--text-color-light-main);
    font-family: var(--body-text-font);
    max-width: var(--post-tile-width);
  }
  
  .tile-title-image {
    width: 280px;
    max-height: 300px;
    margin-top: 10px;
    overflow: hidden;
  }
  
  @media screen and (max-width: 800px) {
    .tile-title-image {
      width: 180px;
    }
  }
  
  img {
    width: 100%;
    object-fit: cover;
    transition: 0.5s ease;
  }
  
  img:hover {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    z-index: -1;
  }
  
  .tag {
    display: inline-block;
  }
  
  .tag-span {
    font-family: var(--caption-font);
    color: var(--text-accent);
    font-size: .85rem;
    margin: 0 20px 0 0;
    letter-spacing: .15rem;
  }
`;
