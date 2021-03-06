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
import {useCookies} from 'react-cookie';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserWalletModal({ showModal, setShowModal, club, userWalletInfo, setUserWalletInfo, clubWallet, setClubWallet}){
    let query = new URLSearchParams(useLocation().search);
    const [myWalletHistory, setMyWalletHistory] = useState("");
    const [clubWalletHistory, setClubWalletHistory] = useState("");
    const [money, setMoney] = useState();
    const [storeName, setStoreName] = useState('');
    const [cookies] = useCookies();
    
    
    useEffect(() => {
        if (showModal.type < 4) {
            axiosUtils.get("/wallet/my/history",{headers:{Authorization:cookies['naksam']}})
                .then((res) => {
                    setMyWalletHistory(res.data.depositHistories);
                });
        } else {
            axiosUtils.get("/wallet/club/" + query.get("clubId") + "/history",{headers:{Authorization:cookies['naksam']}})
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
            axiosUtils.post("/wallet/my/deposit", { money: money },{headers:{Authorization:cookies['naksam']}})
                .then(() => {
                    alert("????????? ?????????????????????.");
                    setShowModal({ ...showModal, show: !showModal.show });
                    const afterDe = Number(userWalletInfo.amount)+Number(money);
                    setUserWalletInfo({...userWalletInfo, amount:afterDe});
                    setMoney('');
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 2) {
            axiosUtils.post("/wallet/my/exchange", { money: money },{headers:{Authorization:cookies['naksam']}})
                .then(() => {
                    alert("????????? ?????????????????????.");
                    const afterEx = Number(userWalletInfo.amount)-Number(money);
                    setUserWalletInfo({...userWalletInfo, amount:afterEx});
                    setShowModal({ ...showModal, show: !showModal.show });
                    setMoney('');
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 5) {            
            axiosUtils.post('/wallet/club/' + club.id + '/deposit',{},{headers:{Authorization:cookies['naksam']}})
                .then(() => {
                    alert("????????? ?????????????????????.");
                    const afterClubDe = Number(clubWallet) + Number(club.dues);
                    setClubWallet(afterClubDe);
                    setShowModal({ ...showModal, show: !showModal.show });
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 6) {
            axiosUtils.post('/wallet/club/' + club.id + '/payment', { storeName:storeName, money: money },{headers:{Authorization:cookies['naksam']}})
                .then(() => {
                    alert("????????? ?????????????????????.");
                    setShowModal({ ...showModal, show: !showModal.show });
                    const afterClubPay = Number(clubWallet) - Number(money);
                    setClubWallet(afterClubPay);
                    setStoreName('');
                    setMoney('');
                })
            .catch((err) => alert(err.data));
        } else if (showModal.type === 7) {
            axiosUtils.post('/wallet/club/' + club.id + '/distribute',{},{headers:{Authorization:cookies['naksam']}})
                .then(() => {
                    alert("????????? ?????????????????????.");
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
                        <InputBox placeholder="????????? ????????? ????????? ???????????????" type="number" maxLength="10" name="money" value={money} onChange={onChange} />
                        <CreateButton onClick={HandleApply}>????????????</CreateButton>
                    </>}
                    {showModal.type === 2 && <>
                        <InputBox placeholder="????????? ????????? ????????? ???????????????" type="number" maxLength="10" name="money" value={money} onChange={onChange} />
                        <CreateButton onClick={HandleApply}>????????????</CreateButton>
                    </>}
                    {showModal.type === 5 && <>
                        <InputBox2 readOnly placeholder={club.dues + "?????? ???????????????."} name="money" />
                        <CreateButton onClick={HandleApply}>????????????</CreateButton>
                    </>}
                    {showModal.type === 6 && <>
                        <InputBox placeholder="???????????? ???????????????" maxLength="12" name="storeName" value={storeName} onChange={onChangeStore} />
                        <InputBox placeholder="????????? ????????? ????????? ???????????????" type="number" maxLength="10" name="money" value={money} onChange={onChange} />
                        <CreateButton onClick={HandleApply}>????????????</CreateButton>
                    </>}
                    {showModal.type === 7 && <>
                        <InputBox2 readOnly placeholder="?????????????????????????" name="money" />
                        <CreateButton onClick={HandleApply}>????????????</CreateButton>
                    </>}
                    <CancleButton onClick={handleClose}>??????</CancleButton>
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
                    <DialogTitle variant="h6">?????? ??????</DialogTitle>
                </Toolbar>
                <DialogWrapper>
                    {showModal.type === 3 ? <WalletHistory data={myWalletHistory} /> : <WalletHistory data={clubWalletHistory} />}
                </DialogWrapper>
            </Dialog>
        )
    }
}