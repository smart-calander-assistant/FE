import React from 'react'
import styled from 'styled-components';

const Header = ({label}) => {
  return (
    <HeaderContainer>{label}</HeaderContainer>
  )
}

export default Header;


const HeaderContainer = styled.div`
    font-size: x-large;

    margin: 1rem;
`