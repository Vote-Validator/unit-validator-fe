import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  padding: 10px;
  border-radius: 0;
  cursor: pointer;
  padding: 12px 28px;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  margin: ${({ margin }) => margin};
  margin: ${({ margin }) => margin};

  &:hover {
    color: black;
    border: 1px solid black;
    font-weight: bold;
  }
`;

export const Button = (props) => {
  return <ButtonWrapper {...props}>{props.text}</ButtonWrapper>;
};
