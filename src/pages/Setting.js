import React, {useState } from 'react';
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

export default function Setting() {
  const [day, successDay] = [12, 8];
  const successDayRate = ((successDay / day) * 100).toFixed(1);
  const [todo, successTodo] = [28, 21];
  const successTodoRate = ((successTodo / todo) * 100).toFixed(1);
  const recommended = 7;
  const [myInfoModalOpen, setMyInfoModalOpen] = useState(false);

  const navigate = useNavigate();

  const accessToken = getAccessToken();

  const handleLogout = () => {
    Swal.fire({
      title: "정말 로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3A86FF",
      cancelButtonColor: "#de496e",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        removeAccessToken(accessToken);
        Swal.fire("로그아웃 완료", "로그인 페이지로 돌아갑니다", "success").then(() => {
            navigate('/');
            window.location.reload();
        });
      }
    });
  };

  const handleInfoClick = async () => {
    axios.get(requests.fetchLife, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
    .then((response) => {
        const todoData = response.data;
        console.log('내 정보:', todoData);
    })
    .catch((error) => {
        console.error('내 정보 확인 중 오류 발생: ', error);
    });
    setMyInfoModalOpen(true);
  }

  return (
    <RootContainer>
      <Header label={'설정'} />
      <ContentWrapper>
        <ExplainContent title={"일정 기록 현황"} content={"얼마나 갓생을 살고 있는지 확인해보세요!!"} />
        <RecordContainer>
          <RecordContent
            title={"성공적인 하루"}
            content={`${day}일동안 ${successDay}일의 일정을 마무리했어요`}
            type={"goal"}
            percent={`달성률 ${successDayRate}%`}
          />
          <RecordContent
            title={"바쁘다 바빠"}
            content={`${todo}개의 해야할 일 중 ${successTodo}개를 끝냈어요`}
            type={"goal"}
            percent={`달성률 ${successTodoRate}%`}
          />
          <RecordContent
            title={"정교한 일정 설정"}
            content={`Ai가 추천한 일정을 ${recommended}번을 선택했어요`}
            type={"achievement"}
          />
        </RecordContainer>
        <ExplainContent title={"내 정보"} content={"개인정보를 입력해주세요"} onClick={handleInfoClick}/>
        {myInfoModalOpen && (<MyInfo setMyInfoModalOpen={setMyInfoModalOpen} />)}
        <ExplainContent title={"일정 기록 초기화"} content={"일정 기록 현황을 전부 초기화할 수 있습니다!!"} />
        <ExplainContent title={"로그아웃"} content={"로그아웃하려면 아래 버튼을 클릭하세요"} onClick={handleLogout} />
        <ExplainContent title={"회원 탈퇴"} content={"계정을 삭제합니다"} />
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
  overflow-y: hidden;
  scroll-behavior: smooth;

  &:hover {
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
`;
