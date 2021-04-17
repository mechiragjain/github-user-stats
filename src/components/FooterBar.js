import React from 'react';
import styled from 'styled-components';

const FooterBar = () => {
  return <Wrapper>
    <h4>Made with ❤️ by <a href="https://chiragjain.co.in">Chirag Jain</a></h4>
  </Wrapper>
}

const Wrapper = styled.nav`
  padding: 1.5rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  /* grid-template-columns: auto auto 100px; */
  justify-content: center;
  align-items: center;
  h4 {
    margin-bottom: 0;
    font-weight: bold;
    font-family: 'Roboto', sans-serif !important;
  }
`;

export default FooterBar;
