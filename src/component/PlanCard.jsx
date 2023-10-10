import React from 'react'
import styled from 'styled-components'

const PlanCard = ({id, start_time, end_time, place, title}) => {
  return (
    <PlanContainer>
        <BorderLineContainer />
        <ScheduleContainer>
            <TitleBox>{title}</TitleBox>
            <p>{place}</p>
        </ScheduleContainer>
        <TimeContainer>
            <p>{start_time}</p>
            <p style={{display: 'flex', justifyContent: 'center'}}>~</p>
            <p>{end_time}</p>
        </TimeContainer>
    </PlanContainer>
  )
}


export default PlanCard;


const PlanContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    margin: 0.5rem;
    /* background-color: #5FA8D3; */
    border-radius: 1rem;
`
const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: large;
    font-weight: 500;
    flex: 1;
`
const BorderLineContainer = styled.div`
    width: 0.3rem;
    margin: 0 0.5rem 0 0;
    background-color: #1b4965;
`

const ScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0.5rem;
`

const TitleBox = styled.p`
    font-size: larger;
    font-weight: 500;
`