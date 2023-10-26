import React from 'react'
import Footer from '../component/Footer'
import styled from 'styled-components'
import Header from '../component/Header'
import ExplainContent from '../component/ExplainContent'
import RecordContent from '../component/RecordContent'

export default function Setting() {
    const [day, successDay] = [12, 8];
    const successDayRate = ((successDay / day) * 100).toFixed(1);
    const [todo, successTodo] = [28, 21];
    const successTodoRate = ((successTodo / todo) * 100).toFixed(1);
    const recommended = 7;

  return (
    <RootContainer>
        <Header label={'설정'}/>
        <ContentWrapper>
            <ExplainContent title={"일정 기록 현황"} content={"얼마나 갓생을 살고 있는지 확인해보세요!!"}/>
            <RecordContainer>
                <RecordContent title={"성공적인 하루"} content={`${day}일동안 ${successDay}일의 일정을 마무리했어요`} type={"goal"} percent={`달성률 ${successDayRate}%`}/>
                <RecordContent title={"바쁘다 바빠"} content={`${todo}개의 해야할 일 중 ${successTodo}개를 끝냈어요`} type={"goal"} percent={`달성률 ${successTodoRate}%`}/>
                <RecordContent title={"정교한 일정 설정"} content={`Ai가 추천한 일정을 ${recommended}번을 선택했어요`} type={"achievement"}/>
            </RecordContainer>
            <ExplainContent title={"일정 기록 초기화"} content={"일정 기록 현황을 전부 초기화할 수 있습니다!!"}/>
            <ExplainContent title={"내 정보수정"} content={"개인정보를 바꿀 수 있습니다"}/>
            <ExplainContent title={"1:1 문의"} content={"불편한 점 및 문의사항을 남겨주세요"}/>
            <ExplainContent title={"로그아웃"} content={"혹시 개인핸드폰 및 PC가 아니라면 로그아웃을 해주세요"}/>
            <ExplainContent title={"회원 탈퇴"} content={"계정을 삭제합니다"}/>
        </ContentWrapper>
        <Footer label={'setting'} />
    </RootContainer>
  )
}


const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;

`;

const RecordContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0.25rem;
`

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
    /* &::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 1rem;
    } */
    &::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }
`;