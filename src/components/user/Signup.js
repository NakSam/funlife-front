import React, { useState } from "react";
import { Slide, Dialog, DialogTitle, IconButton, Toolbar } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SignUpWrapper, LabelInputBox, InputBox, SignUpButton } from "./styled/SignUp.styled";
// import { isEmptyList, isEmail, isPassword } from '../../utils/ValidationCheck'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Signup({ open, setOpen }){
    const [ signupData, setSignupData ] = useState({
        name: '',
        email: '',
        password:'',
    })

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.id] : e.target.value }) 
    }

    const handleClose = () => {
        setOpen({...open, signUp:false});
        setSignupData({ email: '', name: '', password:'' })
    };

    // const signUp = () => {
    //     //공백 검사
    //     var emptyCheck = isEmptyList(signupData);
    //     if(!emptyCheck === ''){
    //         alert(emptyCheck);
    //         return;
    //     }

    //     //이메일 검사
    //     var emailCheck = isEmail(signupData.email);
    //     if(!emailCheck === ''){
    //         alert(emailCheck);
    //         return;
    //     }

    //     //PW검사
    //     var pwCheck = isPassword(signupData.password);
    //     if(!pwCheck === ''){
    //         alert(pwCheck);
    //         return;
    //     }

    //     // axios 하기
    //     handleClose();
    // }

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
                    <InputBox name="name" id="name" maxLength="10" value={signupData.name} onChange={handleChange} />
                </div>
                <div>
                    <LabelInputBox htmlFor="email">이메일</LabelInputBox>
                    <InputBox name="email" id="email" value={signupData.email} onChange={handleChange} />
                </div>
                <div>
                    <LabelInputBox htmlFor="password">비밀번호</LabelInputBox>
                    <InputBox type="password" name="password" id="password" value={signupData.password} onChange={handleChange} />
                </div>
                <SignUpButton >회원가입</SignUpButton>
            </SignUpWrapper>
        </Dialog>
    );
}