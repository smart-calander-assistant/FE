import React from 'react';
import styled from 'styled-components';
import TransfortationContent from './TransfortationContent';

const TimeTable = ({ startTime, endTime, timeInterval, scheduleList }) => {
  // 시간대 목록 생성
  const timeSlots = [];
  let currentTime = startTime;
  while (currentTime <= endTime) {
    timeSlots.push(currentTime);
    currentTime = addMinutes(currentTime, timeInterval);
  }

  return (
    <TimeTableContainer>
      <TimeTableBody>
        {timeSlots.map((time, index) => (
          <TimeTableRow key={index}>
            <TimeBox>{time}</TimeBox>
            {scheduleList
              .filter((schedule) => schedule.start_time === time)
              .map((filteredSchedule, scheduleIndex) => (
                <ContentBox type={filteredSchedule.type} key={scheduleIndex}>
                  {filteredSchedule.type === 'schedule' ? <p>{filteredSchedule.title}</p> : (<TransfortationContent time={filteredSchedule.time} type={filteredSchedule.type} />)}
                  <p>{filteredSchedule.place}</p>
                </ContentBox>
              ))}
            {scheduleList.filter((schedule) => schedule.start_time === time).length === 0 && (
              <EmptyBox />
            )}
          </TimeTableRow>
        ))}
      </TimeTableBody>
    </TimeTableContainer>
  );
  
};

export default TimeTable;


function addMinutes(time, minutes) {
  const [hours, mins] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

const TimeTableContainer = styled.div`
  width: 100%;
`;

const TimeTableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeTableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
`;

const TimeBox = styled.div`
  display: flex;
  padding: 1rem;
  width: 3rem;
  color: gray;
`;

const ContentBox = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: ${(props) => (props.type === 'schedule' ? '#de496e' : '#ffbe0b')};
`;

const EmptyBox = styled.div`
  flex: 1;
  padding: 1rem;
`
