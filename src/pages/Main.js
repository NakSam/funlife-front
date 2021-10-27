import { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import axiosUtils from "../utils/axiosUtils";
import { loginStatus } from "../states/state";
import SignIn from "../components/user/SignIn";
import ListBasic from "../components/common/ClubList";
import CreateClub from "../components/common/ClubCreateModal";
import CardSlider from "../components/common/cardSlider/CardSlider";
import logo from "../static/img/logo.png";
import { MainTitleWrapper, MainLogo, Button, MainAddClub, MyClubList, SectionTitle, SectionTitle1, LatestClub } from "./styled/Main.styled";

export default function Main() {
    const userStatus = useRecoilValue(loginStatus);
    const [myClubList, setMyClubList] = useState();
    const [newClubList, setNewClubList] = useState();
    const [createClubOpen, setCreateClubOpen] = useState(false);
    const [open, setOpen] = useState({ signIn: false, signUp: false });

    useEffect(() => {
        axiosUtils.get("/club/myClub").then((res) => setMyClubList(res.data));
        axiosUtils.get("/club/home").then((res) => setNewClubList(res.data));
    }, []);

    return (
        <div>
            <MainTitleWrapper>
                <MainLogo>
                    <img width="180px" height="70px" alt="logo" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
            <MainAddClub>
                {!userStatus
                    ? <Button onClick={() => setOpen({ ...open, signIn: true })}>로그인</Button>
                    : <Button onClick={() => setCreateClubOpen(true)}>내 모임 만들기</Button>}
                <SignIn open={open} setOpen={setOpen} />
            </MainAddClub>
            <CreateClub open={createClubOpen} handleClose={() => setCreateClubOpen(false)} />
            {userStatus && <MyClubList>
                <div style={{ maxWidth: "720px", margin: "auto" }}>
                    <SectionTitle1>내가 가입한 모임</SectionTitle1>
                </div>
                {myClubList ?
                    <CardSlider data={myClubList} />
                    : <small style={{ fontSize: "0.8rem", display: "block", padding: "0.5rem 2rem 3rem 2rem" }}>아직 가입한 모임이 없습니다.<br />원하는 모임에 가입해보세요 :)</small>}
            </MyClubList>}
            <LatestClub>
                <SectionTitle>최근 개설된 모임</SectionTitle>
                <ListBasic data={newClubList} />
            </LatestClub>
        </div>
    );
}
