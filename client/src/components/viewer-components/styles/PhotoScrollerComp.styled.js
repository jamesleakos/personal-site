import styled from 'styled-components';
import '../../styles/constants.css';

export const PhotoScrollerCompStyled = styled.div`
  
  text-align: left;
  position: relative;

  .image img {
    height: 500px;
  }

  /* these should be at the bottom so that they override other things */
  .has-top-margin {
    margin-top: var(--post-component-vertical-margin);
  }

  .has-bottom-margin {
    margin-bottom: var(--post-component-vertical-margin);
  }
`;