import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  fontColor: '#000',
  borderColor: '#000',
  buttonColor: '#000',
  buttonBG: '#fff',
  inputColor: '#fff',
  inputBorderColor: '#000',
};

export const darkTheme = {
  body: '#212121',
  fontColor: '#fff',
  borderColor: '#fff',
  buttonColor: '#fff',
  buttonBG: '#212121',
  inputColor: '#212121',
  inputBorderColor: '#fff',
};

export const GlobalStyles = createGlobalStyle`
  body {
    transition: all 0.34s ease;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.fontColor};
  }
`;
