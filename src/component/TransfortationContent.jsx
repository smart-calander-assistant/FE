import React from 'react'
import styled from 'styled-components';
import { IoSubway, IoFootsteps } from 'react-icons/io5';
import { AiFillCar } from 'react-icons/ai';

const TransfortationContent = ( {time, type} ) => {
    let iconContent;
    let title;

    if (type === 'transfortation') {
      iconContent = (
        <IconContainer>
            <IoSubway size={'2rem'}/>
        </IconContainer>
      );
      title = '대중교통';
    } else if (type === 'car') {
      iconContent = (
        <IconContainer>
            <AiFillCar size={'2rem'}/>
        </IconContainer>
      );
      title = '자동차';
    } else if (type === 'onfoot') {
      iconContent = (
        <IconContainer>
            <IoFootsteps size={'2rem'}/>
        </IconContainer>
      );
      title = '도보';
    }
  return (
    <RootContainer height={time}>
        <ScheduleContainer>
            {iconContent}
            <TitleBox>
                <p>{title} 이용</p>
                <p>{time} 소요 예정</p>
            </TitleBox>
        </ScheduleContainer>
    </RootContainer>
  )
}

export default TransfortationContent;


const RootContainer = styled.div`
    display: flex;
    margin: 0.5rem;
    padding: 1rem;
    background-color: #FFBE0B;
    border-radius: 1rem;
    width: 100%;
    height: ${(props) => props.height / 30}rem;
`

const ScheduleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const IconContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    background-color: #F9D7B0;
    border-radius: 1rem;
`

const TitleBox = styled.p`  
    display: flex;
    flex-direction: column;
    font-weight: 600;
    padding: 0 1rem;
    justify-content: center;
    gap: 0.25rem;
`