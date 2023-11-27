import React, { useState } from 'react';
import { styled } from 'styled-components';
import { IoClose } from 'react-icons/io5';
import TransIcon from '../component/TransIcon';

const TransInfo = ({ type_list, time_list, setTransInfoModalOpen }) => {

    return (
        <ViewContainer>
            <RootContainer>
                <ModalContainer>
                    <ModalTitle>
                        <ModalDetail>세부 교통정보</ModalDetail>
                        <IoClose
                            size={'2rem'}
                            onClick={() => {
                                setTransInfoModalOpen(false);
                            }}
                        />
                    </ModalTitle>
                    {time_list.map((item, index) => (
                        <TransIcon
                            time={Math.ceil(item / 60)}
                            type={type_list[index]}
                        />
                    ))}
                </ModalContainer>
            </RootContainer>
        </ViewContainer>
    );
};

export default TransInfo;

const ViewContainer = styled.div`
    z-index: 1;
    position: relative;
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
    margin-bottom: 1rem;
`;

const ModalDetail = styled.p`
    font-weight: 600;
    font-size: 1.5rem;
`;