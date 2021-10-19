import styled from "styled-components";
import { FormControl, TextField } from "@mui/material";

export const SelectBox1 = styled(FormControl)`
    width: 43%;
    margin-right: 0.6rem !important;
    margin-bottom: 0.8rem !important;;
`;

export const SelectBox2 = styled(FormControl)`
    width: 40%;
    margin-right: 0.3rem !important;
    margin-bottom: 0.8rem !important;;
`;

export const SearchInputBox = styled.div`
    display: flex;
`;

export const SearchInput = styled(TextField)`
    width: 90%;
`;

export const SearchButton = styled.button`
    margin-left: 0.5rem;
    margin-bottom: 0.4rem;
    color: gray;
    border: none;
    font-size: 1.4rem;
    background-color: white;
`;