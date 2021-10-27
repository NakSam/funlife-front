import { useState } from "react";
import { ModalHeader, ModalTitle} from "../common/styled/LIstModal.styled";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axiosUtils from "../../utils/axiosUtils";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ClubPayModal({clubId, dues}) {
    let query = useQuery();

    const [clubPayModal, setClubPayModal] = useState(false);

    const submitHandler = (e) => {

        axiosUtils.post('/wallet/club/' + clubId + '/payment', {
            money: money
            })
          .then((response) => {

            alert("결제가 완료되었습니다.");
            window.location.href = '/clubDetail/?clubId=' + query.get("clubId");
            setClubPayModal(false);
          })
          .catch((error) => {
            
          }
        )
    };

    const [money, setMoney] = useState('');

    const onChange = (e) => {
        setMoney(e.target.value);
    }

    return(
        <div>
            <button className="transfer" onClick={()=> setClubPayModal({show: !clubPayModal.show})}>결제</button>

            <Modal show={clubPayModal.show}>
                <ModalHeader>
                    <ModalTitle>결제</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                <input         
                    name="name"
                    placeholder="금액"
                    value={money}
                    onChange={onChange}
                />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={submitHandler}>
                        결제하기
                    </Button>
                    <Button variant="success" onClick={()=> setClubPayModal(false)}>
                        취소
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}