import { useState } from "react";
import { ModalHeader, ModalTitle} from "../common/styled/ClubModal.styled";
import { Modal, Button } from "react-bootstrap";
import axiosUtils from "../../utils/axiosUtils";

export default function InviteModal({ clubId, name, inviteModal, setInviteModal, sendToMessage }) {
    const [email, setEmail] = useState("");

    const emailHandler = (e) => { e.preventDefault(); setEmail(e.target.value); };

    const submitHandler = (e) => {
        e.preventDefault();
        axiosUtils.get('/user/search?email='+email)
        .then((res)=>{            
            const msg = {
                clubName:name,
                clubId:clubId,
                email:email
            }
            sendToMessage("naksam", res.data.id, msg, 1);
        })
        .catch((err)=>{console.log(err);alert('존재하지 않는 사용자입니다.')});        
        // axiosUtils.post('/club/invite', {
        //     clubId : 1,
        //     emails : [
        //         Email
        //     ]
        // })
        //   .then((response) => {

        //   })
        //   .catch((error) => {
            
        //   })
    };

    return(
        <Modal show={inviteModal.show}>
            <ModalHeader>
                <ModalTitle>{name}에 멤버 초대</ModalTitle>
            </ModalHeader>
            <Modal.Body>
                <input type="text" placeholder="Search.." name="search" value={email} onChange={emailHandler} />
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