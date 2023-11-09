import React from 'react'
import styled from 'styled-components'

const ExplainContent = ({title, content, onClick}) => {
  return (
    <RootContainer onClick={onClick}>
        <TitleBox>{title}</TitleBox>
        <ContentBox>{content}</ContentBox>
    </RootContainer>
  )
}

export default ExplainContent;


const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;

`

const TitleBox = styled.div`
    font-weight: 600;
    font-size: larger;
`

const ContentBox = styled.div`
    
`