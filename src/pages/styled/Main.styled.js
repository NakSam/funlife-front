import styled from "styled-components";

export const MainTitleWrapper = styled.div`
    display: flex;
    width: 100%;
`;

export const MainLogo = styled.div`
    height:3.5rem;
    display:block;
    margin: 0.5rem auto 2.5rem auto;
`;

export const Button = styled.button`
    border: 0;
    margin: 0.4rem 0;
    background-color: #F2F2F2;
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.7rem;
    color: #58555A;
    font-family: 'S-CoreDream-6Bold';
    &:active,
    &:visited { 
        background-color: #EDEDED;
    }
`;

export const MainAddClub = styled.div`    
`;

export const MyClubList = styled.div`
    background-color:#f2b70544;
    width:100vw;
    margin-left: calc(-50vw + 50%);  
    margin-top:1rem;
`;

export const SectionTitle1 = styled.h5`
    color: #58555A;
    font-size: 1.2rem;
    display:inline-block;
    font-family: 'S-CoreDream-6Bold';
    padding:1rem 2rem 0 2rem;
`;

export const SectionTitle = styled.h5`
    margin-top: 3rem;
    color: #58555A;
    font-size: 1.2rem;
    font-family: 'S-CoreDream-6Bold';
`;

export const LatestClub = styled.div`
    margin-bottom: 4rem;
`;
