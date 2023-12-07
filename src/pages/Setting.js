import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import styled from 'styled-components';
import Header from '../component/Header';
import ExplainContent from '../component/ExplainContent';
import RecordContent from '../component/RecordContent';
import { removeAccessToken, getAccessToken } from '../localstorage/auth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import MyInfo from '../mordal/MyInfo';
import axios from '../api/axios';
import requests from '../api/requests';
import Weight from '../mordal/Weight';

export default function Setting() {
    const [myTodoCount, setMyTodoCount] = useState(0);
    const [myTodoFinishCount, setMyTodoFinishCount] = useState(0);
    const [myTodoSuccessRate, setMyTodoSuccessRate] = useState(0);
    const recommended = 7;
    const [myInfoModalOpen, setMyInfoModalOpen] = useState(false);
    const [weightModalOpen, setWeightModalOpen] = useState(false);
    const [mySleepInfo, setMySleepInfo] = useState('');
    const [myFocusInfo, setMyFocusInfo] = useState('');
    const [myNotFocusInfo, setMyNotFocusInfo] = useState('');
    const [myWeightInfo, setMyWeightInfo] = useState('');
    const [realWeightInfo, setRealWeightInfo] = useState({
        DEADLINE: 0.0,
        NOT_FOCUS_TIME: 0.0,
        PRIORITY: 0.0,
        DISTANCE: 0.0,
        FOCUS_TIME: 0.0,
    });
    const [myPlaceInfo, setMyPlaceInfo] = useState('');

    const navigate = useNavigate();

    const accessToken = getAccessToken();

    const defaultDate = '1970-01-01';

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                const myCount = await axios.get(`${requests.fetchTodo}/count`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                    },
                });

                const myFinishCount = await axios.get(
                    `${requests.fetchTodo}/count?complete=${true}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`, // accessToken을 헤더에 추가
                        },
                    }
                );

                setMyTodoCount(myCount.data);
                setMyTodoFinishCount(myFinishCount.data);

                if (myFinishCount.data === 0) {
                    setMyTodoSuccessRate(0);
                } else {
                    setMyTodoSuccessRate(
                        ((myFinishCount.data / myCount.data) * 100).toFixed(1)
                    );
                }

                console.log('Todo개수 데이터:', myCount.data);
                console.log('Todo완료개수 데이터:', myFinishCount.data);
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);

    const handleLogout = () => {
        Swal.fire({
            title: '정말 로그아웃 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3A86FF',
            cancelButtonColor: '#de496e',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                removeAccessToken(accessToken);
                Swal.fire(
                    '로그아웃 완료',
                    '로그인 페이지로 돌아갑니다',
                    'success'
                ).then(() => {
                    navigate('/');
                    window.location.reload();
                });
            }
        });
    };

    const handleInfoClick = async () => {
        try {
            const mySleepInfo = await axios.get(
                `${requests.fetchLife}?life=${'SLEEPING_TIME'}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const myFocusInfo = await axios.get(
                `${requests.fetchLife}?life=${'FOCUS_TIME'}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const myNotFocusInfo = await axios.get(
                `${requests.fetchLife}?life=${'NOT_FOCUS_TIME'}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const myPlaceInfo = await axios.get(requests.fetchMember, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setMySleepInfo(mySleepInfo.data[0]);
            setMyFocusInfo(myFocusInfo.data[0]);
            setMyNotFocusInfo(myNotFocusInfo.data[0]);
            setMyPlaceInfo(myPlaceInfo.data);
        } catch (error) {
            console.error('내 정보 확인 중 오류 발생: ', error);
        }
        setMyInfoModalOpen(true);
    };

    const handleMemberWithdrawal = async () => {
        Swal.fire({
            title: '정말 회원탈퇴 하시겠습니까?',
            icon: 'warning',
            text: '모든 정보가 사라지게됩니다.',
            showCancelButton: true,
            confirmButtonColor: '#3A86FF',
            cancelButtonColor: '#de496e',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                removeAccessToken(accessToken);
                try {
                    axios.delete(requests.fetchWithdrawal, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                } catch (error) {
                    console.error('회원탈퇴 중 오류 발생: ', error);
                }
                Swal.fire(
                    '회원탈퇴 완료',
                    '로그인 페이지로 돌아갑니다',
                    'success'
                ).then(() => {
                    navigate('/');
                    window.location.reload();
                });
            }
        });
    };

    const handleWeight = async () => {
        try {
            const myWeight = await axios.get(requests.fetchWeight, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setMyWeightInfo(myWeight);

            const realWeight = await axios.get(`${requests.fetchWeight}/weight`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setRealWeightInfo({
                DEADLINE: realWeight.data.DEADLINE,
                NOT_FOCUS_TIME: realWeight.data.NOT_FOCUS_TIME,
                PRIORITY: realWeight.data.PRIORITY,
                DISTANCE: realWeight.data.DISTANCE,
                FOCUS_TIME: realWeight.data.FOCUS_TIME,
            });
            console.log("weight");
            console.log(realWeight);
        } catch (error) {
            console.error('가중치확인 중 오류 발생: ', error);
        }
        setWeightModalOpen(true);
    };

    const handleReset = async () => {
        Swal.fire({
            title: '정말 일정기록을 초기화 하시겠습니까?',
            icon: 'warning',
            text: '모든 정보가 사라지게됩니다.',
            showCancelButton: true,
            confirmButtonColor: '#3A86FF',
            cancelButtonColor: '#de496e',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    axios.delete(`${requests.fetchMember}/reset`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                } catch (error) {
                    console.error('초기화 중 오류 발생: ', error);
                }
                Swal.fire({ title: '일정초기화 완료', icon: 'success' });
            }
        });
    };

    return (
        <RootContainer>
            <Header label={'설정'} />
            <ContentWrapper>
                <ExplainContent
                    title={'일정 기록 현황'}
                    content={'얼마나 갓생을 살고 있는지 확인해보세요!!'}
                />
                <RecordContainer>
                    <RecordContent
                        title={'바쁘다 바빠'}
                        content={`${myTodoCount}개의 해야할 일 중 ${myTodoFinishCount}개를 끝냈어요`}
                        type={'goal'}
                        percent={`달성률 ${myTodoSuccessRate}%`}
                    />
                    <RecordContent
                        title={'정교한 일정 설정'}
                        content={`Ai가 추천한 일정을 ${recommended}번을 선택했어요`}
                        type={'achievement'}
                    />
                </RecordContainer>
                <ExplainContent
                    title={'내 정보'}
                    content={'개인정보를 입력해주세요'}
                    onClick={handleInfoClick}
                />
                {myInfoModalOpen && (
                    <MyInfo
                        setMyInfoModalOpen={setMyInfoModalOpen}
                        sleep_id={mySleepInfo.id}
                        sleep_start={`${defaultDate} ${mySleepInfo.startTime}`}
                        sleep_end={`${defaultDate} ${mySleepInfo.endTime}`}
                        good_id={myFocusInfo.id}
                        good_start={`${defaultDate} ${myFocusInfo.startTime}`}
                        good_end={`${defaultDate} ${myFocusInfo.endTime}`}
                        bad_id={myNotFocusInfo.id}
                        bad_start={`${defaultDate} ${myNotFocusInfo.startTime}`}
                        bad_end={`${defaultDate} ${myNotFocusInfo.endTime}`}
                        home={myPlaceInfo}
                    />
                )}
                <ExplainContent
                    title={'AI 일정추천 우선순위'}
                    content={
                        '자신만의 스타일로 AI의 일정 추천을 받을 수 있습니다'
                    }
                    onClick={handleWeight}
                />
                {weightModalOpen && (
                    <Weight
                        setWeightModalOpen={setWeightModalOpen}
                        myWeight={myWeightInfo.data}
                        realWeight={realWeightInfo}
                    />
                )}
                <ExplainContent
                    title={'일정 기록 초기화'}
                    content={'일정 기록 현황을 전부 초기화할 수 있습니다!!'}
                    onClick={handleReset}
                />
                <ExplainContent
                    title={'로그아웃'}
                    content={'로그아웃하려면 아래 버튼을 클릭하세요'}
                    onClick={handleLogout}
                />
                <ExplainContent
                    title={'회원 탈퇴'}
                    content={'계정을 삭제합니다'}
                    onClick={handleMemberWithdrawal}
                />
            </ContentWrapper>
            <Footer label={'setting'} />
        </RootContainer>
    );
}

const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
`;

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0.25rem;
`;

const ContentWrapper = styled.div`
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }
`;
