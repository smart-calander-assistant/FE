import React, { useState } from 'react';
import {
    IoCalendarNumber,
    IoCalendarNumberOutline,
    IoCreate,
    IoCreateOutline,
    IoEllipsisHorizontalSharp,
    IoEllipsisHorizontalOutline,
} from 'react-icons/io5';
import { AiFillSchedule, AiOutlineSchedule, } from 'react-icons/ai';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = ({ label }) => {

    if (label === 'calendar') {
        return (
            <FooterContainer>
                <LinkIcon to='/calendar'>
                    <IoCalendarNumber size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/todoplan'>
                    <IoCreateOutline size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/schedule'>
                    <AiOutlineSchedule size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/setting'>
                    <IoEllipsisHorizontalOutline size={'1.5rem'} />
                </LinkIcon>
            </FooterContainer>
        );
    } else if (label === 'todoplan') {
        return (
            <FooterContainer>
                <LinkIcon to='/calendar'>
                    <IoCalendarNumberOutline size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/todoplan'>
                    <IoCreate size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/schedule'>
                    <AiOutlineSchedule size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/setting'>
                    <IoEllipsisHorizontalOutline size={'1.5rem'} />
                </LinkIcon>
            </FooterContainer>
        );
    } else if (label === 'schedule') {
        return (
            <FooterContainer>
                <LinkIcon to='/calendar'>
                    <IoCalendarNumberOutline size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/todoplan'>
                    <IoCreateOutline size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/schedule'>
                    <AiFillSchedule size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/setting'>
                    <IoEllipsisHorizontalOutline size={'1.5rem'} />
                </LinkIcon>
            </FooterContainer>
        );
    } else if (label === 'setting') {
        return (
            <FooterContainer>
                <LinkIcon to='/calendar'>
                    <IoCalendarNumberOutline size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/todoplan'>
                    <IoCreateOutline size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/schedule'>
                    <AiOutlineSchedule size={'1.5rem'} />
                </LinkIcon>
                <LinkIcon to='/setting'>
                    <IoEllipsisHorizontalSharp size={'1.5rem'} />
                </LinkIcon>
            </FooterContainer>
        );
    }
};

export default Footer;

const FooterContainer = styled.div`
    display: flex;

    bottom: 0;
    height: 2rem;
    padding: 0.9375rem 3.75rem;
    justify-content: space-between;
    align-items: center;
    background-color: #a9def9;
`;

const LinkIcon = styled(Link)`
    color: black;
`;
