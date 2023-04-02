import styled from 'styled-components';
import '../../styles/constants.css';

export const PoemModalStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .background {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // semi-transparent black background
    background-color: rgba(0, 0, 0, 0.5);
  }

  .content {
    z-index: 1;
    position: absolute;
    top: calc(30px + var(--nav-bar-height));
    left: 30px;
    right: 30px;
    bottom: 30px;

    border: 1px solid black;
    background-color: var(--background-color-light-main);
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .relative-content {
    padding: 30px;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .form {
    width: 50%;
    margin: 0 auto;
    text-align: left;
  }

  label {
    display: block;
  }

  textarea {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  


`;