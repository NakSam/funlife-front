import { useState, useEffect } from 'react';
import cookie from "react-cookies";
import { useRecoilValue } from "recoil";
import logo from "../static/img/logo.png";
import axiosUtils from "../utils/axiosUtils";
import { loginStatus } from "../states/state";
import Signup from "../components/user/Signup";
import Login from "../components/user/LoginModal";
import ListBasic from "../components/common/ListBasic";
import CreateClub from "../components/common/CreateClub";
import CardSlider from "../components/common/cardSlider/CardSlider";
import { MainTitleWrapper, MainLogo, Button, MainAddClub, MyClubList, SectionTitle, SectionTitle1, LatestClub } from "./styled/Main.styled";

export default function Main(){
    const userStatus = useRecoilValue(loginStatus);
    const [ loginModal, setLoginModal ] = useState({modal:false, login:cookie.load("naksam")});
    const [ myClubList, setMyClubList ] = useState();
    const [ newClubList, setNewClubList ] = useState();
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ open, setOpen ] = useState(false);
    
    const handleClickOpen = () => setOpen(true);
    const handleCreate = () => setModalIsOpen(false);

    useEffect(() => {
        axiosUtils.get("/club/myClub").then((res) => setMyClubList(res.data));
        axiosUtils.get("/club/home").then((res) => setNewClubList(res.data));
    }, []);

    return(
        <div>
            <MainTitleWrapper>
                <MainLogo>
                    <img width="100%" height="100%" alt="logo" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
            <MainAddClub>
                {!loginModal.login  
                ? <Button onClick={() => setLoginModal({...loginModal, modal:true})}>로그인</Button> 
                : <Button onClick={()=> setModalIsOpen(true)}>내 모임 만들기</Button>}
                
                <Button onClick={handleClickOpen}>회원가입</Button>   
                <Signup open={open} setOpen={setOpen} />   
            
            </MainAddClub>
            <CreateClub open={modalIsOpen} handleClose={handleCreate}/>
            {userStatus && <MyClubList>
                <SectionTitle1>내가 가입한 모임 👩‍👦‍👦</SectionTitle1>
                {myClubList ? <CardSlider data={myClubList} /> : <small style={{fontSize:"0.8rem", display:"block",padding:"0.5rem 2rem 3rem 2rem"}}>아직 가입한 모임이 없습니다.<br />원하는 모임에 가입해보세요 :)</small> }
            </MyClubList>}
            <LatestClub>
                <SectionTitle>최근 개설된 모임</SectionTitle>
                <ListBasic data={newClubList}/>
            </LatestClub>
            <Login loginModal={loginModal} setLoginModal={setLoginModal} />
        </div>        
    );
}
