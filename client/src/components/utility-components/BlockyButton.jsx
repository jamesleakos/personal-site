import React from 'react';
import styled from 'styled-components';

const BlockyButtonStyled = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-size: 0.8rem;
  padding: 5px;
  color: black;
  border: 1px solid black;
  transition: 0.5s ease;

  :hover {
    border: 1px solid red;
    color: red;
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
  }
`;

function BlockyButton({ text, onClick, style }) {
  return (
    <BlockyButtonStyled onClick={onClick} style={style}>
      {text}
    </BlockyButtonStyled>
  );
}

export default BlockyButton;
