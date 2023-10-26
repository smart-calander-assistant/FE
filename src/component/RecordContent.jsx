import React from 'react'
import styled from 'styled-components';
import { IoClipboardOutline, IoFootball } from 'react-icons/io5';

const RecordContent = ( {title, content, type, percent, } ) => {
    let iconContent;

    if (type === 'goal') {
      iconContent = (
        <IconContainer>
            <IoFootball size={'2rem'}/>
        </IconContainer>
      );
    } else if (type === 'achievement') {
      iconContent = (
        <IconContainer>
            <IoClipboardOutline size={'2rem'}/>
        </IconContainer>
      );
    }

  return (
    <RootContainer>
        <ScheduleContainer>
            {iconContent}
            <TitleBox>
                <p>{title}</p>
                <p>{content}</p>
            </TitleBox>
        </ScheduleContainer>
    </RootContainer>
  )
}

export default RecordContent;


const RootContainer = styled.div`
    display: flex;
    margin: 0.5rem;
    padding: 1rem;
    background-color: #de496e;
    border-radius: 1rem;
`

const ScheduleContainer = styled.div`
    display: flex;
    justify-content: center;
`

const IconContainer = styled.div`
    display: flex;
    padding: 0.5rem;
    margin: 0 0.5rem 0 0;
    background-color: #F9B0D7;
    border-radius: 1rem;
`

const TitleBox = styled.p`  
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    justify-content: space-between;
    gap: 0.25rem;
    color: white;
`