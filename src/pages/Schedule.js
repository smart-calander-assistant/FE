import React from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import ScheduleContent from '../component/ScheduleContent';
import { IoDesktop, IoDesktopOutline } from 'react-icons/io5';
import DayCard from '../component/DayCard';
import TransfortationContent from '../component/TransfortationContent';

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

    const timeSlotList = generateTimeSlots(startTime, endTime, 60); // 1시간 간격으로 생성

    return (
        <RootContainer>
            <Header label={'일정 확인'} />
            <DayContainer>
                {dayList.map((item, index) => (
                    <DayCard day={item.day} date={item.date} index={index} />
                ))}
            </DayContainer>
            <ContentWrapper>
                <TimeContainer>
                    {timeSlotList.map((timeSlot, index) => (
                        <TimeSlot key={index}>{timeSlot}</TimeSlot>
                    ))}
                </TimeContainer>
                <ScheduleContainer>
                {scheduleList.map((item) =>
                    item.type === 'schedule' ? (
                        <ScheduleContent
                            title={item.title}
                            place={item.place}
                            start_time={item.start_time}
                            end_time={item.end_time}
                        />
                    ) : (
                        <TransfortationContent
                            time={item.time}
                            type={item.type}
                        />
                    )
                )}
                </ScheduleContainer>
            </ContentWrapper>
            <Footer label={'schedule'} />
        </RootContainer>
    );
}

function generateTimeSlots(startTime, endTime, step) {
    const timeSlots = [];
    let currentTime = startTime;

    while (currentTime <= endTime) {
        timeSlots.push(currentTime);
        currentTime = addMinutes(currentTime, step);
    }

    return timeSlots;
}

function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(
        2,
        '0'
    )}`;
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
    flex-direction: column;
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    gap: 2rem;
`;

const TimeSlot = styled.div`
    color: gray;
`;