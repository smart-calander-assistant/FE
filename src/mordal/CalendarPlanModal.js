import {styled} from "styled-components";
import PlanCard from "../component/PlanCard";
import {IoClose} from "react-icons/io5";

export default function CalendarPlanModal({setModalOpen, plans}) {
    if (!setModalOpen || !plans || plans.length === 0) {
        return null;
    }

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>Plan</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => setModalOpen(false)}
                        />
                    </ModalTitle>
                    {plans.map((plan) => {
                        return (
                        <PlanCard
                            key={plan.id}
                            id={plan.id}
                            start_time={plan.startTime}
                            end_time={plan.endTime}
                            place={plan.place}
                            title={plan.content}
                        />
                    )})}
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    )
}

const ViewContainer = styled.div`
  z-index: 1;
  position: absolute;
`;

const RootContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 30%);
  -webkit-tap-highlight-color: transparent;
  justify-content: center;
  padding: 12vh 1.5rem;
`;

const ModalContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 0.5rem;
  transition: all 400ms ease-in-out 2s;
  padding: 2rem;
`;

const ModalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  align-items: center;
  color: black;
`;

const ModalDetail = styled.p`
  font-weight: 600;
  font-size: 1.5rem;
`;