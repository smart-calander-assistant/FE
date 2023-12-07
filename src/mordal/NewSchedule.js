import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { getAccessToken } from '../localstorage/auth';
import axios from '../api/axios';
import requests from './../api/requests';
import styled from 'styled-components';
import '../styles/Result.css';
import Swal from 'sweetalert2';
import CalendarLib from '../component/CalendarLib';

const NewSchedule = ({ setNewScheduleModalOpen, days }) => {
    const [plans, setPlans] = useState([]);
    const [recommendPlans, setRecommendPlans] = useState([]);
    const [recommendPriority, setRecommendPriority] = useState([]);
    const [modifyPlans, setModifyPlans] = useState([]);
    const [render, setRender] = useState(false);
    const [mySleepInfo, setMySleepInfo] = useState('');

    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                const recommends = await axios.get(`https://k3w9ml51qe.execute-api.ap-northeast-2.amazonaws.com${requests.fetchRecommend}?date=${days}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setRecommendPlans(recommends.data);
                setRecommendPriority(recommends.data.priority);
                setRender(true);
                console.log("recommended 데이터", recommends);

                const plan = await axios.get(`${requests.fetchPlan}/date/${days}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })

                setPlans(plan.data);
                console.log("plan 데이터", plan);

                const sleepInfo = await axios.get(
                    `${requests.fetchLife}?life=${'SLEEPING_TIME'}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setMySleepInfo(parseInt(sleepInfo.data[0].endTime.split(":")[0], 10));
                console.log("sleepInfo", sleepInfo);
            } catch (error) {
                console.error('fetching error', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        // 내용 무수히 추가
        // recommendPlans에는 추천받은 Plan값
        // modifyPlans는 recommendPlans를 수정한 Plan값
        // 두값을 비교해서 차이점을 POST 해야함

        const realWeight = await axios.get(`${requests.fetchWeight}/weight`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        let realWeightInfo = ({
            DEADLINE: realWeight.data.DEADLINE,
            NOT_FOCUS_TIME: realWeight.data.NOT_FOCUS_TIME,
            PRIORITY: realWeight.data.PRIORITY,
            DISTANCE: realWeight.data.DISTANCE,
            FOCUS_TIME: realWeight.data.FOCUS_TIME,
        });

        for (const modifiedPlan of modifyPlans) {
            const matchingRecommend = recommendPlans.recommend.find(plan => plan.id === modifiedPlan.id);
            if (matchingRecommend && (matchingRecommend.startTime !== modifiedPlan.startTime || matchingRecommend.endTime !== modifiedPlan.endTime)) {
                const original = findMatchingDictionary(matchingRecommend.startTime, matchingRecommend.endTime);
                const modified = findMatchingDictionary(modifiedPlan.startTime, modifiedPlan.endTime);

                console.log('Original:', original);
                console.log('Modified:', modified);

                let deadline = realWeightInfo.DEADLINE;
                let distance = realWeightInfo.DISTANCE;
                let focusTime = realWeightInfo.FOCUS_TIME;
                let notFocusTime = realWeightInfo.NOT_FOCUS_TIME;
                let priority = realWeightInfo.PRIORITY;

                if (original.DEADLINE < modified.DEADLINE) {deadline += 0.01};
                if (original.DISTANCE < modified.DISTANCE) {distance += 0.01};
                if (original.FOCUS_TIME < modified.FOCUS_TIME) {focusTime += 0.01};
                if (original.NOT_FOCUS_TIME < modified.NOT_FOCUS_TIME) {notFocusTime += 0.01};
                if (original.PRIORITY < modified.PRIORITY) {priority += 0.01};

                // 합이 1로 맞게 세팅
                let deadline_temp = (deadline / (deadline + distance + focusTime + notFocusTime + priority)).toFixed(3);
                let distance_temp = (distance / (deadline + distance + focusTime + notFocusTime + priority)).toFixed(3);
                let focusTime_temp = (focusTime / (deadline + distance + focusTime + notFocusTime + priority)).toFixed(3);
                let notFocusTime_temp = (notFocusTime / (deadline + distance + focusTime + notFocusTime + priority)).toFixed(3);
                let priority_temp = (priority / (deadline + distance + focusTime + notFocusTime + priority)).toFixed(3);
                
                console.log('수정가중치', deadline_temp, distance_temp, focusTime_temp, notFocusTime_temp, priority_temp);

                const modifiedWeight = {
                    DEADLINE: deadline_temp,
                    DISTANCE: distance_temp,
                    FOCUS_TIME: focusTime_temp,
                    NOT_FOCUS_TIME: notFocusTime_temp,
                    PRIORITY: priority_temp,
                }
                
                await axios.put(`${requests.fetchWeight}/weight`, modifiedWeight, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            }
        }

        console.log("post", modifyPlans);
        try {
            await axios.post(`${requests.fetchRecommend}`, modifyPlans, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '추천 일정을 저장했습니다',
                showConfirmButton: false,
                timer: 1000,
            });
        } catch (error) {
            console.error('추천저장 오류', error);
        }
        setNewScheduleModalOpen(false);
    };

    const handleScheduleChange = (schedule) => {
        setModifyPlans(schedule);
    };

    const findMatchingDictionary = (startTime, endTime) => {
        for (const dayPlans of recommendPriority) {
            for (const plan of dayPlans) {
                const dateStart = new Date(startTime);
                const dateEnd = new Date(endTime);
                const planStart = new Date(plan.START_TIME);
                const planEnd = new Date(plan.END_TIME);
                if (plan && planStart <= dateStart && planEnd >= dateEnd) {
                    // 딕셔너리가 일치하는 경우 출력
                    console.log("correct:", plan);
                    return plan;
                }
            }
        }
        // 딕셔너리를 찾지 못한 경우
        console.log('Matching dictionary not found');
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>일정 생성 결과</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setNewScheduleModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        {render && <CalendarLib mySleepInfo={mySleepInfo} scheduleData={recommendPlans} plans={plans} onScheduleChange={handleScheduleChange}/>}
                    </InputList>
                    <InputList>
                        <SubmitButton onClick={handleSubmit}>
                            저장하기
                        </SubmitButton>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default NewSchedule;

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

    /* &::-webkit-scrollbar-thumb {
        background-color: red;
        border-radius: 1rem;
    } */
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