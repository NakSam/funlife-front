import React, { useState, useEffect } from "react";
import axiosUtils from "../../utils/axiosUtils";
import WalletHistory from "../common/WalletHistory"
import { Slide, Dialog, Toolbar, IconButton } from "@mui/material";
import { DialogTitle, DialogWrapper, InputBox, InputBox2, CreateButton, CancleButton } from "./styled/UserWalletModal.styled";
import card from '../../static/img/kbcard.png'
import distribute from '../../static/img/distribute.png'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from "react-router";
import { isEmpty, moneyLimit } from '../../utils/ValidationCheck'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserWalletModal({ showModal, setShowModal, club }){
    let query = new URLSearchParams(useLocation().search);

    const [myWalletHistory, setMyWalletHistory] = useState("");
    const [clubWalletHistory, setClubWalletHistory] = useState("");
    const [money, setMoney] = useState();
    const [storeName, setStoreName] = useState('');
    
    useEffect(() => {
        if (showModal.type < 4) {
            axiosUtils.get("/wallet/my/history")
                .then((res) => {
                    setMyWalletHistory(res.data.depositHistories);
                });
        } else {
            axiosUtils.get("/wallet/club/" + query.get("clubId") + "/history")
                .then((res) => {
                    setClubWalletHistory(res.data.depositHistories);
                });
        }
    }, [club]);

    const onChange = (e) => { setMoney(e.target.value);}
    
    const onChangeStore = (e) => { setStoreName(e.target.value);}

    const HandleApply = () => {
        var emptyCheck = isEmpty(money);
        if (!emptyCheck === '' && showModal.type !== 5) {
            alert(emptyCheck);
            return;
        }

        var moneyCheck = moneyLimit(money);
        if (!moneyCheck === '' && showModal.type !== 5) {
            alert(moneyCheck);
            return;
        }

        if (showModal.type === 1) {
            axiosUtils.post("/wallet/my/deposit", { money: money })
                .then(() => {
                    alert("충전이 완료되었습니다.");
                    setShowModal({ ...showModal, show: !showModal.show });
                    setMoney('');
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 2) {
            axiosUtils.post("/wallet/my/exchange", { money: money })
                .then(() => {
                    alert("환전이 완료되었습니다.");
                    setShowModal({ ...showModal, show: !showModal.show });
                    setMoney('');
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 5) {
            axiosUtils.post('/wallet/club/' + club.id + '/deposit')
                .then(() => {
                    alert("송금이 완료되었습니다.");
                    setShowModal({ ...showModal, show: !showModal.show });
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 6) {
            axiosUtils.post('/wallet/club/' + club.id + '/payment', { storeName:storeName, money: money })
                .then(() => {
                    alert("결제가 완료되었습니다.");
                    setShowModal({ ...showModal, show: !showModal.show });
                    setStoreName('');
                    setMoney('');
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 7) {
            axiosUtils.post('/wallet/club/' + club.id + '/distribute')
                .then(() => {
                    alert("정산이 완료되었습니다.");
                    setShowModal({ ...showModal, show: !showModal.show });
                })
                .catch((err) => alert(err.data));
        }
    }

    const handleClose = () => {setShowModal({...showModal, show: !showModal.show})}

    if (showModal.type !== 3 && showModal.type !== 4) {
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
                style={{ textAlign: "center" }}
            >
                <DialogWrapper>
                    {showModal.type === 7 ?
                    <div style={{width:"70%", margin:"auto"}}>
                        <img src={distribute} alt="dis" />
                    </div> : <div>
                        <img src={card} alt="card" />
                    </div>
                    }
                    
                    {showModal.type === 1 && <>
                        <InputBox placeholder="충전할 금액을 숫자로 입력하세요" type="number" maxLength="10" name="money" value={money} onChange={onChange} />
                        <CreateButton onClick={HandleApply}>충전하기</CreateButton>
                    </>}
                    {showModal.type === 2 && <>
                        <InputBox placeholder="환전할 금액을 숫자로 입력하세요" type="number" maxLength="10" name="money" value={money} onChange={onChange} />
                        <CreateButton onClick={HandleApply}>환전하기</CreateButton>
                    </>}
                    {showModal.type === 5 && <>
                        <InputBox2 readOnly placeholder="3000원을 송금합니다." name="money" />
                        <CreateButton onClick={HandleApply}>송금하기</CreateButton>
                    </>}
                    {showModal.type === 6 && <>
                        <InputBox placeholder="상호명을 입력하세요" maxLength="12" name="storeName" value={storeName} onChange={onChangeStore} />
                        <InputBox placeholder="결제할 금액을 숫자로 입력하세요" type="number" maxLength="10" name="money" value={money} onChange={onChange} />
                        <CreateButton onClick={HandleApply}>결제하기</CreateButton>
                    </>}
                    {showModal.type === 7 && <>
                        <InputBox2 readOnly placeholder="정산하시겠습니까?" name="money" />
                        <CreateButton onClick={HandleApply}>정산하기</CreateButton>
                    </>}
                    <CancleButton onClick={handleClose}>취소</CancleButton>
                </DialogWrapper>
            </Dialog>
        )
    } else {
        return (
            <Dialog
                open={showModal.show}
                onClose={handleClose}
                TransitionComponent={Transition}
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
                    <DialogTitle variant="h6">내역 조회</DialogTitle>
                </Toolbar>
                <DialogWrapper>
                    {showModal.type === 3 ? <WalletHistory data={myWalletHistory} /> : <WalletHistory data={clubWalletHistory} />}
                </DialogWrapper>
            </Dialog>
        )
    }
}