import axios from '../api/axios';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import requests from '../api/requests';
import { IoClose } from 'react-icons/io5';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { getAccessToken } from '../localstorage/auth';
import { format } from 'date-fns';

export default function MyInfo({
    setMyInfoModalOpen,
    sleep_start,
    sleep_end,
    good_start,
    good_end,
    bad_start,
    bad_end,
}) {
    const [sleepStart, setSleepStart] = useState(sleep_start);
    const [sleepEnd, setSleepEnd] = useState(sleep_end);
    const [goodStartTime, setGoodStartTime] = useState(good_start);
    const [goodEndTime, setGoodEndTime] = useState(good_end);
    const [badStartTime, setBadStartTime] = useState(bad_start);
    const [badEndTime, setBadEndTime] = useState(bad_end);

    const accessToken = getAccessToken();

    const handleSubmit = async () => {
        const newMyInfo = {
            sleep_start: sleepStart,
            sleep_end: sleepEnd,
            good_start: goodStartTime,
            good_end: goodEndTime,
            bad_start: badStartTime,
            bad_end: badEndTime,
        };

        try {
            await axios.post(requests.fetchLife, newMyInfo, {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                },
            });
            setMyInfoModalOpen(false);

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '업데이트 성공',
                showConfirmButton: false,
                timer: 2000,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: '정보 업데이트에 실패했습니다',
            });
            console.error('업데이트 오류: ', error);
        }
    };

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>내 정보</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setMyInfoModalOpen(false)}
                        />
                    </ModalTitle>
                    <InputList>
                        <InputLabel>
                            <p>수면시간</p>
                            <DateContainer
                                selected={sleepStart}
                                onChange={(date) => setSleepStart(date)}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='HH:mm'
                                placeholderText={sleep_start}
                            />
                            <p> ~ </p>
                            <DateContainer
                                selected={sleepEnd}
                                onChange={(date) => setSleepEnd(date)}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='HH:mm'
                                placeholderText={sleep_end}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>집중 잘되는 시간</p>
                            <DateContainer
                                selected={goodStartTime}
                                onChange={(date) => setGoodStartTime(date)}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='HH:mm'
                                placeholderText={good_start}
                            />
                            <p> ~ </p>
                            <DateContainer
                                selected={goodEndTime}
                                onChange={(date) => setGoodEndTime(date)}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='HH:mm'
                                placeholderText={good_end}
                            />
                        </InputLabel>
                        <InputLabel>
                            <p>집중 잘 안되는 시간</p>
                            <DateContainer
                                selected={badStartTime}
                                onChange={(date) => setBadStartTime(date)}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='HH:mm'
                                placeholderText={bad_start}
                            />
                            <p> ~ </p>
                            <DateContainer
                                selected={badEndTime}
                                onChange={(date) => setBadEndTime(date)}
                                locale={ko}
                                showTimeSelect
                                showTimeSelectOnly
                                timeFormat='p'
                                timeIntervals={60}
                                dateFormat='HH:mm'
                                placeholderText={bad_end}
                            />
                        </InputLabel>
                        <SubmitButton onClick={handleSubmit}>
                            정보 업데이트
                        </SubmitButton>
                    </InputList>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
}

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
