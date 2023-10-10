import React, { useState } from 'react'
import Footer from '../component/Footer'
import styled from 'styled-components'
import Header from '../component/Header'
import CalendarLib from 'react-calendar';
import './Calendar.css'

export default function Calendar() {
    const [value, onChange] = useState(new Date());

    return (
        <RootContainer>
            <Header label={'캘린더'}/>
                <ContentWrapper>
                    <CalendarLib onChange={onChange} value={value}/>
                        {/* {moment(value).format("YYYY년 MM월 DD일")}  */}
                </ContentWrapper>
            <Footer label={'calendar'} />
        </RootContainer>
    )
}


const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
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
        background-color: white;
    }
`;