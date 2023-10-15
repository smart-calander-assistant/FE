import React from 'react';
import { styled } from 'styled-components';

export default function BorderLine() {
    // 경계선
    return <BorderLineContainer />;
}

const BorderLineContainer = styled.div`
    height: 0.1rem;
    margin: 0.5rem 0;
    background-color: #E0E5ED;
`;
