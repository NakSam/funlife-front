import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axiosUtils from "../utils/axiosUtils";
import { loginStatus } from "../states/state";
import Login from "../components/user/SignIn";
import UserInfoBox from "../components/user/UserInfoBox";
import CardSlider from "../components/common/cardSlider/CardSlider";
import { UserInfoTitle, MyClubList, SectionTitle, Button } from "./styled/UserInfo.styled";

export default function UserInfo() {
    const userStatus = useRecoilValue(loginStatus);
    const [open, setOpen] = useState({ signIn: false, signUp: false });
    const [userInfo, setUserInfo] = useState();
    const [myClubList, setMyClubList] = useState();
    const [userWalletInfo, setUserWalletInfo] = useState();

    useEffect(() => {
        axiosUtils.get("/wallet/my").then((res) => setUserWalletInfo(res.data));
        axiosUtils.get("/user/detail").then((res) => setUserInfo(res.data));
        axiosUtils.get("/club/myClub").then((res) => setMyClubList(res.data));
        if (!userStatus) setOpen({ ...open, signIn: true })
    }, [userInfo]);

    return (
        <div>
            <UserInfoTitle>마이페이지</UserInfoTitle>
            {!userStatus
                ? <>
                    <Button onClick={() => setOpen({ ...open, signIn: true })}>로그인</Button>
                    <Login open={open} setOpen={setOpen} />
                </>
                : <>
                    <UserInfoBox userInfo={userInfo} userWalletInfo={userWalletInfo} />
                    <MyClubList>
                        <SectionTitle>내가 가입한 모임</SectionTitle>
                        {myClubList ? <CardSlider data={myClubList} /> : <small style={{ fontSize: "0.8rem", display: "block", padding: "0.5rem 2rem 3rem 2rem" }}>아직 가입한 모임이 없습니다.<br />원하는 모임에 가입해보세요 :)</small>}
                    </MyClubList>
                </>}
        </div>
    );
}