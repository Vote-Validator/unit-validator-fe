import React from "react";
import styled from "styled-components";
import { Flex } from "../Flex";

const ProgressElement = styled.div`
  width: ${({ width }) => width};
  height: 15px;
  background-color: #00aff1;
  border-radius: 50px;
  position: relative;
`;
const ProgressWrapper = styled.div`
  background-color: #dbe3e1;
  margin: 16px 0;
  border-radius: 50px;
  width: 50%;
`;
const StatusValueText = styled.p`
  position: absolute;
  right: 0;
  bottom: 8px;
  font-weight: bold;
  font-style: italic;
  font-size: 12px;
`;

export const ProgressBar = ({ value, total }) => {
  const percentageOfCompletion = (value / total) * 100;
  const displayFigure =
    percentageOfCompletion % 2 === 0
      ? percentageOfCompletion
      : percentageOfCompletion.toFixed(1);
  return (
    <Flex justifyContent="flex-end">
      <ProgressWrapper>
        <ProgressElement width={`${displayFigure}%`}>
          <StatusValueText>{displayFigure}%</StatusValueText>
        </ProgressElement>
      </ProgressWrapper>
    </Flex>
  );
};
