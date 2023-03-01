import PropTypes from "prop-types";
import styled from "styled-components";
// import { Flex } from "../../atoms";

const Wrapper = styled.div`
  background-color: #ffffff;
`;

const Header = styled.header``;

const Footer = styled.footer`
  height: 60px;
`;

const Section = styled.section`
  padding: ${({ padding }) => padding};
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
