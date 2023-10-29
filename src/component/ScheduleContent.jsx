import React from 'react';
import styled from 'styled-components';

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
                <TitleBox>
                    <p>{title}</p>
                    <p>{place}</p>
                </TitleBox>
            </ScheduleContainer>
        </RootContainer>
    );
};

export default ScheduleContent;

const RootContainer = styled.div`
    display: flex;
    /* width: 100%; */
    /* height: ${(props) => props.height / 30}rem; */
    margin-bottom: ${(props) => props.margin / 60}rem;
`;

const ScheduleContainer = styled.div`
    display: flex;
    flex: 1;
    background-color: #de496e;
    margin: 0.25rem;
    padding: 1rem;
    border-radius: 1rem;
`;

const TitleBox = styled.p`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: space-between;
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
