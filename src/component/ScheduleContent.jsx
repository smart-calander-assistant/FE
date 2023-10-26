import React from 'react';
import styled from 'styled-components';

const ScheduleContent = ({ title, place, start_time, end_time }) => {
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
        time =
            (endTime[0] - startTime[0]) * 60 + (endTime[1] - startTime[1]);
    }
    return (
        <RootContainer height={time}>
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
    margin: 0.5rem;
    padding: 1rem;
    background-color: #de496e;
    border-radius: 1rem;
    width: 100%;
    height: ${(props) => props.height / 30}rem;
`;

const ScheduleContainer = styled.div`
    display: flex;
`;

const TitleBox = styled.p`
    display: flex;
    flex-direction: column;
    color: white;
    justify-content: space-between;
`;