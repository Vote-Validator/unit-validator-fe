import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  html {
    font-size: 100%;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
  }

  .container {
    max-width: 1440px;
    margin: auto;
  }
`;
