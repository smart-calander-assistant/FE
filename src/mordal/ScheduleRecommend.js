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
import Recommendation from '../pages/Recommendation';

const ScheduleRecommend = ({ setRecommendModalOpen }) => {
    const [startTimeInput, setStartTimeInput] = useState(
        new Date().setDate(new Date().getDate() + 1)
    );
    const [dayInput, setDayInput] = useState(5);
    const [resultModal, setResultModal] = useState(false);
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
            await axios.post(requests.fetchPlan, newRecommend, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });

            // 입력값 초기화
            setStartTimeInput('');

            // 모달 닫기
            setRecommendModalOpen(false);

            let timerInterval;
            Swal.fire({
                title: 'AI가 일정을 생성중입니다...',
                html: '<b></b>초만큼 기다려주세요',
                timer: 5000,
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
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer');
                }
            });
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '일정 생성 완료',
                showConfirmButton: false,
                timer: 2000,
            });

            setResultModal(true);
        } catch (error) {
            console.error('일정 추천 중 오류 발생: ', error);
        }
    };

    const handleSelectChange = (dayInput) => {
        setDayInput(dayInput);
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
                            <SelectContent onChange={handleSelectChange} day={dayInput} />
                        </InputLabel>
                        <InputLabel>
                            <p>이동간의 교통수단 선택</p>
                            <SelectBox>
                                <TransportButton location='left'>
                                    대중교통
                                </TransportButton>
                                <TransportButton location='right'>
                                    자동차
                                </TransportButton>
                            </SelectBox>
                        </InputLabel>
                        {/* <InputLabel>
                            <p>추천 시 취미생활 포함 여부</p>
                            <SelectBox>
                                <TransportButton location='left'>
                                    포함
                                </TransportButton>
                                <TransportButton location='right'>
                                    불포함
                                </TransportButton>
                            </SelectBox>
                        </InputLabel> */}
                        <SubmitButton onClick={handleSubmit}>
                            일정 추천받기
                        </SubmitButton>
                        {/* {resultModal && <Recommendation />} */}
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

const SelectBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TransportButton = styled.button`
    flex: 1;
    color: black;
    background-color: white;
    border: 0.1rem solid #3a86ff;
    border-left: ${(props) =>
        props.location === 'left' ? '0.1rem solid #3a86ff' : '0rem'};
    border-right: ${(props) =>
        props.location === 'right' ? '0.1rem solid #3a86ff' : ''};
    padding: 0.5rem;
    border-radius: ${(props) =>
        props.location === 'left' ? '0.5rem 0 0 0.5rem' : '0 0.5rem 0.5rem 0'};
    transition: background-color 0.3s;

    &:hover {
        background-color: #3a86ff;
    }

    &.selected {
        background-color: #3a86ff;
        color: white;
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

const DateContainer = styled(DatePicker)`
    height: 2rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
`;
