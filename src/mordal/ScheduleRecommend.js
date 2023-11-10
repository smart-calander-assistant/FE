import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import requests from '../api/requests';
import { getAccessToken } from '../localstorage/auth';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const ScheduleRecommend = ({ setScheduleRecommendModalOpen }) => {
    const [startTimeInput, setStartTimeInput] = useState(new Date());
    const [endTimeInput, setEndTimeInput] = useState('');
    const accessToken = getAccessToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const startDate = new Date(startTimeInput);
            const endDate = new Date(endTimeInput);

            if (startDate >= endDate) {
                Swal.fire({
                    icon: 'error',
                    text: '시작 시간은 종료 시간보다 빨라야 합니다',
                });
                return;
            }

            const formattedStartTime = format(startTimeInput, 'yyyy-MM-dd');
            const formattedEndTime = format(endTimeInput, 'yyyy-MM-dd');

            const newPlan = {
                startTime: formattedStartTime,
                endTime: formattedEndTime,
            };

            console.log('newPlan:', newPlan);

            // Axios를 사용하여 POST 요청을 보냅니다.
            await axios.post(requests.fetchPlan, newPlan, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });

            // 입력값 초기화
            setStartTimeInput('');
            setEndTimeInput('');

            // 모달 닫기
            setScheduleRecommendModalOpen(false);

            Swal.fire({
                position: 'center',
                icon: 'question',
                title: '일정 생성 중입니다...',
                showConfirmButton: false,
                timer: 10000,
            });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '일정 생성 완료',
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            console.error('일정 추천 중 오류 발생: ', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>일정 추천받기</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setScheduleRecommendModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        <InputLabel>
                            <p>시작날짜</p>
                            <DateContainer
                                selected={startTimeInput}
                                onChange={(date) => setStartTimeInput(date)}
                                locale={ko}
                                timeFormat='p'
                                timeIntervals={30}
                                dateFormat='yyyy-MM-dd'
                                placeholderText={startTimeInput}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>종료날짜</p>
                            <DateContainer
                                selected={endTimeInput}
                                onChange={(date) => setEndTimeInput(date)}
                                locale={ko}
                                timeFormat='p'
                                timeIntervals={30}
                                dateFormat='yyyy-MM-dd'
                                placeholderText='종료시간을 선택하세요'
                            />
                        </InputLabel>
                        <SubmitButton onClick={handleSubmit}>
                            일정 추천받기
                        </SubmitButton>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default ScheduleRecommend;

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
    padding: 6rem 1.5rem;
`;

const ModalContainer = styled.div`
    position: relative;
    background: white;
    overflow: hidden;
    border-radius: 0.5rem;
    transition: all 400ms ease-in-out 2s;
    overflow-y: scroll;
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
`;

const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
    font-size: medium;
    margin: 0.5rem 0;
    gap: 0.5rem;
`;

const InputBox = styled.input`
    border: 0.1rem solid #de496e;
    border-radius: 0.5rem;
    height: 2rem;
    padding: 0 0.5rem;
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

const DateContainer = styled(DatePicker)`
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;
