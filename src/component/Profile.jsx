import axios from '../api/axios';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import requests from '../api/requests';
import ProfileModal from '../mordal/ProfileModal';

const Profile = ({ name, profile }) => {
    const [profilemodalOpen, setProfileModalOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileModalOpen(true);
    };

    const handleUserProfile = async () => {
        try {
            const response = await axios.get(
                `${requests.fetchUserProfile}${name}`,
                {
                    params: { friend_id: `${name}` },
                }
            );

            if (response.data.isSuccess) {
                console.log('사용자상세조회 성공');
            } else {
                console.log('사용자상세조회 실패:', response.data.message);
            }
        } catch (error) {
            console.error('사용자상세조회 오류:', error);
        }
    };
    // 나의 프로필 컴포넌트
    return (
        <ProfileContainer>
            <ProfileImg
                src={profile}
                onClick={() => {
                    handleProfileClick();
                    handleUserProfile();
                }}
            />
            {profilemodalOpen && (
                <ProfileModal
                    profile={profile}
                    name={name}
                    setProfileModalOpen={setProfileModalOpen}
                />
            )}
            <ProfileName>{name}</ProfileName>
        </ProfileContainer>
    );
};

export default Profile;

const ProfileContainer = styled.div`
    display: flex;
    height: 50px;
    align-items: center;
`;

const ProfileName = styled.p`
    margin: 0 1rem;
`;

const ProfileImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 20px;
    cursor: pointer;
`;
