import React from 'react';
import styled from 'styled-components';
import { IoCalendarClearOutline } from 'react-icons/io5';

const ScheduleContent = ({ title, place, start_time, end_time, margin }) => {
    const startTime = start_time.split(':').map(Number);
    const endTime = end_time.split(':').map(Number);

    let time;
    if (
        endTime[0] < startTime[0] ||
        (endTime[0] === startTime[0] && endTime[1] < startTime[1])
    ) {
        time =
            (24 - startTime[0] + endTime[0]) * 60 - startTime[1] + endTime[1];
    } else {
        time = (endTime[0] - startTime[0]) * 60 + (endTime[1] - startTime[1]);
    }

    return (
        <RootContainer height={time} margin={margin}>
            <TimeContainer>
                <TimeSlot>{start_time}</TimeSlot>
                <TimeSlot> ~ </TimeSlot>
                <TimeSlot>{end_time}</TimeSlot>
            </TimeContainer>
            <ScheduleContainer>
                <IconContainer>
                    <IoCalendarClearOutline size={'2rem'} />
                </IconContainer>
                <TextContainer>
                    <TitleBox>{title}</TitleBox>
                    <PlaceBox>{place}</PlaceBox>
                </TextContainer>
            </ScheduleContainer>
        </RootContainer>
    );
};

export default ScheduleContent;

const RootContainer = styled.div`
    display: flex;
    margin-bottom: ${(props) => Math.max(props.margin / 60, 0.1)}rem;
`;
const ScheduleContainer = styled.div`
    display: flex;
    flex: 1;
    background-color: #de496e;  
    color: white;
    margin: 0 1rem 0 0;
    padding: 1rem;
    border-radius: 1rem;
    gap: 1rem;
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

const TitleBox = styled.p`
    font-size: large;
`;

const PlaceBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    /* justify-content: space-between; */
`

const IconContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    margin: 0 0.5rem 0 0    ;
    background-color: #f9b0d7;
    border-radius: 1rem;
    align-items: center;
    color: black;
`;
