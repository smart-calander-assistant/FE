import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import Calendar from '@toast-ui/react-calendar';
import '../styles/Result.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { getAccessToken } from '../localstorage/auth';
import 'tui-calendar/dist/tui-calendar.css';

// scheduleData.recommend : 추천된 일정
// scheduleData.transform : 추천된 교통정보
const CalendarLib = ({ mySleepInfo, scheduleData, plans }) => {
    const calendarRef = useRef(null);
    const [nextDay, setNextDay] = useState('');
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
                    const startTime = new Date(schedule.start).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                      });
                      const endTime = new Date(schedule.end).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                      });
                    return `${startTime} - ${endTime}<br/>${
                        schedule.title
                    }<p></p><br/>장소: ${schedule.location || '미입력'}`;
                },
            },
        });

        // 특정 날짜로 이동
        calendarInstance.setDate(startDate);
    }, [scheduleData, mySleepInfo, plans]);

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
        }))
    );

    return (
        <Calendar
            ref={calendarRef}
            usageStatistics={false}
            view={'week'}
            useDetailPopup={true}
            isReadOnly={true}
            gridSelection={{
                enableClick: false,
                enableDblClick: false,
            }}
            events={initialEvents}
        />
    );
};

export default CalendarLib;
