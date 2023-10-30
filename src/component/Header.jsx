import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import AddTodo from '../mordal/AddTodo';
import AddPlan from '../mordal/AddPlan';

const Header = ({ label, TodoList }) => {
    const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);
    const [addPlanModalOpen, setAddPlanModalOpen] = useState(false);

    const handleAddTodoModal = () => {
        setAddTodoModalOpen(true);
    };

    const handleAddPlanModal = () => {
        setAddPlanModalOpen(true);
    };

    if (label === '해야할 일') {
        return (
            <HeaderContainer>
                <p>{label}</p>
                {TodoList && <AiOutlinePlus
                    size={'2rem'}
                    onClick={() => handleAddTodoModal()}
                />}
                {!TodoList && <AiOutlinePlus
                    size={'2rem'}
                    onClick={() => handleAddPlanModal()}
                />}
                {addTodoModalOpen && <AddTodo setAddTodoModalOpen={setAddTodoModalOpen} />}
                {addPlanModalOpen && <AddPlan setAddPlanModalOpen={setAddPlanModalOpen} />}
            </HeaderContainer>
        );
    } else {
        return <HeaderContainer>{label}</HeaderContainer>;
    }
};

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    font-size: x-large;
    margin: 1rem;

    justify-content: space-between;
    align-items: center;
`;
