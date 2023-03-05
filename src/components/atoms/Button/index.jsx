import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  padding: 10px;
  border-radius: 0;
  cursor: pointer;
  padding: 12px 28px;
  color: ${({ color }) => color || "#5e5d5d"};
  border: 1px solid black;
  font-weight: bold;
  background-color: ${({ bgColor }) => bgColor};
  margin: ${({ margin }) => margin};
  margin: ${({ margin }) => margin};

  &:hover {
    color: black;
  }
`;

export const Button = (props) => {
  return <ButtonWrapper {...props}>{props.text}</ButtonWrapper>;
};
