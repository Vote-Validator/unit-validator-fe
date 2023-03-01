import { css } from "styled-components";

export const CustomScrollBar = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #d1d0d0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #9c9c9c;
    border-radius: 10px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb:hover {
      background: #6d6d6d;
    }
  }
`;
