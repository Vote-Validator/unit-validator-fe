import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../../../assets/svgs/v_logo.svg";
import { Flex } from "../../atoms";
import { SilentLink } from "../../atoms/SilentLink";
import { screen } from "../../theme/utils";

const Wrapper = styled(Flex)`
  background-color: #ffffff;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (${screen.sm}) {
    justify-content: flex-start;
  }
`;

export const NavBar = () => {
  return (
    <Wrapper>
      <div>
        <LogoSvg width="32px" height="32px" />
      </div>
      <SilentLink to="/">
        <h3 style={{ margin: "0", padding: "0" }}>Validation</h3>
      </SilentLink>
    </Wrapper>
  );
};
