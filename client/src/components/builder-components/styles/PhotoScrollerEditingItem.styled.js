import styled from 'styled-components';
import '../../styles/constants.css';

export const PhotoScrollerEditingItemStyled = styled.div`
  padding: 0 10px 0 0;
  margin: 0 var(--post-list-margin) 0 0;
  text-align: left;
  position: relative;

  .image-scroll-item-button.left {
    position: absolute;
    left: 0;
    // halfway down
    top: 50%;
    transform: translateY(-50%);
  }

  .image-scroll-item-button.right {
    position: absolute;
    right: 0;
    // halfway down
    top: 50%;
    transform: translateY(-50%);
  }

  .image-scroll-item-button.delete {
    position: absolute;
    right: 0;
    top: 0;
  }
`;