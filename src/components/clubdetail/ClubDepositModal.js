import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import axios from "axios";

export default function ClubDepositModal({clubId, dues}) {
    const [clubDepositModalIsOpen, setClubDepositModalIsOpen] = useState(false);

    const submitHandler = (e) => {

        axios({
            method:"post",
            url:'http://naksam.169.56.174.130.nip.io:80/wallet/club/' + clubId + '/deposit',
            data:{
            }
          })
          .then((response) => {
            console.log(response);
            alert("송금이 완료되었습니다.");
            setClubDepositModalIsOpen(false);
          })
          .catch((error) => {
            
          })
    };

    return(
        <div>
            <button class="transfer" onClick={()=> setClubDepositModalIsOpen(true)}>송금</button>
            <Modal isOpen={clubDepositModalIsOpen} ariaHideApp={false}>
                <h5>회비 {dues}원이 송금됩니다.</h5>
                <button onClick={submitHandler}>보내기</button>
                <button onClick={()=> setClubDepositModalIsOpen(false)}>닫기</button>
            </Modal>
        </div>
    );
}