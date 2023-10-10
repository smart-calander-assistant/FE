import React from 'react'
import styled from 'styled-components';

const ScheduleContent = ( {start_time, end_time, title, place, } ) => {
  return (
    <RootContainer>
        <TimeContainer>
            <p>{start_time}</p>
            <p style={{display: 'flex', justifyContent: 'center'}}>~</p>
            <p>{end_time}</p>
        </TimeContainer>
        <BorderLineContainer />
        <ScheduleContainer>
            <TitleBox>{title}</TitleBox>
            <p>{place}</p>
        </ScheduleContainer>
    </RootContainer>

  )
}

export default ScheduleContent;


const RootContainer = styled.div`
    display: flex;
    margin: 1rem;
    padding: 1rem;
    background-color: #bee9e8;
    border-radius: 1rem;
`

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;

    font-size: large;
    font-weight: 500;
`
const BorderLineContainer = styled.div`
    width: 0.1rem;
    margin: 0 1rem;
    background-color: #1b4965;
`

const ScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const TitleBox = styled.p`
    font-size: larger;
    font-weight: 500;
`