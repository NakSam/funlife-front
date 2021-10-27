import styled from "styled-components";
import { Form } from "react-bootstrap";
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

export const LabelInputBox = styled.label`
    font-family: 'S-CoreDream-6Bold';
    text-align:left;
    display: block;
    margin: 1rem 0.5rem 0.2rem 0.5rem;
`;

export const InputBox = styled.input`
    width: 100%;
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    padding: 0.7rem;
    margin-top: 1rem;
`;

export const LabelSelectBox = styled.label`
    font-family: 'S-CoreDream-6Bold';
    text-align:left;
    display: block;
    margin: 1rem 0.5rem 0.2rem 0.5rem;
`;


export const SelectBox = styled(Form.Select)`
    margin:auto;
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
`;

export const DescriptionBox = styled.textarea`
    width: 100%;
    height: 8rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    padding: 0.7rem;
`;

export const CreateButton = styled.button`
    margin: 1rem 0;
    padding: 0.5rem;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: #ffb300;
    color: white;
    border: 3px solid #ffb300;
`;