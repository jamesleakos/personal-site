import styled from 'styled-components';
import '../../../../styles/constants.css';

export const ImageScrollerStyled = styled.div`

  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-modal-content {
    position: relative;
    width: calc(100% - 200px);
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  .image-modal-content img {
    max-width: 100%;
    max-height: 100%;
  }
  // buttons go on either side of image
  .image-modal-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    // transparent white
    background: none;
    border: none;
    font-size: 5rem;
    color: white;
    transition: 0.5s ease;
  }
  .image-modal-button:hover {
    font-size: 5.5rem;
  }

  .image-modal-button.left {
    left: 15px;
  }
  .image-modal-button.right {
    right: 15px;
  }

`;