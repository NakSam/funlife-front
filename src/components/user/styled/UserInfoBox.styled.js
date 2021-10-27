import styled from "styled-components";

export const ProfileWrapper = styled.div`
    width:100%;
    height:11.5rem;
    background-color:#f2f2f2;
    border-radius: 1rem;
    margin-bottom: 3rem;
    font-family: 'S-CoreDream-6Bold';
`;

export const UserInfoWrapper = styled.div`
    padding: 1.3rem 1.3rem 0.2rem 1.3rem;
    display: flex;
`;

export const UserImgWrapper = styled.div`
    width:4rem;
    height:4rem;
    border-radius:1rem;
    background-image:url("../../../static/img/user.jpg");
`;

export const UserImg = styled.img`
    border-radius:1rem;
`;

export const UserInfos = styled.div`
    width: 70%;
`;

export const UserName = styled.p`
    margin: 0 1rem;
    font-size: 1.3rem;
`;


export const UserButtonWrapper = styled.div`
    margin-left: 1rem;

`;

export const UserButton = styled.button`
    margin: 0.3rem 0.1rem 0 0;
    padding: 0.2rem 0.4rem;
    font-weight: bold;
    font-size:0.9rem;
    border-radius: 0.4rem;
    border: 3px solid #ffb300;
    font-family: 'S-CoreDream-6Bold';
    background-color: white;
    color: #ffb300;

    &:active,
    &:focus {
        background-color: #ffb300;
        color:white;
    }
`;

export const UserWalletInfoWrapper = styled.div`
    background-color: white;
    border-radius: 0.8rem;
    margin:0.7rem 1rem;
    height:3.6rem;
    display: flex;
    padding: 1rem;
`;

export const LeftWalletInfo = styled.p`
    font-family: 'S-CoreDream-6Bold';
`;

export const RightWalletInfo = styled.p`
    font-family: 'S-CoreDream-6Bold';
    margin-lefT: auto;
`;

