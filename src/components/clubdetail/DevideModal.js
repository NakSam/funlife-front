import { useState } from "react";
import { ModalHeader, ModalTitle} from "../common/styled/LIstModal.styled";
import { Modal, Button } from "react-bootstrap";
import axiosUtils from "../../utils/axiosUtils";

export default function DevideModal({clubId}) {
    const [devideModal, setDevideModal] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        
        axiosUtils.post('/wallet/club/' + clubId + '/distribute')
          .then((response) => {
            alert("정산이 완료되었습니다.");
            setDevideModal(false);
          })
          .catch((error) => {
            
          })
    };

    return(
        <div>
            <button className="devide" onClick={()=> setDevideModal({show: !devideModal.show})}>정산</button>

            <Modal show={devideModal.show}>
            <ModalHeader>
                    <ModalTitle>정산</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    정산하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={submitHandler}>
                        정산하기
                    </Button>
                    <Button variant="success" onClick={()=> setDevideModal(false)}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}