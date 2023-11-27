import React, { useState } from 'react';
import { IoSubway, IoFootsteps } from 'react-icons/io5';
import styled from 'styled-components';

const TransIcon = ({ type, time }) => {
    let iconContent;
    let title;

    if (type === 'WALKING') {
        iconContent = (
            <IconContainer>
                <IoFootsteps size={'2rem'} />
            </IconContainer>
        );
        title = '도보';
    } else if (type === 'TRANSIT') {
        iconContent = (
            <IconContainer>
                <IoSubway size={'2rem'} />
            </IconContainer>
        );
        title = '대중교통';
    }
    
    return (
        <ScheduleContainer>
            {iconContent}
            <TitleBox gap={time}>
                <p>{title} 이용</p>
                <p>{time}분 소요</p>
            </TitleBox>
        </ScheduleContainer>
    );
};

export default TransIcon;

const ScheduleContainer = styled.div`
    display: flex;
    flex: 1;
    margin: 0.25rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #ffbe0b;
`;

const IconContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    background-color: #f9d7b0;
    border-radius: 1rem;
`;

const TitleBox = styled.p`
    display: flex;
    flex-direction: column;
    font-weight: 600;
    padding: 0 1rem;
    justify-content: center;
    gap: ${(props) => (props.gap < 60 ? 0 : 0.25)}rem;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    align-items: center;
    justify-content: center;
`;

const TimeSlot = styled.div`
    color: gray;
`;
