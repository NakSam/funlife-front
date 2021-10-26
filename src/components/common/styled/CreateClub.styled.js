import styled from "styled-components";
import { Form } from "react-bootstrap";

import { Typography } from '@mui/material';

export const DialogTitle = styled(Typography)`
    color: #58555A;
`;

export const ImgWrapper = styled.div`
    margin-top: 0.7rem;
    max-height: 12rem;
    width: 100%;
    overflow:hidden;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    position: relative;
`;

export const ImgUploadButton = styled.div`
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
`;

export const DialogWrapper = styled.div`
    font-family: 'S-CoreDream-4Regular';
    padding: 0 1.5rem;
    color: #58555A;
`;

export const LabelInputBox = styled.label`
    font-family: 'S-CoreDream-6Bold';
    text-align:left;
    display: block;
    margin: 1rem 0.5rem 0.5rem 0.5rem;
`;

export const InputBox = styled.input`
    width: 100%;
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    padding: 0.7rem;
`;

export const LabelSelectBox = styled.label`
    font-family: 'S-CoreDream-6Bold';
    text-align:left;
    display: block;
    margin: 1rem 0.5rem 0.5rem 0.5rem;
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
    padding: 0.6rem;
    margin: 1rem 0;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: white;
    color: #ffb300;
    border: 2px solid #ffb300;

    &:active,
    &:focus {
        background-color: #ffb300;
        color:white;
    }
`;