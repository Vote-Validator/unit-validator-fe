import React from "react";
import styled from "styled-components";

const ProgressWrapper = styled.div`
  background-color: #dbe3e1;
  margin: 16px 0;
  border-radius: 50px;
  width: 100%;
  position: relative;
  /* z-index: 999999; */
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
  white-space: nowrap;
`;

export const ProgressBar = ({ value, total }) => {
  const percentageOfCompletion = (value / total) * 100;
  const displayFigure =
    percentageOfCompletion % 2 === 0
      ? percentageOfCompletion
      : percentageOfCompletion.toFixed(1);
  const leftStatusTextProps = {
    top: "-24px",
    [displayFigure < 20 ? "left" : "right"]: displayFigure < 20 ? "0" : "5px",
  };
  const innerTextProps = {
    [displayFigure < 20 ? "left" : "right"]: displayFigure < 20 ? "5px" : "5px",
    color: "#ffffff",
  };

  return (
    <ProgressWrapper>
      <StatusValueText top="7px" color="black">
        {total - value} to go
      </StatusValueText>
      <ProgressElement width={`${displayFigure}%`}>
        <StatusValueText {...innerTextProps}>{displayFigure}%</StatusValueText>
        <StatusValueText {...leftStatusTextProps} color="black">
          {value} transcribed
        </StatusValueText>
      </ProgressElement>
    </ProgressWrapper>
  );
};
