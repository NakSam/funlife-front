import styled from "styled-components";

export const SignUpWrapper = styled.div`
    padding: 1rem 2rem;
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
`;

export const SignUpButton = styled.button`
    margin: 2.5rem 0.3rem;
    padding: 0.5rem;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: white;
    color: #a1a1a1;
    border: 3px solid #a1a1a1;
    font-family: 'S-CoreDream-6Bold';

    &:active,
    &:focus {
        background-color: #a1a1a1;
        color:white;
    }
`;

export const SignInButton = styled.button`
    margin: 2.5rem 0.3rem;
    padding: 0.5rem;
    font-weight: bold;
    border-radius: 0.4rem;
    background-color: white;
    color: #ffb300;
    border: 3px solid #ffb300;
    font-family: 'S-CoreDream-6Bold';

    &:active,
    &:focus {
        background-color: #ffb300;
        color:white;
    }
`;