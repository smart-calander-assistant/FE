import axios from '../api/axios';
import React, { useState, useEffect } from 'react';
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
    const [sleepStart, setSleepStart] = useState(new Date(sleep_start));
    const [sleepEnd, setSleepEnd] = useState(new Date(sleep_end));
    const [goodStart, setGoodStart] = useState(new Date(good_start));
    const [goodEnd, setGoodEnd] = useState(new Date(good_end));
    const [badStart, setBadStart] = useState(new Date(bad_start));
    const [badEnd, setBadEnd] = useState(new Date(bad_end));

    const accessToken = getAccessToken();

    useEffect(() => {
        // 컴포넌트가 마운트될 때, 기존 정보를 입력 필드에 표시
        setSleepStart(new Date(sleep_start));
        setSleepEnd(new Date(sleep_end));
        setGoodStart(new Date(good_start));
        setGoodEnd(new Date(good_end));
        setBadStart(new Date(bad_start));
        setBadEnd(new Date(bad_end));
    }, [sleep_start, sleep_end, good_start, good_end, bad_start, bad_end]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const sleepStartDate = new Date(sleepStart);
            // const sleepEndDate = new Date(sleepEnd);
            const goodStartDate = new Date(goodStart);
            const goodEndDate = new Date(goodEnd);
            const badStartDate = new Date(badStart);
            const badEndDate = new Date(badEnd);

            if (goodStartDate >= goodEndDate || badStartDate >= badEndDate) {
                Swal.fire({
                    icon: 'error',
                    text: '시작시간과 종료시간이 적절하지 않습니다',
                });
                return;
            }

            const formattedSleepStartTime = format(sleepStart, 'HH:mm');
            const formattedSleepEndTime = format(sleepEnd, 'HH:mm');
            const formattedFocusStartTime = format(goodStart, 'HH:mm');
            const formattedFocusEndTime = format(goodEnd, 'HH:mm');
            const formattedNotFocusStartTime = format(badStart, 'HH:mm');
            const formattedNotFocusEndTime = format(badEnd, 'HH:mm');

            const newMySleepInfo = {
                id: 2,
                life: 'SLEEPING_TIME',
                startTime: formattedSleepStartTime,
                endTime: formattedSleepEndTime,
            };
            const newMyFocusInfo = {
                id: 3,
                life: 'FOCUS_TIME',
                startTime: formattedFocusStartTime,
                endTime: formattedFocusEndTime,
            };
            const newMyNotFocusInfo = {
                id: 4,
                life: 'NOT_FOCUS_TIME',
                startTime: formattedNotFocusStartTime,
                endTime: formattedNotFocusEndTime,
            };

            await axios.put(
                `${requests.fetchLife}/${newMySleepInfo.id}`,
                newMySleepInfo,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            await axios.put(
                `${requests.fetchLife}/${newMyFocusInfo.id}`,
                newMyFocusInfo,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            await axios.put(
                `${requests.fetchLife}/${newMyNotFocusInfo.id}`,
                newMyNotFocusInfo,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            setSleepStart('');
            setSleepEnd('');
            setGoodStart('');
            setGoodEnd('');
            setBadStart('');
            setBadEnd('');

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
                            <TimeBox>
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
                                <TimeWave> ~ </TimeWave>
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
                            </TimeBox>
                        </InputLabel>
                        <InputLabel>
                            <p>집중 잘되는 시간</p>
                            <TimeBox>
                                <DateContainer
                                    selected={goodStart}
                                    onChange={(date) => setGoodStart(date)}
                                    locale={ko}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeFormat='p'
                                    timeIntervals={60}
                                    dateFormat='HH:mm'
                                    placeholderText={good_start}
                                />
                                <TimeWave> ~ </TimeWave>
                                <DateContainer
                                    selected={goodEnd}
                                    onChange={(date) => setGoodEnd(date)}
                                    locale={ko}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeFormat='p'
                                    timeIntervals={60}
                                    dateFormat='HH:mm'
                                    placeholderText={good_end}
                                />
                            </TimeBox>
                        </InputLabel>
                        <InputLabel>
                            <p>집중 잘 안되는 시간</p>
                            <TimeBox>
                                <DateContainer
                                    selected={badStart}
                                    onChange={(date) => setBadStart(date)}
                                    locale={ko}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeFormat='p'
                                    timeIntervals={60}
                                    dateFormat='HH:mm'
                                    placeholderText={bad_start}
                                />
                                <TimeWave> ~ </TimeWave>
                                <DateContainer
                                    selected={badEnd}
                                    onChange={(date) => setBadEnd(date)}
                                    locale={ko}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeFormat='p'
                                    timeIntervals={60}
                                    dateFormat='HH:mm'
                                    placeholderText={bad_end}
                                />
                            </TimeBox>
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
    display: flex;
    flex-direction: column;
    font-size: medium;
    margin: 0.5rem 0;
    gap: 0.5rem;
`;

const TimeWave = styled.p`
    font-size: large;
    font-weight: 600;
`;

const TimeBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    width: 6rem;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem solid #de496e;
    text-align: center;
`;
