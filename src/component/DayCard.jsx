import React from 'react';
import styled from 'styled-components';

const DayCard = ({ day, date, selected, onClick }) => {
    return (
        <DayContainer selected={selected} onClick={onClick}>
            <DayBox>
                <DateText selected={selected}>{date}</DateText>
                <DayText selected={selected}>{day}</DayText>
            </DayBox>
        </DayContainer>
    );
};

export default DayCard;

const DayContainer = styled.div`
    background-color: ${(props) => (props.selected ? '#ffc8c8' : '#f5f5f5' )};
    border-radius: 0.5rem;
`;

const DayBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 4rem;
    width: 3rem;
    font-weight: 800;
    transition: background-color 0.3s, color 0.3s;
`;

const DateText = styled.p`
    color: ${(props) => (props.selected ? '#DE496E' : 'black')};
    font-size: larger;
`;

const DayText = styled.p`
    color: ${(props) => (props.selected ? '#DE496E' : '#94A3B8')};
    font-size: small;
`;




