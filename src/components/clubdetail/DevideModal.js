import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import axios from "axios";

export default function DevideModal({clubId}) {
    const [devideModalIsOpen, setDevideModalIsOpen] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        
        axios({
            method:"post",
            url:'http://naksam.169.56.174.130.nip.io:80/wallet/club/' + clubId + '/distribute',
            data:{
            }
          })
          .then((response) => {
            console.log(response);
            alert("성공");
            setDevideModalIsOpen(false);
          })
          .catch((error) => {
            
          })
    };

    return(
        <div>
            <button class="devide" onClick={()=> setDevideModalIsOpen(true)}>정산</button>
            <Modal isOpen={devideModalIsOpen} ariaHideApp={false}>
                <h5>정산하시겠습니까?</h5>
                <button onClick={submitHandler}>예</button>
                <button onClick={()=> setDevideModalIsOpen(false)}>닫기</button>
            </Modal>
        </div>
    );
}