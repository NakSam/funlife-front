import { useState } from "react";
import { ModalHeader, ModalTitle} from "../common/styled/ClubModal.styled";
import { Modal, Button } from "react-bootstrap";
import axiosUtils from "../../utils/axiosUtils";

export default function ClubDepositModal({clubId, dues}) {
    const [clubDepositModal, setClubDepositModal] = useState(false);

    const submitHandler = (e) => {

        axiosUtils.post('/wallet/club/' + clubId + '/deposit')
          .then((response) => {
            console.log(response);
            alert("송금이 완료되었습니다.");
            setClubDepositModal(false);
          })
          .catch((error) => {
            
          })
    };

    return(
        <div>
            <button class="transfer" onClick={()=> setClubDepositModal({show: !clubDepositModal.show})}>송금</button>

            <Modal show={clubDepositModal.show}>
            <ModalHeader>
                    <ModalTitle>송금</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    회비 {dues}원이 송금됩니다.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={submitHandler}>
                        송금하기
                    </Button>
                    <Button variant="success" onClick={()=> setClubDepositModal(false)}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}