import React from "react";
import { useState, useEffect } from "react";
import axiosUtils from "../../utils/axiosUtils";
import WalletHistory from "../common/WalletHistory"
import { Slide, Dialog, Toolbar, IconButton } from "@mui/material";
import { DialogTitle, DialogWrapper, InputBox, CreateButton } from "./styled/UserWalletModal.styled";
import card from '../../static/img/kbcard.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Query } from "react-query";
import { useLocation } from "react-router";
import { isEmpty, moneyLimit } from '../../utils/ValidationCheck'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserWalletModal({ showModal, setShowModal }){
    let query = new URLSearchParams(useLocation().search);

    const [myWalletHistory, setMyWalletHistory] = useState("");
    const [clubWalletHistory, setClubWalletHistory] = useState("");
    const [money, setMoney] = useState();
    
    useEffect(() => {
        axiosUtils.get("/wallet/my/history").then((res) => {
            setMyWalletHistory(res.data.depositHistories);
        });
        
        axiosUtils.get("/wallet/club/" + query.get("clubId") + "/history")
        .then((res) => {
            setClubWalletHistory(res.data.depositHistories);
        });
    }, []);

    const onChange = (e) => { setMoney(e.target.value);}

    const HandleApply = () => {
        //공백 검사
        var emptyCheck = isEmpty(money);
        console.log(emptyCheck);
        if(!emptyCheck == ''){
            alert(emptyCheck);
            return;
        }

        //금액제한
        var moneyCheck = moneyLimit(money);
        if(!moneyCheck == ''){
            alert(moneyCheck);
            return;
        }

        let tmp;
        if (showModal.type===1) { tmp = 'deposit'; } else if (showModal.type===2) { tmp = 'exchange'; }
        axiosUtils.post("/wallet/my/" + tmp, { money: money })
        .then(() => {
            setShowModal({...showModal, show: !showModal.show});
            setMoney('');
            window.location.href="/userinfo";
        })
        .catch((err) => alert(err.data))
    }

    const handleClose = () => {setShowModal({...showModal, show: !showModal.show})}

    if (showModal.type === 1) {
        return (
            <Dialog
                open={showModal.show}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                style={{textAlign:"center"}}
            >
                <DialogWrapper>
                    <div>
                        <img src={card} alt="card" />
                    </div>
                        <InputBox placeholder="충전할 금액을 입력해주세요(숫자)" type="number" maxLength="10" min="100" name="money" value={money} onChange={onChange} />
                    <CreateButton variant="outlined" onClick={HandleApply} >충전하기</CreateButton>
                </DialogWrapper>
            </Dialog>
        )
    } else if (showModal.type === 2) {
        return (
            <Dialog
                open={showModal.show}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                style={{textAlign:"center"}}
            >
                <DialogWrapper>
                    <div>
                        <img src={card} alt="card" />
                    </div>
                        <InputBox placeholder="환전할 금액을 입력해주세요(숫자)" type="number" maxLength="10" min="100" name="money" value={money} onChange={onChange} />
                    <CreateButton variant="outlined" onClick={HandleApply} >환전하기</CreateButton>
                </DialogWrapper>
            </Dialog>
        )
    } else if (showModal.type === 3 || showModal.type === 4) {
        return (
            <Dialog
                open={showModal.show}
                onClose={handleClose}
                TransitionComponent={Transition}
                style={{textAlign:"center"}}
            >
                <Toolbar style={{marginTop:"0.7rem"}}>
                    <IconButton
                        edge="start"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <ArrowBackIosNewIcon/>
                    </IconButton>
                    <DialogTitle variant="h6">내역 조회</DialogTitle>
                </Toolbar>
                <DialogWrapper>
                    {showModal.type === 3 ? <WalletHistory data={myWalletHistory} /> : <WalletHistory data={clubWalletHistory} />}
                </DialogWrapper>
            </Dialog>
        )
    }
}
