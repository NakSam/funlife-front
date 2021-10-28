import styled from "styled-components";
import { Typography } from '@mui/material';

export const DialogTitle = styled(Typography)`
    color: #58555A;
`;

export const DialogWrapper = styled.div`
    height : 25rem;
    font-family: 'S-CoreDream-4Regular';
    padding: 0 1.5rem;
    color: #58555A;
`;

export const DialogWrapper1 = styled.div`
    height : 12rem;
    font-family: 'S-CoreDream-4Regular';
    padding: 0 1.5rem;
    color: #58555A;
`;

export const InputBox = styled.input`
    width: 100%;
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    padding: 0.7rem;
    margin-top: 1rem;
`;

export const InputBox2 = styled.input`
    width: 100%;
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    padding: 0.7rem;
    margin-top: 1rem;
    &::placeholder {
        color: black;
        font-weight:bold;
    }
`;

export const CreateButton = styled.button`
    margin: 1rem 0.2rem;
    padding: 0.5rem;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: #ffb300;
    color: white;
    border:0;
`;

export const CancleButton = styled.button`
    margin: 1rem 0.2rem;
    padding: 0.5rem;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: #a1a1a1;
    color: white;
    border:0;
`;
export const LabelInputBox = styled.label`
    font-family: 'S-CoreDream-6Bold';
    text-align:left;
    display: block;
    margin: 1rem 0.5rem 0.2rem 0.5rem;
`;
