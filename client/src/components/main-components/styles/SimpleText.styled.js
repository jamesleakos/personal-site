import styled from 'styled-components';
import '../../styles/constants.css';

export const SimpleTextStyled = styled.div`
  

  .text-container {
    padding: calc(var(--post-list-margin) * 2);
  }

  .text {
    text-align: left;
    font-size: 1.4rem;
    /* we're doing margin stuff a bit funny because we can add and remove */
    margin-left: auto;
    margin-right: auto;
    width: 60%;
  }
  
  @media screen and (max-width: 1000px) {
    .text {
      width: 90%;
    }
  }
`;