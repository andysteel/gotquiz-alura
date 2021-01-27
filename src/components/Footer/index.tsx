import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }
  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      opacity: .5;
    }
    span {
      text-decoration: underline;
    }
  }
  p {
    font-size: 0.7em;
    font-weight: 700;
  }
`;

// interface FooterProps {

// }

const Footer = () => (
  <FooterWrapper>
    <a href="https://www.alura.com.br/">
      <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
    </a>
    <p>
      Orgulhosamente criado durante
      {' '}
      a
      {' '}
      <a href="https://www.alura.com.br/">
        <span>Imersão React da Alura</span>
      </a>
    </p>
  </FooterWrapper>
);

export default Footer;
