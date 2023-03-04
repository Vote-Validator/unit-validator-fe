import PropTypes from "prop-types";
import styled from "styled-components";
// import { Flex } from "../../atoms";

const isMobile = window.innerWidth <= 768;

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const Header = styled.header``;

const Footer = styled.footer`
  height: 60px;
  background-color: #147b5c;
`;

const Section = styled.section`
  padding: ${({ padding }) => padding};
  min-height: ${isMobile ? "100%" : "calc(100vh - 300px)"};
`;

export const HomeTemplate = ({ header, children, footer, backgroundColor }) => (
  <Wrapper>
    {header && <Header>{header}</Header>}

    <Section backgroundColor={backgroundColor}>{children}</Section>

    {footer && <Footer>{footer}</Footer>}
  </Wrapper>
);

HomeTemplate.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  backgroundColor: PropTypes.string,
  children: PropTypes.any.isRequired,
};
