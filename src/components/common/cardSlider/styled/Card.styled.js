import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardWrapper = styled.div`
    margin: 0.3rem 0.6rem;
`;

export const LinkWrapper = styled(Link)`
    color: #58555A;
    text-decoration:none;
`;

export const Thumbnail = styled.img`
    border-radius: 0.7rem;
    width: 100%;
    height:5rem;
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
`;

export const Category = styled.small`
    display:inline-block;
    padding: 0.2rem 0.6rem;
    font-size:0.75rem;
    margin:0.2rem 0;
    border-radius:0.6rem;
    background-color : ${props => {
        if (props.cate === '스포츠') {
            return '#D7E9F7'
        } else if (props.cate === '맛집탐방') {
            return '#F4D19B'
        } else {
            return '#D4E2D4'
        }
    }};
`;
