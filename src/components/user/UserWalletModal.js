import { ChargeBtn, BarTag, ExchangeBtn } from "./styled/UserInfo.styled";
import { Modal, Button } from "react-bootstrap";
import { ModalHeader, ModalTitle} from "../common/styled/ClubModal.styled";
import { useState } from "react";
import axiosUtils from "../../utils/axiosUtils";
import React from "react";
import WalletHistory from "../common/WalletHistory"

export default function UserWalletModal(){
    const [ showModal, setShowModal ] = useState(false);

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
        axiosUtils.post("/wallet/my/"+showModal.type, {
            money: money
        });
        setShowModal({...showModal, show: !showModal.show});
        setMoney('');
        window.location.href = "/userinfo";
    }

    const [myWalletHistory, setMyWalletHistory] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/wallet/my/history").then((response) => {
            setMyWalletHistory(response.data.depositHistories);
        });
    }, []);
    
    if(showModal.type == 'history'){
        return(
            <div>
                <ChargeBtn onClick={() => setShowModal({show: !showModal.show, type:"deposit"})}>충전</ChargeBtn>
                <BarTag></BarTag>
                <ExchangeBtn onClick={() => setShowModal({show: !showModal.show, type:"exchange"})}>환전</ExchangeBtn>
                <BarTag></BarTag>
                <ExchangeBtn onClick={() => setShowModal({show: !showModal.show, type:"history"})}>내역</ExchangeBtn>

                <Modal show={showModal.show}>
                    <ModalHeader>
                        <ModalTitle>지갑내역</ModalTitle>
                    </ModalHeader>
                    <Modal.Body>
                        <WalletHistory data={myWalletHistory}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={()=> setShowModal(false)}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }else{
        return(
            <div>
                <ChargeBtn onClick={() => setShowModal({show: !showModal.show, type:"deposit"})}>충전</ChargeBtn>
                <BarTag></BarTag>
                <ExchangeBtn onClick={() => setShowModal({show: !showModal.show, type:"exchange"})}>환전</ExchangeBtn>
                <BarTag></BarTag>
                <ExchangeBtn onClick={() => setShowModal({show: !showModal.show, type:"history"})}>내역</ExchangeBtn>
                
                <Modal show={showModal.show}>
                    <ModalHeader>
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
                        <Button variant="success" onClick={()=> setShowModal(false)}>
                            취소
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
    
}
