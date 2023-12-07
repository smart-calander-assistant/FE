import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import Calendar from '@toast-ui/react-calendar';
import '../styles/Result.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { getAccessToken } from '../localstorage/auth';
import 'tui-calendar/dist/tui-calendar.css';

function formatEpochTime(epochTime) {
    const date = new Date(epochTime * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedTime;
}

const CalendarLib = ({ mySleepInfo, scheduleData, plans }) => {
    const calendarRef = useRef(null);
    const [nextDay, setNextDay] = useState('');
    const [originRecommend, setOriginRecommend] = useState(
        scheduleData.recommend
    );
    const [selectedPlan, setSelectedPlan] = useState(null);
    const accessToken = getAccessToken();

    useEffect(() => {
        const getCurrentDay = async () => {
            const currentDate = new Date();
            const dayIndex = currentDate.getDay(); // 일요일 : 0
            setNextDay((dayIndex + 1) % 7);
        };
        getCurrentDay();
    }, []);

    useEffect(() => {
        const calendarInstance = calendarRef.current.getInstance();

        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 1);

        // defaultView 옵션을 통해 시작 뷰와 시작 날짜 설정
        calendarInstance.setOptions({
            week: {
                startDayOfWeek: nextDay,
                dayNames: ['월', '화', '수', '목', '금', '토', '일'],
                showNowIndicator: false, // 현재 시간선 표시
                eventView: ['time'],
                taskView: false,
                narrowWeekend: false, // 주말의 너비
                workweek: false, // 주말 제외
                showTimezoneCollapseButton: false, // sub타임존 설정
                timezonesCollapsed: false, // sub타임존 설정시 추가설정
                hourStart: mySleepInfo, // 시작시간
                hourEnd: 24, // 종료시간
                collapseDuplicateEvents: true, // 중복일정
            },
            taskView: false, // taskView 비활성화 (선택적)
            scheduleView: ['time'], // scheduleView 설정 (선택적)
            template: {
                time(schedule) {
                    const startTime = new Date(
                        schedule.start
                    ).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    });
                    const endTime = new Date(schedule.end).toLocaleTimeString(
                        'en-US',
                        {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                        }
                    );
                    return `${startTime} - ${endTime}<br/>${
                        schedule.title
                    }<p></p><br/>${
                        schedule.location ? `장소: ${schedule.location}` : ''
                    }`;
                },
            },
        });

        // 특정 날짜로 이동
        calendarInstance.setDate(startDate);
    }, [scheduleData, mySleepInfo, plans]);

    useEffect(() => {
        const handleBeforeUpdateSchedule = (event) => {
            const { schedule, start, end } = event;
            console.log(
                'Schedule moved:',
                schedule.id,
                'New Start:',
                start,
                'New End:',
                end
            );

            // 여기서 서버에 업데이트 요청 등을 할 수 있음
        };

        const handleBeforeUpdateEvent = (event) => {
            const { schedule } = event;

            // 클릭된 스케쥴의 정보를 상태에 저장
            setSelectedPlan(schedule);

            // 여기서 수정 창을 띄울 수 있음
            // 예: 모달을 열거나 다른 방식으로 수정 창을 띄우세요
        };

        const calendarInstance = calendarRef.current.getInstance();

        // 이전에 등록된 이벤트 핸들러들 제거
        calendarInstance.off(
            'beforeUpdateSchedule',
            handleBeforeUpdateSchedule
        );
        calendarInstance.off('beforeUpdateEvent', handleBeforeUpdateEvent);

        // 새로운 이벤트 핸들러들 등록
        calendarInstance.on('beforeUpdateSchedule', handleBeforeUpdateSchedule);
        calendarInstance.on('beforeUpdateEvent', handleBeforeUpdateEvent);
    }, [scheduleData, mySleepInfo, plans]);

    // 클릭된 스케쥴의 정보를 수정 창에서 수정한 후, 해당 정보로 업데이트
    const handlePlanUpdate = (updatedPlan) => {
        // 여기서 서버에 업데이트 요청 등을 할 수 있음
        console.log('Updated plan:', updatedPlan);

        // 예시: 업데이트된 정보로 상태를 업데이트
        setSelectedPlan(null); // 수정이 끝났으니 선택된 스케쥴 초기화
    };

    const initialEvents = [].concat(
        plans.map((plan) => ({
            id: plan.id,
            title: plan.content,
            start: plan.startTime,
            end: plan.endTime,
            location: plan.place,
            color: 'black',
            backgroundColor: '#a9def9',
            borderColor: '#3a86ff',
            category: 'time',
            isReadOnly: true,
        })),
        scheduleData.recommend.map((plan) => ({
            id: plan.id,
            title: plan.content,
            start: plan.startTime,
            end: plan.endTime,
            location: plan.place,
            color: 'black',
            backgroundColor: '#f1a1b0',
            dragBackgroundColor: 'red',
            borderColor: '#ff486a',
            category: 'time',
            isReadOnly: false,
        })),
        scheduleData.transport
            .map((dayPlans) =>
                dayPlans
                    .filter((plan) => plan !== null)
                    .map((plan) => ({
                        id: plan.id,
                        title: '교통정보',
                        start: formatEpochTime(plan.departure_time),
                        end: formatEpochTime(plan.arrival_time),
                        location: '',
                        color: 'black',
                        backgroundColor: '#eee1bd',
                        borderColor: '#ffbe0b',
                        category: 'time',
                        isReadOnly: true,
                    }))
            )
            .flat()
    );

    return (
        <Calendar
            ref={calendarRef}
            usageStatistics={false}
            view={'week'}
            useDetailPopup={true}
            // isReadOnly={true}
            gridSelection={{
                enableClick: false,
                enableDblClick: false,
            }}
            events={initialEvents}
        />
    );
};

export default CalendarLib;
