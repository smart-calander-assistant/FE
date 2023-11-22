import React, { useEffect, useState } from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import ScheduleContent from '../component/ScheduleContent';
import DayCard from '../component/DayCard';
import TransfortationContent from '../component/TransfortationContent';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

export default function Schedule() {
    const currentDate = new Date();

    const [dayList, setDayList] = useState([]);
    const [selectedDay, setSelectedDay] = useState(new Date(currentDate).getDate());
    // const [scheduleList, setScheduleList] = useState([]);
    const dayKoList = ['일', '월', '화', '수', '목', '금', '토'];

    useEffect(() => {
        const monthLater = new Date(currentDate);
        monthLater.setDate(currentDate.getDate() + 28);

        // 현재 날짜부터 4주까지의 모든 날짜를 생성합니다.
        const dayList = [];
        let currentDateCopy = new Date(currentDate);
        while (currentDateCopy <= monthLater) {
            dayList.push({
                day: dayKoList[currentDateCopy.getDay()],
                date: currentDateCopy.getDate(),
                month: currentDateCopy.getMonth(),
            });

            currentDateCopy.setDate(currentDateCopy.getDate() + 1);
        }

        setDayList(dayList);

        // scheduleList 초기화나 API에서 스케줄 목록을 가져오는 코드
        // ...
    }, []);

    useEffect(() => {
        
    }, [selectedDay])

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

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    return (
        <RootContainer>
            <Header label={'일정 확인'} />
            <DayContainer>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    loop={false} // loop 기능을 사용할 것인지
                    breakpoints={{ 0: {
                        slidesPerView: 7, // 한번에 보이는 슬라이드 개수
                        slidesPerGroup: 5, // 몇개씩 슬라이드 할지
                        },
                    }}
                >
                    {dayList.map((item) => (
                        <SwiperSlide>
                            <DayCard
                                day={item.day}
                                date={item.date}
                                month={item.month}
                                selected={selectedDay === item.date}
                                onClick={() => handleDayClick(item.date)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </DayContainer>
            <ContentWrapper>
                <ScheduleContainer>
                    {scheduleList.map((item, index) => {
                        let time_diff;
                        if (index < scheduleList.length - 1) {
                            const nextStartTime =
                                scheduleList[index + 1].start_time;
                            time_diff = calculateTimeDifference(
                                item.end_time,
                                nextStartTime
                            );
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
    width: 100vw;
`;

const DayContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    scroll-behavior: smooth;
`;

const ContentWrapper = styled.div`
    display: flex;
    overflow-y: auto;
    scroll-behavior: smooth;

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
