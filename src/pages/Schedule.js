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

import { getAccessToken } from '../localstorage/auth';
import axios from '../api/axios';
import requests from '../api/requests';
import { format } from 'date-fns';

export default function Schedule() {
    const currentDate = new Date();

    const [dayList, setDayList] = useState([]);
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
    const [datePlan, setDatePlan] = useState([]);
    const [transmitInfo, setTransmitInfo] = useState([]);
    const [combinedSchedule, setCombinedSchedule] = useState([]);
    const [changed, setChanged] = useState(false);

    var null_cnt = 0;

    const accessToken = getAccessToken();
    const dayKoList = ['일', '월', '화', '수', '목', '금', '토'];

    const handleDateClick = async (date) => {
        const formattedMonth = date.month < 10 ? `0${date.month}` : date.month;
        const formattedDay = date.date < 10 ? `0${date.date}` : date.date;
        const stringDate = `${date.year}-${formattedMonth}-${formattedDay}`;

        try {
            setChanged(true);
            const dailySchedule = await axios.get(
                `https://k3w9ml51qe.execute-api.ap-northeast-2.amazonaws.com/route?date=${stringDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(stringDate);
            const dailyPlan = await axios.get(
                `https://k3w9ml51qe.execute-api.ap-northeast-2.amazonaws.com/all?date=${stringDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setDatePlan(dailyPlan.data);
            setTransmitInfo(dailySchedule.data);
            setSelectedDay(date.date);

            const combinedArray = dailyPlan.data.concat(dailySchedule);
            setCombinedSchedule(combinedArray);
            console.log('교통정보', dailySchedule);
            console.log('plan정보', dailyPlan);
        } catch (error) {
            console.error('datePlan error', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const newDate = {
                date: selectedDay,
                month: (currentDate.getMonth() % 12) + 1,
                year: 1900 + currentDate.getYear(),
            };
            if (newDate.date !== undefined) {
                handleDayClick(newDate);
            }
        };

        fetchData();
    }, [accessToken, changed]);

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
                month: (currentDateCopy.getMonth() % 12) + 1,
                year: 1900 + currentDateCopy.getYear(),
            });

            currentDateCopy.setDate(currentDateCopy.getDate() + 1);
        }

        setDayList(dayList);

        // dayList 초기화나 API에서 스케줄 목록을 가져오는 코드
        // ...
    }, []);

    const handleDayClick = (date) => {
        setSelectedDay(date.day);
        handleDateClick(date);
    };

    return (
        <RootContainer>
            <Header label={'일정 확인'} />
            <DayContainer>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    loop={false} // loop 기능을 사용할 것인지
                    breakpoints={{
                        0: {
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
                                onClick={() => handleDayClick(item)}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </DayContainer>
            <ContentWrapper>
                <ScheduleContainer>
                    {datePlan.length === 0 ? (
                        <MessageBox>해당날짜에 일정정보가 없습니다</MessageBox>
                    ) : (
                        datePlan.map((item, index) => {
                            let time_diff;
                            if (index < datePlan.length - 1) {
                                const nextStartTime =
                                    datePlan[index + 1].startTime.slice(-5);
                                const slicedEndTime = item.endTime.slice(-5);
                                time_diff = calculateTimeDifference(
                                    slicedEndTime,
                                    nextStartTime
                                );
                            } else {
                                time_diff = 0;
                            }

                            return (
                                <ScheduleContent
                                    key={index}
                                    title={item.content}
                                    place={item.place}
                                    start_time={item.startTime.slice(-5)}
                                    end_time={item.endTime.slice(-5)}
                                    margin={time_diff}
                                />
                            );
                        })
                    )}

                    <TransmitBox>교통정보</TransmitBox>
                    {transmitInfo.length > 0 ? (
                        transmitInfo.map((item, index) =>
                            item !== null ? (
                                <TransfortationContent
                                    key={index}
                                    time={Math.ceil(item.total_time / 60)}
                                    type_list={item.mode_list}
                                    time_list={item.total_time_list}
                                    start_time={item.departure_time}
                                    end_time={item.arrival_time}
                                />
                            ) : (
                                ((null_cnt += 1), null)
                            )
                        )
                    ) : (
                        <></>
                    )}
                    {transmitInfo.length === 2 && null_cnt === 2 ? (
                        <MessageBox>해당날짜에 교통정보가 없습니다</MessageBox>
                    ) : (
                        <></>
                    )}
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
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 5px;
    }
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

const TransmitBox = styled.div`
    display: flex;
    font-size: x-large;
    margin: 3rem 1rem 1rem 1rem;
    justify-content: space-between;
    align-items: center;
`;

const MessageBox = styled.p`
    display: flex;
    justify-content: center;
    font-size: large;
    font-weight: 600;
    margin: 4rem 0;
`;
