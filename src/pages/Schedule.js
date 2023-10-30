import React from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import ScheduleContent from '../component/ScheduleContent';
import { IoDesktop, IoDesktopOutline } from 'react-icons/io5';
import DayCard from '../component/DayCard';
import TransfortationContent from '../component/TransfortationContent';
import TimeTable from '../component/TimeTable';

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

    const scheduleList = [
        {
            title: 'aaaa',
            place: '장소1',
            start_time: '08:00',
            end_time: '10:00',
            type: 'schedule',
        },
        {
            time: 60,
            start_time: '10:00',
            end_time: '11:00',
            type: 'transfortation',
        },
        {
            title: 'aaaa',
            place: '장소3',
            start_time: '11:30',
            end_time: '13:00',
            type: 'schedule',
        },
        {
            title: 'aaaa',
            place: '장소5',
            start_time: '16:00',
            end_time: '18:00',
            type: 'schedule',
        },
        { time: 90, start_time: '18:00', end_time: '19:30', type: 'car' },
        {
            title: 'aaaa',
            place: '장소7',
            start_time: '21:00',
            end_time: '22:00',
            type: 'schedule',
        },
        { time: 20, start_time: '22:00', end_time: '22:20', type: 'onfoot' },
    ];

    const startTime = '08:00';
    const endTime = '22:00';

    return (
        <RootContainer>
            <Header label={'일정 확인'} />
            <DayContainer>
                {dayList.map((item, index) => (
                    <DayCard day={item.day} date={item.date} index={index} />
                ))}
            </DayContainer>
            <ContentWrapper>
            <ScheduleContainer>
                    {scheduleList.map((item, index) => {
                        let time_diff;
                        if (index < scheduleList.length - 1) {
                            const nextStartTime = scheduleList[index + 1].start_time;
                            time_diff = calculateTimeDifference(item.end_time, nextStartTime);
                        } else {
                            time_diff = 0;
                        }

                        if (item.type === 'schedule') {
                            return (
                                <ScheduleContent
                                    key={index}
                                    title={item.title}
                                    place={item.place}
                                    start_time={item.start_time}
                                    end_time={item.end_time}
                                    margin={time_diff}
                                />
                            );
                        } else {
                            return (
                                <TransfortationContent
                                    key={index}
                                    time={item.time}
                                    type={item.type}
                                    start_time={item.start_time}
                                    end_time={item.end_time}
                                    margin={time_diff}
                                />
                            );
                        }
                    })}
                </ScheduleContainer>
                {/* <TimeTable startTime={startTime} endTime={endTime} timeInterval={60} scheduleList={scheduleList}/> */}
            </ContentWrapper>
            <Footer label={'schedule'} />
        </RootContainer>
    );
}

function calculateTimeDifference(startTime, endTime) {
    // 시간을 분으로 변환한 다음 차이 계산
    const startTimeParts = startTime.split(':').map(Number);
    const endTimeParts = endTime.split(':').map(Number);
    const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
    const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
    return endMinutes - startMinutes;
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
    margin-bottom: 0.5rem;
`;

const ContentWrapper = styled.div`
    display: flex;
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
        background-color: #f5f5f5;
    }
`;

const ScheduleContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    /* gap: 1rem; */
`;