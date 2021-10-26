import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import axios from "axios";

export default function HistoryModal() {
    const [HistoryModalIsOpen, setHistoryModalIsOpen] = useState(false);

    return (
        <div>
            <button class="history" onClick={()=> setHistoryModalIsOpen(true)}>내역</button>
            <Modal isOpen={HistoryModalIsOpen} ariaHideApp={false}>
                This is Modal content3
                <button onClick={()=> setHistoryModalIsOpen(false)}>Modal Open</button>
            </Modal>
        </div>
    );
}