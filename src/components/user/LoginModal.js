import { useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import cookie from "react-cookies";
import { Modal, Button } from "react-bootstrap";
import { loginStatus } from "../../states/state";
import { ModalTitle, InputBox, InputBoxLabel } from "./styled/LoginModal.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoginModal({loginModal, setLoginModal}){
    const setLogin = useSetRecoilState(loginStatus);
    const [ loginData, setLoginData ] = useState({email:'', password:''});
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name] : value }) 
    }

    const signIn = (e) => {
        axios.post("https://naksam.169.56.174.130.nip.io/user/session/login", loginData)
        .then(() => { setLoginModal({modal:false, login:true});setLogin(cookie.load("naksam"));console.log(cookie.load("naksam")); })
    }
    
    return(
        <Modal show={loginModal.modal} onHide={() => setLoginModal({...loginModal, modal:false})}>
            <Modal.Header>
                <ModalTitle>Sign In</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <InputBoxLabel><FontAwesomeIcon icon="fa-solid fa-envelope" /> E-mail</InputBoxLabel>
                <InputBox style={{marginBottom:"1.7rem"}} type="email" name="email" value={loginData.email} placeholder="E-Mail" onChange={handleChange} />
                <InputBoxLabel><FontAwesomeIcon icon="fa-solid fa-lock" /> Password</InputBoxLabel>
                <InputBox type="password" name="password" value={loginData.password} placeholder="Password" onChange={handleChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Sign Up</Button>
                <Button variant="success" onClick={signIn}>Sign In</Button>
            </Modal.Footer>
        </Modal>
    );
}