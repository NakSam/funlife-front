import React, { useState } from "react";
import { Slide, Dialog, DialogTitle, IconButton, Toolbar } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SignUpWrapper, LabelInputBox, InputBox, SignUpButton } from "./styled/SignUp.styled";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Signup({ open, setOpen }){
    const [ signupData, setSignupData ] = useState({
        email: '',
        name: '',
        password:'',
    })

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.id] : e.target.value }) 
    }

    const handleClose = () => {
        setOpen({...open, signUp:false});
        setSignupData({ email: '', name: '', password:'' })
    };

    const signUp = () => {
        // axios 하기
        handleClose();
    }

    return (
        <Dialog 
            fullScreen 
            open={open.signUp} 
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
                <DialogTitle variant="h6" style={{padding: "0"}}>회원가입</DialogTitle>
            </Toolbar>
            <SignUpWrapper>
                <div>
                    <LabelInputBox htmlFor="name">닉네임</LabelInputBox>
                    <InputBox name="name" id="name" value={signupData.name} onChange={handleChange} />
                </div>
                <div>
                    <LabelInputBox htmlFor="email">이메일</LabelInputBox>
                    <InputBox name="email" id="email" value={signupData.email} onChange={handleChange} />
                </div>
                <div>
                    <LabelInputBox htmlFor="password">비밀번호</LabelInputBox>
                    <InputBox type="password" name="password" id="password" value={signupData.password} onChange={handleChange} />
                </div>
                <SignUpButton onClick={signUp}>회원가입</SignUpButton>
            </SignUpWrapper>
        </Dialog>
    );
}