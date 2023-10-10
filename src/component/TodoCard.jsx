import React from 'react'
import styled from 'styled-components';

const TodoCard = ({id, deadline, priority, place, title }) => {
  return (
    <TodoContainer>
        <BorderLineContainer />
        <ScheduleContainer>
            <TitleBox>{title}</TitleBox>
            <p>{place}</p>
        </ScheduleContainer>
        <TimeContainer>
            <p>마감기한 : {deadline}</p>
            <p>중요도 : {priority}</p>
        </TimeContainer>
    </TodoContainer>
  )
}

export default TodoCard;


const TodoContainer = styled.div`
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
    font-size: large;
    font-weight: 500;
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