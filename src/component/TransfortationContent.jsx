import React from 'react';
import styled from 'styled-components';
import { IoSubway, IoFootsteps } from 'react-icons/io5';
import { AiFillCar } from 'react-icons/ai';

const TransfortationContent = ({ time, type, start_time, end_time, margin }) => {
    let iconContent;
    let title;

    if (type === 'transfortation') {
        if (time >= 60) {
            iconContent = (
                <IconContainer>
                    <IoSubway size={'2rem'} />
                </IconContainer>
            );
        }
        title = '대중교통';
    } else if (type === 'car') {
        if (time >= 60) {
            iconContent = (
                <IconContainer>
                    <AiFillCar size={'2rem'} />
                </IconContainer>
            );
        }
        title = '자동차';
    } else if (type === 'onfoot') {
        if (time >= 0) {
            iconContent = (
                <IconContainer>
                    <IoFootsteps size={'2rem'} />
                </IconContainer>
            );
        }
        title = '도보';
    }
    return (
        <RootContainer height={time} margin={margin}>
            <TimeContainer>
                <TimeSlot>{start_time}</TimeSlot>
                <TimeSlot> ~ </TimeSlot>
                <TimeSlot>{end_time}</TimeSlot>
            </TimeContainer>
            <ScheduleContainer>
                {iconContent}
                <TitleBox gap={time}>
                    <p>{title} 이용</p>
                    <p>{time} 소요 예정</p>
                </TitleBox>
            </ScheduleContainer>
        </RootContainer>
    );
};

export default TransfortationContent;

const RootContainer = styled.div`
    display: flex;
    /* width: 100%; */
    /* height: ${(props) => props.height / 30}rem; */
    margin-bottom: ${(props) => props.margin / 60}rem;
`;

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