import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  font-family: sans-serif
  /* border: solid 1px red; */
}
body{
    background-color: #00010f;
}
html {
  color-scheme: dark;
}

`;
