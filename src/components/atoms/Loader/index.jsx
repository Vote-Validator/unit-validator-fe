import React from "react";
import styled, { keyframes } from "styled-components";

const loaderAnimation = keyframes`
    from, 0% {
        transform: translateX(0)
    }
    50% {
        transform: translateX(25%)
    }
    100% {
        transform: translateX(0)
    }
`;

const Wrapper = styled.div`
  top: 0;
  left: 0%;
  position: absolute;
  width: 100%;
  background-color: #ffffff;
  height: 7px;
`;

const LoadingBar = styled.div`
  background-color: #147b5c;
  width: 80%;
  height: 5px;
  animation: ${loaderAnimation} 2s ease-in-out infinite;
`;

const circleLoaderAnimation = keyframes`
from, 
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const CircleLoader = styled.div`
  width: ${({ width }) => width || "18px"};
  height: ${({ height }) => height || "18px"};
  border: 2px solid #147b5c;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  animation: ${circleLoaderAnimation} 2s ease-in-out infinite;
`;

export const Loader = (props) => {
  if (props.type === "circle") {
    return <CircleLoader {...props} />;
  }

  return (
    <Wrapper>
      <LoadingBar />
    </Wrapper>
  );
};
