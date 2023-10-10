import React from 'react'
import Footer from '../component/Footer'
import styled from 'styled-components'
import Header from '../component/Header'
import ScheduleContent from '../component/ScheduleContent'
import { IoDesktop, IoDesktopOutline } from 'react-icons/io5'


export default function Schedule() {
  return (
    <RootContainer>
        <Header label={'일정'}/>
        <DateContainer>
            10월 9일
            <IconContainer>
                <IoDesktopOutline size={'1.5rem'} />
            </IconContainer>
        </DateContainer>
        <ContentWrapper>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
            <ScheduleContent start_time={'13:00'} end_time={'14:00'} title={'점심'} place={'중앙대학교'}/>
        </ContentWrapper>
        <Footer label={'schedule'} />
    </RootContainer>
  )
}


const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

`;

const DateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #62B6CB;
    padding: 1rem;

    font-size: larger;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;

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