import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import axios from '../api/axios';
import requests from '../api/requests';
import { getAccessToken } from '../localstorage/auth';
import SearchPlace from '../component/SearchPlace';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const AddPlan = ({ setAddPlanModalOpen, onChange }) => {
    const [titleInput, setTitleInput] = useState('');
    const [startTimeInput, setStartTimeInput] = useState('');
    const [endTimeInput, setEndTimeInput] = useState('');
    const [placeInput, setPlaceInput] = useState('');
    const accessToken = getAccessToken();
    const [coordinates, setCoordinates] = useState({
        latitude: 37.5050881,
        longitude: 126.9571012,
    });

    const handlePlaceSelect = ({ place, coordinates }) => {
        setPlaceInput(place);
        setCoordinates(coordinates);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                titleInput === '' ||
                startTimeInput === '' ||
                endTimeInput === ''
            ) {
                Swal.fire({
                    icon: 'error',
                    text: '제목과 시간정보는 반드시 입력해야 합니다',
                });
                return;
            }

            const startDate = new Date(startTimeInput);
            const endDate = new Date(endTimeInput);

            // 시작 시간이 종료 시간보다 늦으면 에러 처리
            if (startDate >= endDate) {
                Swal.fire({
                    icon: 'error',
                    text: '시작 시간은 종료 시간보다 빨라야 합니다',
                });
                return;
            }

            const formattedStartTime = format(
                startTimeInput,
                'yyyy-MM-dd HH:mm'
            );

            const formattedEndTime = format(endTimeInput, 'yyyy-MM-dd HH:mm');

            const newPlan = {
                content: titleInput,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                place: placeInput,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            };

            console.log('newPlan:', newPlan);

            // Axios를 사용하여 POST 요청을 보냅니다.
            await axios.post(requests.fetchPlan, newPlan, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });

            // 입력값 초기화
            setTitleInput('');
            setStartTimeInput('');
            setEndTimeInput('');
            setPlaceInput('');
            setCoordinates({ latitude: 37.5050881, longitude: 126.9571012 });

            // 모달 닫기
            setAddPlanModalOpen(false);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Plan이 추가되었습니다',
                showConfirmButton: false,
                timer: 2000,
            });
            onChange();
        } catch (error) {
            console.error('Plan 추가 중 오류 발생: ', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>Plan 추가하기</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setAddPlanModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        <InputLabel>
                            <p>제목</p>
                            <InputBox
                                type='text'
                                value={titleInput}
                                placeholder={'제목을 입력하세요'}
                                onChange={(e) => setTitleInput(e.target.value)}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>시작날짜</p>
                            <DateContainer
                                selected={startTimeInput}
                                onChange={(date) => setStartTimeInput(date)}
                                locale={ko}
                                showTimeSelect
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='yyyy-MM-dd HH:mm'
                                placeholderText='시작시간을 선택하세요'
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>종료날짜</p>
                            <DateContainer
                                selected={endTimeInput}
                                onChange={(date) => setEndTimeInput(date)}
                                locale={ko}
                                showTimeSelect
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='yyyy-MM-dd HH:mm'
                                placeholderText='종료시간을 선택하세요'
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>장소</p>
                            <SearchPlace
                                onPlaceSelect={handlePlaceSelect}
                                placeholder={'장소를 입력하세요'}
                            />
                        </InputLabel>
                        <SubmitButton onClick={handleSubmit}>
                            Plan 추가하기
                        </SubmitButton>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default AddPlan;

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
    text-align: center;
`;
