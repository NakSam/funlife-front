import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const ModalTitle = styled(Modal.Title)`
    font-weight:bold;
`;

export const InputBox = styled.input`
    padding: 0.5rem 0.8rem;
    margin: 0.5rem;
    width: 90%;
    border-radius: 0.5rem;
    border: 0.3px solid #818181;
`;

export const InputBoxLabel = styled.p`
    font-weight:bold;
    margin: 0 0.3rem;
`;