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
import SelectContent from '../component/SelectContent';

const ScheduleRecommend = ({ setRecommendModalOpen, setNewScheduleModalOpen, setResultModalOpen, setDays, days }) => {
    const [startTimeInput, setStartTimeInput] = useState(
        new Date().setDate(new Date().getDate() + 1)
    );

    const accessToken = getAccessToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedStartTime = format(startTimeInput, 'yyyy-MM-dd');

            const newRecommend = {
                startTime: formattedStartTime,
            };

            console.log('newRecommend:', newRecommend);

            // Axios를 사용하여 POST 요청을 보냅니다.
            // await axios.post(requests.fetchPlan, newRecommend, {
            //     headers: {
            //         Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
            //     },
            // });

            // 입력값 초기화
            setStartTimeInput('');

            // 모달 열고 닫기
            setRecommendModalOpen(false);
            setNewScheduleModalOpen(true);
            
            let timerInterval;
            Swal.fire({
                title: '일정을 생성중입니다...',
                html: '<b></b>ns만큼 기다려주세요',
                timer: 7000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector('b');
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '일정 생성 완료',
                    showConfirmButton: false,
                    timer: 2000,
                });
                // setResultModalOpen(true);
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer');
                }
            });
        } catch (error) {
            console.error('일정 추천 중 오류 발생: ', error);
        }
    };

    const handleSelectChange = (dayInput) => {
        setDays(dayInput);
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>AI일정 추천 설정</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setRecommendModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        <InputLabel>
                            <p>시작날짜 (변경불가)</p>
                            <DateContainer
                                selected={startTimeInput}
                                locale={ko}
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='yyyy-MM-dd'
                                placeholderText={startTimeInput}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>기간</p>
                            <SelectContent
                                onChange={handleSelectChange}
                                day={days}
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
    scroll-behavior: smooth;
    max-height: 60vh;

    &::-webkit-scrollbar {
        width: 5px;
    }

    /* &::-webkit-scrollbar-thumb {
      background-color: gray;
      border-radius: 1rem;
  } */

    &::-webkit-scrollbar-track {
        background-color: white;
    }
`;

const InputLabel = styled.div`
    display: flex;
    flex-direction: column;
    font-size: medium;
    margin: 0.5rem 0;
    gap: 0.5rem;
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
