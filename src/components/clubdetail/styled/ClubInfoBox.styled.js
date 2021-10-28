import styled from "styled-components";

export const BoxWrapper = styled.div`
    width:100%;
    height:10.5rem;
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    font-family: 'S-CoreDream-6Bold';
    background-color:${props => {
        if (props.club.category === '스포츠') {
            return '#D7E9F7'
        } else if (props.club.category === '맛집탐방') {
            return '#F4D19B'
        } else {
            return '#D4E2D4'
        }
    }};
`;

export const UserButton1 = styled.button`
    margin-left: 0.7rem;
    padding: 0.1rem 0.3rem;
    font-weight: bold;
    font-size:0.9rem;
    border-radius: 0.4rem;
    border: 2px solid #a1a1a1;
    font-family: 'S-CoreDream-6Bold';
    background-color: #a1a1a1;
    color: white;
`;

export const UserWalletInfoWrapper = styled.div`
    background-color: white;
    border-radius: 0.8rem;
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

export const ButtonWrapper = styled.div`
    display: flex;
    border: 3px solid #f2f2f2;
    border-radius: 0.5rem;
`;

export const Button = styled.p`
    margin:0;
    border-radius: 0.5rem;
    text-align:center;
`;