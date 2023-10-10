import React from 'react';
import { styled } from 'styled-components';

const Banner = ({ img }) => {
    // 배너
    return <BannerContainer>{img}</BannerContainer>;
};

export default Banner;

const BannerContainer = styled.div`
    height: 6.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    background-color: black;
`;
