import React from "react";
import styled from "styled-components";

const ProgressWrapper = styled.div`
  background-color: #dbe3e1;
  margin: 16px 0;
  border-radius: 50px;
  width: 100%;
  position: relative;
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
  right: ${({ right }) => right || "5px"};
  left: ${({ left }) => left};
  top: ${({ top }) => top || "-8.5px"};
  font-weight: bold;
  font-style: italic;
  font-size: 0.65rem;
  color: ${({ color }) => color || "#147B5C"};
`;

export const ProgressBar = ({ value, total }) => {
  const percentageOfCompletion = (value / total) * 100;
  const displayFigure =
    percentageOfCompletion % 2 === 0
      ? percentageOfCompletion
      : percentageOfCompletion.toFixed(1);
  return (
    <ProgressWrapper>
      <StatusValueText top="7px" color="black">
        {total - value} to go
      </StatusValueText>
      <ProgressElement width={`${displayFigure}%`}>
        <StatusValueText color="#ffffff">{displayFigure}%</StatusValueText>
        <StatusValueText top="-24px" color="black">
          {value} validated
        </StatusValueText>
      </ProgressElement>
    </ProgressWrapper>
  );
};
