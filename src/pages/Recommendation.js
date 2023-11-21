import React, {useEffect, useState} from 'react';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css'
import {getAccessToken} from "../localstorage/auth";
import axios from "../api/axios";

export default function Recommendation() {
    const [plans, setPlans] = useState([]);
    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`/recommend`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                setPlans(response.data);
            } catch (error) {
                console.error('fetching error', error);
            }
        };

        fetchData();
    }, []);

    const initialEvents = plans.map(plan => {
        return {
            id: plan.id,
            title: plan.content,
            start: plan.startTime,
            end: plan.endTime,
            location: plan.place,
            category: 'time',
            isReadOnly: true,
        }
    })

    return (
        <Calendar
            usageStatistics={false}
            view={'week'}
            isReadOnly={true}
            week={{
                startDayOfWeek: 1,
                daynames: ['월', '화', '수', '목', '금', '토', '일'],
                showNowIndicator: false,
                eventView: ['time'],
                taskView: false,
            }}
            gridSelection={{
                enableClick: false,
                enableDblClick: false,
            }}
            events={initialEvents}
        />
    );
}