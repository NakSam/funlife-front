import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from 'react-modal';
import axios from "axios";

export default function InviteModal({name}) {
    const [inviteModalIsOpen, setInviteModalIsOpen] = useState(false);

    const [Email, SetEmail] = useState("");

    const emailHandler = (e) => { e.preventDefault(); SetEmail(e.target.value); };

    const submitHandler = (e) => {
        e.preventDefault();
        
        console.log(Email);

        axios({
            method:"post",
            url:'http://naksam.169.56.174.130.nip.io:80/club/invite',
            data:{
                clubId : 1,
                emails : [
                  Email
                ]
              }
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            
          })
    };

    return(
        <div>
            <button class="invitation" onClick={()=> setInviteModalIsOpen(true)}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</button>
            
            <Modal class="inviteModal" isOpen={inviteModalIsOpen} ariaHideApp={false}>
                <FontAwesomeIcon icon="fa-solid fa-envelope" />
                <br />
                {name}에 멤버 초대
                <br />
                <div class="search-container">
                    <form onSubmit={submitHandler}>
                        <FontAwesomeIcon icon="fa-solid fa-user" />
                        <input type="text" placeholder="Search.." name="search" value={Email} onChange={emailHandler} />
                        <button type="submit">Invite</button>
                    </form>
                </div>
                <button onClick={()=> setInviteModalIsOpen(false)}>닫기</button>
            </Modal>
        </div>
    );
}