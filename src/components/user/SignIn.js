import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import Signup from "./Signup";
import axiosUtils from "../../utils/axiosUtils";
import { loginStatus } from "../../states/state";
import { isEmail, isPassword } from '../../utils/ValidationCheck'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Slide, Dialog, DialogTitle, IconButton, Toolbar } from "@mui/material"
import { SignUpWrapper, LabelInputBox, InputBox, SignInButton, SignUpButton } from "./styled/SignIn.styled";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn({ open, setOpen }) {
    const setUserStatus = useSetRecoilState(loginStatus);
    const [signInData, setSignInData] = useState({ email: '', password: '' });
    const handleChange = (e) => {
        setSignInData({ ...signInData, [e.target.id]: e.target.value })
    }

    const handleClose = () => {
        setOpen({ ...open, signIn: false });
        setSignInData({ email: '', password: '' })
    };

    const signUp = () => {
        setOpen({ ...open, signUp: true })
    }

    const signIn = () => {
        //이메일 검사
        var emailCheck = isEmail(signInData.email);
        if (!emailCheck === '') {
            alert(emailCheck);
            return;
        }

        //PW검사
        var pwCheck = isPassword(signInData.password);
        if (!pwCheck === '') {
            alert(pwCheck);
            return;
        }

        // axios 하기
        axiosUtils.post("/user/session/login", signInData)
            .then(() => { setUserStatus(true); handleClose(); })
            .catch(() => alert("로그인에 실패하였습니다."))
    }

    return (
        <Dialog
            fullScreen
            open={open.signIn}
            TransitionComponent={Transition}
            onClose={handleClose}
            style={{ textAlign: "center" }}
        >
            <Toolbar style={{ marginTop: "0.7rem" }}>
                <IconButton
                    edge="start"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <DialogTitle variant="h6" style={{ padding: "0" }}>로그인</DialogTitle>
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