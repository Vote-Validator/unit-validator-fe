import React from "react";
import styled from "styled-components";
import { Flex } from "../../atoms";

const Wrapper = styled(Flex)`
  color: #ffffff;
  text-align: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Footer = () => {
  return (
    <Wrapper className="container">
      Validation | &copy; 2023 All Rights Reserved{" "}
    </Wrapper>
  );
};
