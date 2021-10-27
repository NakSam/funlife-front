import styled from "styled-components";

export const UserInfoTitle = styled.h1`
    color:#ffb300;
    margin: 2rem auto;
    font-weight: bold;
    font-family: 'S-CoreDream-6Bold';
`;

export const MyClubList = styled.div`
    width:100vw;
    margin-left: calc(-50vw + 50%);  
    margin-top:1rem;
`;

export const Button = styled.button`
    border: 0;
    margin: auto 0;
    background-color: #F2F2F2;
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.7rem;
    color: #58555A;
    height:7rem;
    font-family: 'S-CoreDream-6Bold';
    &:active,
    &:visited { 
        background-color: #EDEDED;
    }
`;

export const SectionTitle = styled.h5`
    color: #58555A;
    font-size: 1.2rem;
    display:inline-block;
    font-family: 'S-CoreDream-6Bold';
    padding:1rem 2rem 0 2rem;
`;