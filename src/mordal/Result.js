import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { getAccessToken } from '../localstorage/auth';
import axios from '../api/axios';
import styled from 'styled-components';

const Result = ({ setResultModalOpen }) => {
    const [plans, setPlans] = useState([]);
    const accessToken = getAccessToken();
    const scheduleList = [
        {
            title: 'aaaa',
            place: '장소1',
            start_time: '2023-11-20 08:00',
            end_time: '2023-11-20 10:00',
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
        {
            title: 'aaaa',
            place: '장소7',
            start_time: '21:00',
            end_time: '22:00',
            type: 'schedule',
        },
    ];

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`/recommend`, {
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
    
    const initialEvents = scheduleList.map((plan) => {
        return {
            id: plan.id,
            title: plan.title,
            start: plan.start_time,
            end: plan.end_time,
            location: plan.place,
            category: 'time',
            isReadOnly: true,
        };
    });

    const handleSubmit = async () => {
        // 내용 무수히 추가
        setResultModalOpen(false);
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>AI일정 생성 결과</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setResultModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        <Calendar
                            usageStatistics={false}
                            view={'week'}
                            isReadOnly={true}
                            week={{
                                startDayOfWeek: 1,
                                daynames: [
                                    '월',
                                    '화',
                                    '수',
                                    '목',
                                    '금',
                                    '토',
                                    '일',
                                ],
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
                        <SubmitButton onClick={handleSubmit}>
                            저장하기
                        </SubmitButton>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default Result;

const ViewContainer = styled.div`
    z-index: 1;
    position: absolute;
`;

const RootContainer = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 30%);
    -webkit-tap-highlight-color: transparent;
    justify-content: center;
    padding: 12vh 1.5rem;
`;

const ModalContainer = styled.div`
    position: relative;
    background: white;
    border-radius: 0.5rem;
    transition: all 400ms ease-in-out 2s;
    padding: 2rem;
`;

const ModalTitle = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    align-items: center;
    color: black;
`;

const ModalDetail = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
`;

const InputList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;

    flex: 1;
    overflow-y: auto;
    overflow-x: auto;
    scroll-behavior: smooth;
    max-height: 60vh;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        background-color: white;
    }

    &::-webkit-scrollbar-thumb {
        background-color: red;
        border-radius: 1rem;
    }
`;

const SubmitButton = styled.button`
    background-color: #0acf83;
    color: black;
    font-size: large;
    border: 0.1rem solid #0acf83;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    &:hover {
        opacity: 0.7;
    }
`;
