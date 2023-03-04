import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex } from "../../atoms";

const isMobile = window.innerWidth <= 768;

const Wrapper = styled.div`
  background-color: #fafaf5;
`;

const Header = styled.header`
  background-color: #ffffff;
  height: 60px;
`;

const Footer = styled.footer`
  height: 60px;
  /* background-color: #ffffff; */
  background-color: #147b5c;
`;

const Section = styled(Flex)`
  align-items: center;
  flex-direction: column;
  padding: ${({ padding }) => padding};
  min-height: ${isMobile ? "100%" : "calc(100vh - 120px)"};
`;

export const StatisticsTemplate = ({
  header,
  children,
  footer,
  backgroundColor,
}) => (
  <Wrapper>
    {header && <Header>{header}</Header>}

    <Section
      className="container"
      padding="20px"
      backgroundColor={backgroundColor}
    >
      {children}
    </Section>

    {footer && <Footer>{footer}</Footer>}
  </Wrapper>
);

StatisticsTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  backgroundColor: PropTypes.string,
  children: PropTypes.any.isRequired,
};
