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

function formatTZDate(tzDate) {
    const year = tzDate.getFullYear();
    const month = String(tzDate.getMonth() + 1).padStart(2, '0');
    const day = String(tzDate.getDate()).padStart(2, '0');
    const hours = String(tzDate.getHours()).padStart(2, '0');
    const minutes = String(tzDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

const CalendarLib = ({ mySleepInfo, scheduleData, plans }) => {
    const calendarRef = useRef(null);
    const [nextDay, setNextDay] = useState('');
    const [originRecommend, setOriginRecommend] = useState(
        scheduleData.recommend
    );
    const [changedSchedule, setChangedSchedule] = useState(scheduleData.recommend);
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
                collapseDuplicateEvents: false, // 중복일정
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
    }, [scheduleData, mySleepInfo, plans, changedSchedule]);

    useEffect(() => {
        const handleBeforeUpdateEvent = (eventInfo) => {
            const { event, changes } = eventInfo;

            // 여기서 수정된 정보 확인
            console.log('Updated event:', event);
            console.log('Changes:', changes);

            const updatedScheduleData = scheduleData.recommend.map((plan) => {
                if (plan.id === event.id) {
                    // 수정된 startTime과 endTime 가져오기
                    const updatedStartTime = formatTZDate(changes.start);
                    const updatedEndTime = formatTZDate(changes.end);

                    // 수정된 속성만 업데이트
                    return {
                        ...plan,
                        startTime: updatedStartTime,
                        endTime: updatedEndTime,
                    };
                }
                return plan;
            });
            console.log("updated", updatedScheduleData);

            // 업데이트된 scheduleData를 state로 설정
            setChangedSchedule(updatedScheduleData);

            // 여기서 수정된 정보를 활용하여 업데이트 등을 수행할 수 있음
            // 예: 서버에 수정된 정보를 전송하고, 상태를 업데이트하는 등의 작업
            // axios.post('/api/updateEvent', { eventId: event.id, changes })
            //     .then(response => {
            //         console.log('Event updated successfully:', response.data);
            //     })
            //     .catch(error => {
            //         console.error('Error updating event:', error);
            //     });
        };

        const calendarInstance = calendarRef.current.getInstance();

        // 이전에 등록된 이벤트 핸들러 제거
        calendarInstance.off('beforeUpdateEvent', handleBeforeUpdateEvent);

        // 새로운 이벤트 핸들러 등록
        calendarInstance.on('beforeUpdateEvent', handleBeforeUpdateEvent);
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
        changedSchedule.map((plan) => ({
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
            useDetailPopup={false}
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
