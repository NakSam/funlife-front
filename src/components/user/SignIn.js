import React, { useState } from "react";
import Signup from "./SignUp";
import { Slide, Dialog, DialogTitle, IconButton, Toolbar } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SignUpWrapper, LabelInputBox, InputBox, SignInButton, SignUpButton } from "./styled/SignIn.styled";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn({ open, setOpen }){
    const [ signInData, setSignInData ] = useState({ email: '', password:'' })

    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.id] : e.target.value }) 
    }

    const handleClose = () => {
        setOpen({...open, signIn:false});
        setSignInData({ email: '', name: '', password:'' })
    };

    const signUp = () => {
        setOpen({...open, signUp:true})
    }

    const signIn = () => {
        // axios 하기
        // axios.post("https://naksam.169.56.174.130.nip.io/user/session/login", loginData)
        // .then(() => { setLoginModal({modal:false, login:true});setLogin(cookie.load("naksam"));console.log(cookie.load("naksam")); })
        // .catch(() => alert("로그인에 실패하였습니다."))
        handleClose();
    }

    return (
        <Dialog 
            fullScreen 
            open={open.signIn} 
            TransitionComponent={Transition} 
            onClose={handleClose}
            style={{ textAlign: "center" }}
        >
            <Toolbar style={{marginTop:"0.7rem"}}>
                <IconButton
                    edge="start"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <DialogTitle variant="h6" style={{padding: "0"}}>로그인</DialogTitle>
            </Toolbar>
            <SignUpWrapper>
                <div>
                    <LabelInputBox htmlFor="email">이메일</LabelInputBox>
                    <InputBox name="email" id="email" value={signInData.email} onChange={handleChange} />
                </div>
                <div>
                    <LabelInputBox htmlFor="password">비밀번호</LabelInputBox>
                    <InputBox type="password" name="password" id="password" value={signInData.password} onChange={handleChange} />
                </div>
                <SignUpButton name="signUp" onClick={signUp}>회원가입</SignUpButton>
                <SignInButton name="signIn" onClick={signIn}>로그인</SignInButton>
                <Signup open={open} setOpen={setOpen} />
            </SignUpWrapper>
        </Dialog>
    );
}