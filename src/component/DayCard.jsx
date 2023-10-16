import React from 'react';
import styled from 'styled-components';

const DayCard = ({ day, date, index }) => {
    if (index === 3) {
        return (
            <DayContainer>
                <DayBox index={index}>
                    <p style={{ fontSize: 'larger' }}>{date}</p>
                    <p style={{ fontSize: 'small' }}>{day}</p>
                </DayBox>
            </DayContainer>
        );
    } else {
        return (
            <DayBox index={index}>
                <p style={{ fontSize: 'larger' }}>{date}</p>
                <p style={{ fontSize: 'small' }}>{day}</p>
            </DayBox>
        );
    }
};

export default DayCard;

const DayContainer = styled.div`
    background-color: #ffc8c8;
    border-radius: 0.5rem;
`

const DayBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 4rem;

    font-weight: 800;
    color: ${(props) => (props.index === 3 ? '#DE496E' : 'black')};
`;
