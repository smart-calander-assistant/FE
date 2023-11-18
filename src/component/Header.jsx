import React, { useState } from 'react';
import styled from 'styled-components';

const Header = ({ label }) => {
    return (
        <HeaderContainer>
            <p>{label}</p>
        </HeaderContainer>
    );
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    font-size: x-large;
    margin: 1rem;

    justify-content: space-between;
    align-items: center;
`;
