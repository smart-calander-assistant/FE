import React, { useRef, useState } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import './AddFriend.css';
import { styled } from 'styled-components';
import kakaotalk_logo from './../img/kakaotalk_logo_edge.png';

export default function ProfileModal({ profile, name, setProfileModalOpen }) {
    // 프로필화면 모달
    const ref = useRef();
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setValue('');
    };
    useOnClickOutside(ref, () => {
        setProfileModalOpen(false);
    });

    return (
        <div className='presentation'>
            <div className='wrapper-modal'>
                <div className='modal' ref={ref}>
                    <img
                        src={kakaotalk_logo}
                        style={{
                            width: '25rem',
                            height: '35rem',
                        }}
                    />
                    <div>
                        <SearchNavigator>
                            <ProfileImg src={profile} />
                            <p className='modal__details'>{name}</p>
                            <ModalClose
                                onClick={() => setProfileModalOpen(false)}
                            >
                                X
                            </ModalClose>
                        </SearchNavigator>
                    </div>
                </div>
            </div>
        </div>
    );
}

const SearchNavigator = styled.div`
    justify-content: center;
`;

const ProfileImg = styled.img`
    width: 5rem;
    height: 5rem;
    cursor: pointer;
`;

const ModalClose = styled.span`
    position: absolute;
    right: 3rem;
    top: 3.5rem;
    cursor: pointer;
    z-index: 1000;
    color: black;
`;
