import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import { styled } from 'styled-components';

export const HorizonScrallBar = React.memo(({ children }) => {

    // 가로방향 스크롤바 컴포넌트
    return (
        <HorizontalScroll>
            <ScrollBarContainer>{children}</ScrollBarContainer>
        </HorizontalScroll>
    );
});

const ScrollBarContainer = styled.div`
    grid-template-rows: auto auto;
    grid-auto-flow: column;
`;
