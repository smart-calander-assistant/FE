import React from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import ScheduleContent from '../component/ScheduleContent';
import { IoDesktop, IoDesktopOutline } from 'react-icons/io5';
import DayCard from '../component/DayCard';

export default function Schedule() {
    const dayList = [
        { day: '월', date: 18 },
        { day: '화', date: 19 },
        { day: '수', date: 20 },
        { day: '목', date: 21 },
        { day: '금', date: 22 },
        { day: '토', date: 23 },
        { day: '일', date: 24 },
    ];

    return (
        <RootContainer>
            <Header label={'일정 확인'} />
            <ContentWrapper>
                <DayContainer>
                    {dayList.map((item, index) => (
                        <DayCard
                            day={item.day}
                            date={item.date}
                            index={index}
                        />
                    ))}
                </DayContainer>
            </ContentWrapper>
            <Footer label={'schedule'} />
        </RootContainer>
    );
}

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const DayContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
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
