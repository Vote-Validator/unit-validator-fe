import React from "react";
import styled from "styled-components";

const ProgressWrapper = styled.div`
  background-color: #dbe3e1;
  margin: 16px 0;
  border-radius: 50px;
  width: 100%;
`;
const ProgressElement = styled.div`
  width: ${({ width }) => width};
  height: 15px;
  background-color: #147b5c;
  border-radius: 50px;
  position: relative;
`;
const StatusValueText = styled.p`
  position: absolute;
  right: 5px;
  top: -8.5px;
  font-weight: bold;
  font-style: italic;
  font-size: 0.65rem;
  color: white;
`;

export const ProgressBar = ({ value, total }) => {
  const percentageOfCompletion = (value / total) * 100;
  const displayFigure =
    percentageOfCompletion % 2 === 0
      ? percentageOfCompletion
      : percentageOfCompletion.toFixed(1);
  return (
    <ProgressWrapper>
      <ProgressElement width={`${displayFigure}%`}>
        <StatusValueText>{displayFigure}%</StatusValueText>
      </ProgressElement>
    </ProgressWrapper>
  );
};
