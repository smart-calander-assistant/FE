import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import Calendar from '@toast-ui/react-calendar';
import '../styles/Result.css';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { getAccessToken } from '../localstorage/auth';

const CalendarLib = ({ mySleepInfo }) => {
    const [nextDay, setNextDay] = useState('');

    const accessToken = getAccessToken();

    useEffect(() => {
        const getCurrentDay = async () => {
            const currentDate = new Date();
            const dayIndex = currentDate.getDay(); // 일요일 : 0
            setNextDay((dayIndex + 1) % 7);
        }
        getCurrentDay();
    }, []);

    const scheduleList = [
        {
            title: '캡스톤 과제하기',
            place: '중앙대학교 생활관',
            start_time: '2023-12-5 08:00',
            end_time: '2023-12-5 10:00',
            type: 'schedule',
        },
    ];

    const initialEvents = scheduleList.map((plan) => {
        return {
            id: plan.id,
            title: plan.title,
            start: plan.start_time,
            end: plan.end_time,
            location: plan.place,
            color: 'black',
            backgroundColor: 'green',
            dragBackgroundColor: 'red',
            borderColor: 'black',
            category: 'time',
            isReadOnly: true,
        };
    });

    return (
        <Calendar
            usageStatistics={false}
            view={'week'}
            useDetailPopup={true}
            isReadOnly={true}
            week={{
                startDayOfWeek: nextDay, // 요일시작
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
                collapseDuplicateEvents: false, // 중복일정
            }}
            gridSelection={{
                enableClick: false,
                enableDblClick: false,
            }}
            events={initialEvents}
        />
    );
};

export default CalendarLib;
