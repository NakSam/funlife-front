import styled from "styled-components";
import { Form } from "react-bootstrap";
import { FormControl, TextField } from "@mui/material";


export const LabelSelectBox = styled.label`
    font-family: 'S-CoreDream-6Bold';
    text-align:left;
    display: block;
    margin: 0rem 0.5rem 0.5rem 0.5rem;
`;

export const SelectBox1 = styled(Form.Select)`
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    font-weight:bold;
`;

export const SelectBox2 = styled(Form.Select)`
    margin-left:0.6rem;
    height: 3rem;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    font-weight:bold;
`;

export const SearchInputBox = styled.div`
    display: flex;
    position: relative;
    margin-top: 0.5rem;
`;

export const SearchInput = styled.input`
    width: 93%;
    border: 2px solid #dedede;
    border-radius: 0.4rem;
    padding: 0.7rem;
    height: 3rem;
`;

export const SearchButton = styled.button`
    position: absolute;
    right: 1.8rem;
    top:0.4rem;
    color: #cdcdcd;
    border: none;
    font-size: 1.4rem;
    background-color: white;
`;