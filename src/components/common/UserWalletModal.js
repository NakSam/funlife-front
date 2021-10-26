import { useRecoilState } from "recoil";
import { UserWalletModalStatus } from "../../states/state";
import { Modal, Button } from "react-bootstrap";
import { ModalHeader, ModalTitle} from "./styled/LIstModal.styled";
import { useState } from "react";
import useUserWalletModal from "../../hooks/useUserWalletModal";

export default function UserWalletModal(){
    const [ showModal, setShowModal ] = useRecoilState(UserWalletModalStatus);

    const handleClose = () => setShowModal({...showModal, show: !showModal.show});

    const [money, setMoney] = useState('');
    let text = "";
    if(showModal.type == 'deposit'){
        text = "충전";
    }else{
        text = "환전";
    }

    const onChange = (e) => {
        setMoney(e.target.value);
    }

    const HandleApply = (e) => {
        const { data } = useUserWalletModal(showModal.type, money);
        setShowModal({...showModal, show: !showModal.show});
        setMoney('');
        window.location.href = "/userinfo";
    }

    return(
        <Modal show={showModal.show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>{text}</ModalTitle>
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
                <Button variant="success" onClick={HandleApply}>
                    {text}하기
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
