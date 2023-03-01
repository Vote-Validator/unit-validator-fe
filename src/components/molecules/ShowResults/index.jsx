import React from "react";
import { Flex } from "../../atoms";
import { SilentLink } from "../../atoms/SilentLink";
import styled from "styled-components";
import { screen } from "../../theme/utils";

const SummaryText = styled.p`
  @media only screen and (${screen.sm}) {
    width: 70%;
    text-align: center;
  }
`;
export const ShowResults = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <SilentLink to="/statistics">
        <h3 style={{ color: "#147B5C", margin: "6px 0" }}>
          Show Results &#10132;
        </h3>
      </SilentLink>
      <SummaryText width="80%">
        2311 images validates so far. 345 images not validated yet
      </SummaryText>
    </Flex>
  );
};
