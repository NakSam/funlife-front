import { useState } from "react";
import { ModalHeader, ModalTitle} from "../common/styled/ClubModal.styled";
import { Modal, Button } from "react-bootstrap";
import axiosUtils from "../../utils/axiosUtils";
import React from "react";
import WalletHistory from "../common/WalletHistory";

export default function HistoryModal({clubId}) {
    const [HistoryModal, setHistoryModal] = useState(false);

    const [clubWalletHistory, setClubWalletHistory] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/wallet/club/"+clubId+"/history").then((response) => {
            setClubWalletHistory(response.data.depositHistories);
            console.log(response.data.depositHistories);
        });
    }, []);


    return (
        <div>
            <button onClick={()=> setHistoryModal({show: !HistoryModal.show})}>내역</button>

            <Modal show={HistoryModal.show}>
                <ModalHeader>
                    <ModalTitle>지갑내역</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    <WalletHistory data={clubWalletHistory}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=> setHistoryModal(false)}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}