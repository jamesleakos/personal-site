import styled from 'styled-components';
import '../../styles/constants.css';

export const TileScrollerStyled = styled.div`
  --post-list-margin: 20px;
  overflow: hidden;
  z-index: 1;

  .scroll-wrapper {
    z-index: 1;
    padding: calc(var(--post-list-margin)) 0;
    width: 100%;
    overflow-x: scroll;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
  }

  .scroller {
    display: flex;
  }
`;
