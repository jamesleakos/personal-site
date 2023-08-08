import styled from 'styled-components';
import '../../styles/constants.css';

export const PhotoScrollerCompStyled = styled.div`
  
  text-align: left;
  position: relative;

  .holder {
    padding: 0 0 0 40px;
  }

  .image img {
    height: 500px;
  }

  .holder.mobile {
    padding: 0;
  }
`;