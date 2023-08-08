import styled from 'styled-components';
import '../../../../styles/constants.css';

export const MobileImageScrollerStyled = styled.div`

  .mobile-image-scroller {
    position: relative;
    /* Other styles */
  }

  .content {
    position: relative;
    display: flex;
    align-items: center; /* Centers children vertically */
    justify-content: center; /* Centers children horizontally */
    padding: 0 10px;
  }

  .image-holder {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 250px;
    overflow: hidden;
  }

  img {
    // if we want to the whole image to fit
    // max-width: 100%;
    // height: auto;

    // if we want to always show the same height
    height: 100%;
  }

  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem; /* Large size for the arrows */
    color: red;
    border: none;
    padding: 0;
    cursor: pointer;
    z-index: 1;
    background: none;
    
    // /* Thin black border around text using text-shadow */
    // text-shadow: 
    //    -1px -1px 0 #000,  
    //     1px -1px 0 #000,
    //     -1px 1px 0 #000,
    //     1px 1px 0 #000;
  }

  .left-arrow {
    left: 0;
  }

  .right-arrow {
    right: 0;
  }

`;