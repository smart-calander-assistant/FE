import React from 'react';
import styled from 'styled-components';
import {
    IoAlarmOutline,
    IoListCircleOutline,
    IoFlagSharp,
    IoEllipsisHorizontalSharp,
} from 'react-icons/io5';
import BorderLine from './BorderLine';

const PlanCard = ({ id, start_time, end_time, place, title }) => {
    
    return (
        <TodoContainer>
            <HeaderBox>
                <PriorityBox>
                    <IoFlagSharp size={'1rem'} />
                    <p>진행 중</p>
                </PriorityBox>
                <IoEllipsisHorizontalSharp size={'1.5rem'} />
            </HeaderBox>
            <ContentBox>
                <TitleBox>
                    <IoListCircleOutline size={'1.5rem'} color={'#0ACF83'} />
                    <p>{title}</p>
                </TitleBox>
                <PlaceBox>
                    <p>장소 : {place}</p>
                </PlaceBox>
                <BorderLine />
                <TimeContainer>
                    <AlarmBox>
                        <IoAlarmOutline size={'1rem'} />
                        <p>08:30 PM</p>
                    </AlarmBox>
                    <TimeBox>
                        <p>
                            {start_time}~{end_time}
                        </p>
                    </TimeBox>
                </TimeContainer>
            </ContentBox>
        </TodoContainer>
    );
};

export default PlanCard;

const TodoContainer = styled.div`
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
`;
const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem 0 0.5rem;
    background-color: #0acf83;
    border-radius: 0.5rem 0.5rem 0 0;
    height: 2.5rem;

    color: white;
`;
const PriorityBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
    gap: 0.5rem;

    font-size: smaller;
`;
const ContentBox = styled.div`
    background-color: white;
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 0.5rem;
`;
const TitleBox = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem;
    gap: 0.5rem;

    font-size: large;
`;

const PlaceBox = styled.div`
    display: flex;
    justify-content: end;
    margin: 0 0.5rem 0 0;
    font-size: small;
`;

const TimeContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 0.5rem;

    font-size: smaller;
`;

const AlarmBox = styled.div`
    display: flex;
    color: #ff486a;
    align-items: center;
    gap: 0.5rem;
`;

const TimeBox = styled.div`
    display: flex;
`;
