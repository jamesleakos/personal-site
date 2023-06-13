import React from 'react';
import { InlineImageStyled } from './styles/InlineImage.styled';

function InlineImage({ height, imageURL }) {
  return (
    <InlineImageStyled
      className='inline-image'
      src={`https://ik.imagekit.io/hfywj4j0a/tr:w-2500/${imageURL}`}
      alt='image'
    />
  );
}

export default InlineImage;
