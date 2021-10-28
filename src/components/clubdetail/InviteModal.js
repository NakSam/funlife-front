import React, { useState } from "react";
import { Slide, Dialog, Toolbar } from "@mui/material";
import { DialogTitle, DialogWrapper1, InputBox, LabelInputBox, CreateButton  } from "../user/styled/UserWalletModal.styled"

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function InviteModal({ clubId, name, inviteModal, setInviteModal, sendToMessage }) {
    const [inviteData, setInviteData] = useState({email:''})

    const handleClose = () => setInviteModal(false);
    const handleChange = (e) => setInviteData({email: e.target.value})
    const inviteMember = (e) => {
        e.preventDefault();
        axiosUtils.get('/user/search?email='+inviteData.email)
        .then((res)=>{            
            const msg = {
                clubName:name,
                clubId:clubId,
                email:inviteData.email
            }
            sendToMessage("naksam", res.data.id, msg, 1);
        })
        .catch((err)=>{console.log(err);alert('존재하지 않는 사용자입니다.')});
    }

    return(
        <Dialog
            open={inviteModal.show}
            onClose={handleClose}
            TransitionComponent={Transition}
            style={{ textAlign: "center" }}
        >
            <Toolbar style={{ marginTop: "0.7rem" }}>
                <DialogTitle variant="h6">멤버 초대하기</DialogTitle>
            </Toolbar>
            <DialogWrapper1>
                <LabelInputBox htmlFor="email"> </LabelInputBox>
                <InputBox name="email" id="email" value={inviteData.email} onChange={handleChange} />
                <CreateButton onClick={inviteMember}>초대하기</CreateButton>
            </DialogWrapper1>
        </Dialog>
    );
}