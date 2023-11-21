import React, {useEffect, useState} from 'react'
import Footer from '../component/Footer'
import styled from 'styled-components'
import Header from '../component/Header'
import CalendarLib from 'react-calendar';
import './Calendar.css'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import {getAccessToken} from "../localstorage/auth";
import axios from "../api/axios";
import requests from "../api/requests";
import CalendarPlanModal from "../mordal/CalendarPlanModal";

export default function Calendar() {
    const [value, onChange] = useState(new Date());
    const [plans, setPlans] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const accessToken = getAccessToken();

    useEffect(() => {
        if (!accessToken) {
            console.log('Access Token is not available');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`${requests.fetchPlan}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    });
                setPlans(response.data);
            } catch (error) {
                console.error('fetching error', error);
            }
        };

        fetchData();
    }, []);

    const getMarkedDates = () => {
        return plans.map(plan => new Date(plan.startTime));
    };

    const isDateMarked = (date) => {
        return getMarkedDates().some(markedDate => markedDate.toDateString() === date.toDateString());
    }

    const tileContent = ({date, view}) => {
        return isDateMarked(date) ? (<>
            <div className="dot"/>
        </>) : null;
    }

    const handleDateClick = (date) => {
        setSelectedDate(date);
        if(isDateMarked(date)){
            setIsModalOpen(true);
        }
    }

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
                                tileContent={tileContent}
                                onClickDay={handleDateClick}
                            />
                            {isModalOpen && (
                                <CalendarPlanModal
                                    setModalOpen={setIsModalOpen}
                                    plans={plans}
                                />
                            )}
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
  width: 100vw;
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

const CalendarContainer = styled.div`
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

  .react-calendar__navigation {
    //height: 2rem;
  }

  .react-calendar__tile {
    text-align: center;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .react-calendar__tile--now {
    background: #ffbe0b;
    border-radius: 10%;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: #3a86ff;
    border-radius: 10%;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #3a86ff;
    border-radius: 10%;
  }

  .dot {
    flex-direction: column;
    align-items: center;
    height: 1rem;
    width: 1rem;
    background-color: #de496e;
    border-radius: 50%;
    display: flex;
    margin: 0 auto;
  }
`;

