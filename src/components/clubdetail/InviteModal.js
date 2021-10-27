import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalHeader, ModalTitle} from "../common/styled/ClubModal.styled";
import { Modal, Button } from "react-bootstrap";
import axiosUtils from "../../utils/axiosUtils";

export default function InviteModal({ name, inviteModal, setInviteModal }) {
    const [Email, SetEmail] = useState("");

    const emailHandler = (e) => { e.preventDefault(); SetEmail(e.target.value); };

    const submitHandler = (e) => {
        e.preventDefault();

        axiosUtils.post('/club/invite', {
            clubId : 1,
            emails : [
                Email
            ]
        })
          .then((response) => {

          })
          .catch((error) => {
            
          })
    };

    return(
        <Modal show={inviteModal.show}>
            <ModalHeader>
                <ModalTitle>{name}에 멤버 초대</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <input type="text" placeholder="Search.." name="search" value={Email} onChange={emailHandler} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={submitHandler}>
                    초대하기
                </Button>
                <Button variant="success" onClick={()=> setInviteModal(false)}>
                닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}