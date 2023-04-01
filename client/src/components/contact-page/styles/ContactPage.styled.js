import styled from 'styled-components';
import '../../styles/constants.css';

export const ContactPageStyled = styled.div`
  .main-content {
    width: 100vw;
    background-color: red;
  }

  .contact-section {
    color: var(--text-color-light-main);
    text-align: left;
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding: var(--post-list-margin) 0;
  }

  .section-title {
    margin-top: 0;
    position: relative;
    display: block;
    text-align: left;
    font-family: var(--main-title-font);
    font-size: 1.5rem;
    border-bottom: 1px solid var(--text-color-light-main);
  }

  .contact-text {
    position: relative;
    display: block;
    text-align: left;
  }
  
`;
