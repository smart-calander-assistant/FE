import React, {useState} from 'react'
import Footer from '../component/Footer'
import styled from 'styled-components'
import Header from '../component/Header'
import CalendarLib from 'react-calendar';
import './Calendar.css'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

export default function Calendar() {
    const [value, onChange] = useState(new Date());

    return (
        <RootContainer>
            <Header label={'캘린더'}/>
            <ContentWrapper>
                <CalendarContainer>
                    <div className="Calendar__container">
                        <div className="Calendar__container__content">
                            <CalendarLib
                                onChange={onChange}
                                value={value}
                                next2Label={null}
                                prev2Label={null}
                                formatDay={(locale, date) => moment(date).format("D")}
                                showNeighboringMonth={false}
                            />
                        </div>
                    </div>
                </CalendarContainer>
            </ContentWrapper>
            <Footer label={'calendar'}/>
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
`
const CalendarContainer = styled.div`
  /*  body {
      height: 100%;
    }
  
    body {
      margin: 0;
      font-family: Segoe UI, Tahoma, sans-serif;
    }
  
    .Calendar input,
    .Calendar button {
      font: inherit;
    }*/

  .Calendar__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 10px 0;
    padding: 10px;
  }

  .Calendar__container > * > * {
    margin: 10px;
  }

  .Calendar__container__content {
    display: flex;
    max-width: 100%;
    flex-basis: 420px;
    flex-direction: column;
    flex-grow: 100;
    align-items: stretch;
    padding-top: 1em;
  }

  .Calendar__container__content .react-calendar {
    margin: 0 auto;
  }

  .react-calendar__tile--now abbr {
    background: yellow;
    padding: 15%;
    border-radius: 50%;
  }

  .react-calendar__tile--now {
    background: white;
  }

  .react-calendar__tile--active abbr {
    background: #3a86ff;
    color: black;
    padding: 15%;
    border-radius: 50%;
  }

  .react-calendar__tile--active {
    background: white;
  }

  .react-calendar__tile--active:enabled:focus,
  .react-calendar__tile--active:enabled:hover {
    background-color: white;
  }
`;