import styled from "styled-components";

export const ListWrapper = styled.div`
    display: flex;
    padding: 0.5rem;
    overflow: hidden;
    margin: 0.4rem 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width:100%;
    &:active,
    &:visited { 
        background-color: #EDEDED;
    }
    border-radius: 0.6rem;
    background-color:#f2f2f299;
`;

export const Left = styled.div`
    margin-top: 0.2rem;
`;

export const Thumbnail = styled.img`
    width: 8.5rem;
    height: 6rem;
    border-radius:0.7rem;
`;

export const Right = styled.div`
    margin-left: 1rem;
    width: 100%;
`;

export const Location = styled.small`
    font-size:0.75rem;
`;

export const ClubName = styled.p`
    font-weight:bolder;
    margin:0;
`;

export const PeopleCnt = styled.small`
    display:block;
    font-size:0.75rem;
    padding: 0.1rem 0;
`;

export const Category = styled.small`
    display:inline-block;
    padding: 0.2rem 0.6rem;
    font-size:0.75rem;
    margin:0.2rem 0;
    border-radius:0.6rem;
    font-weight: bold;
    background-color : ${props => {
        if (props.cate == '스포츠') {
           return '#D7E9F7'
        } else if (props.cate == '맛집탐방') {
            return '#F4D19B'
        } else {
            return '#D4E2D4'
        }
    }};
`;