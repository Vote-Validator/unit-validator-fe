import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  padding: 10px;
  border-radius: 0;
  cursor: pointer;
  padding: 10px 20px;
  color: ${({ color }) => color};
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ border }) => border};
  margin: ${({ margin }) => margin};
`;

export const Button = (props) => {
  return <ButtonWrapper {...props}>{props.text}</ButtonWrapper>;
};
