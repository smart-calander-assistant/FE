import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { styled } from 'styled-components';
import SearchBar from '../component/SearchBar';

export default function AddTodo({ title, name, setAddTodoModalOpen }) {
    const ref = useRef();
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue('');
    };
    useOnClickOutside(ref, () => {
        setAddTodoModalOpen(false);
    });

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer ref={ref}>
                    <ModalTitle>
                        <ModalDetail>addTodo</ModalDetail>
                        <ModalClose onClick={() => setAddTodoModalOpen(false)}>
                            취소
                        </ModalClose>
                        <SearchBar
                            value={value}
                            setValue={setValue}
                            type='text'
                            placeholder='aaaaaaa'
                            onSubmit={handleSubmit}
                        />
                    </ModalTitle>
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
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
    display: flex;
    justify-content: center;
    padding: 6rem 3rem;
`;

const ModalContainer = styled.div`
    position: relative;
    background: white;
    overflow: hidden;
    border-radius: 0.5rem;
    transition: all 400ms ease-in-out 2s;
    overflow-y: scroll;
`;

const ModalTitle = styled.div`
    padding: 3rem;
    color: black;
`;

const ModalDetail = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
`;

const ModalClose = styled.div`
    position: absolute;
    right: 3rem;
    top: 3.5rem;
    cursor: pointer;
    z-index: 1000;
    color: black;
`;
