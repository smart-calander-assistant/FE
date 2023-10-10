import React from 'react'
import Footer from '../component/Footer'
import styled from 'styled-components'
import Header from '../component/Header'

export default function Setting() {
  return (
    <RootContainer>
        <Header label={'설정'}/>
        <ContentWrapper>
            <RecordContainer>
                <ContentBox>기록페이지</ContentBox>
                <RecordBox>일정 수행 : 8 / 10</RecordBox>
                <RecordBox>성공적인 하루 : 4 / 10</RecordBox>
            </RecordContainer>
            <ContentBox>내 정보수정</ContentBox>
            <ContentBox>로그아웃</ContentBox>
            <ContentBox>1:1 문의</ContentBox>
            <ContentBox>회원탈퇴</ContentBox>
        </ContentWrapper>
        <Footer label={'setting'} />
    </RootContainer>
  )
}


const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

`;

const RecordContainer = styled.div`
    display: grid;
    margin: 1rem 0;
    background-color: #62B6CB;
`
const RecordBox = styled.div`
    margin: 0.5rem 1rem;
    padding: 1rem 0;
    background-color: #BEE9E8;
    border-radius: 0.5rem;
`

const ContentBox = styled.div`
    margin: 1rem;

`
const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: hidden;
    scroll-behavior: smooth;

    &:hover {
        overflow-y: auto;
    }

    &::-webkit-scrollbar {
        width: 5px;
    }
    /* &::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 1rem;
    } */
    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;