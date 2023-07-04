// styled component for PhotoScrollerComp

import styled from 'styled-components';
import '../../styles/constants.css';

export const PhotoScrollerCompStyled = styled.div`
  display: inline-block;
  width: 100%;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  .not-editing {
    // background-color: var(--background-color-light-secondary);
    overflow: hidden;
    text-align: left;
    padding: var(--post-list-margin);
  }
  
  .not-editing.mobile {
    padding-right: 0;
  }

  .input-area {
    display: block;
    height: 50px;
    text-align: center;
  }

  .image-scroller img {
    height: 300px;
  }

  .editing {
    display: inline-block;
    width: 90%;
    padding: 20px;
    border: 1px solid black;
    border-radius: 5px;
  }

  .top-icons {
    display: block;
    margin-bottom: 40px;
  }

  .left-icons {
    float: left;
    display: block;
  }
  .left-icons .reacting-link {
    display: inline-block;
    margin: 0 5px;
  }
  .left-icons .size-field-div {
    display: inline-block;
    margin-left: 10px;
  }
  .left-icons .size-field-div label {
    margin-right: 5px;
  }
  .left-icons .bg-position-field-div {
    display: inline-block;
    margin-left: 10px;
  }
  .left-icons .bg-position-field-div label {
    margin-right: 5px;
  }

  .right-icons {
    float: right;
    display: block;
  }
  .right-icons .reacting-link {
    display: inline-block;
    margin: 0 5px;
  }
  .text-comp .reacting-link:hover {
    -webkit-transform: scale(1.2);
  }

`;