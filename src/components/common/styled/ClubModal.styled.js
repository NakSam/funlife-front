import styled from 'styled-components';
import { Modal, Row, Col } from "react-bootstrap";

export const ModalWrapper= styled(Modal)`
    color: #58555A;
    font-family: 'S-CoreDream-4Regular';
`;

export const ModalTitle = styled(Modal.Title)`
    margin-top: 1.3rem;
    font-weight: bolder;
    font-size: 1.2rem;
`;

export const ModalImgWrapper = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 12rem;
    border-radius: 0.7rem;
`;

export const ModalImg = styled.img`
    width: 100%;
    height: 100%;
`;

export const ModalHeader = styled(Modal.Header)`
    position: relative;
`;

export const ModalLocWrapper = styled.div`
    position: absolute;
    top: 0.7rem;
    left: 1rem;
`;

export const ModalLocIcon = styled.small`
    margin: 0.1rem;
    color: gray;
`;

export const ModalLoc = styled.small`
    font-size: 0.8rem;
    padding: 0.3rem 0.2rem;
    border: 0;
    color: gray;
    background-color: white;
`;

export const ModalCatBadge = styled.button`
    position : absolute;
    top: 0.7rem;
    left: 0.7rem;
    font-size: 0.75rem;
    border-radius: 0.6rem;
    padding: 0.2rem 0.6rem;
    border: 0;
    font-weight: bold;
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

export const ModalRow = styled(Row)`
    margin: 1rem auto;
    text-align: center;
    border-radius: 0.7rem;
    border: 1px solid lightgray;
    padding: 1rem 0;
`;

export const ModalCol = styled(Col)`
    border-right:1px solid lightgray;
`;

export const ModalColLabel = styled.p`
    font-weight: bold;
    margin: 0.7rem auto 0 auto;
`;


export const ClubButton = styled.button`
    padding: 0.5rem;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: white;
    color: #ffb300;
    border: 3px solid #ffb300;
    &:active,
    &:focus {
        background-color: #ffb300;
        color:white;
    }
`;