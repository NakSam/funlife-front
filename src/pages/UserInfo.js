import {UserInfoTitle, UserInfoWrapper,
    UserInfoDiv1, UserIcon, UserNameTag, UserModifyBtn,
     UserInfoDiv2, TextTag, UserPointTag,
      UserInfoDiv3, UserClubTitle, UserClubWrapper} from "./styled/UserInfo.styled";
import UserClubList from "../components/user/UserClubList";
import axiosUtils from "../utils/axiosUtils";
import React from "react";
import { useState } from "react";
import UserWalletModal from "../components/user/UserWalletModal";

export default function UserInfo() {
    
    // const { loginInfo } = axiosUtils.post("/user/session/login", {
    //     email: "test@test.com",
    //     password: "1q2w3e4r"
    // });
    // console.log(document.cookie);
    const [userInfo, setUserInfo] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/user/detail").then((response) => {
            setUserInfo(response.data);
        });
    }, []);

    const [userWalletInfo, setUserWalletInfo] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/wallet/my").then((response) => {
            setUserWalletInfo(response.data);
        });
    }, []);

    const [ showModal, setShowModal] = useState(false);

    const [myClubList, setMyClubList] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/club/myClub").then((response) => {
            setMyClubList(response.data);
        });
    }, []);

    return (
        <div>
            <UserInfoTitle>마이페이지</UserInfoTitle>
            <UserInfoWrapper>
                <UserInfoDiv1>
                    <UserIcon/>
                    <UserNameTag>{userInfo.name}</UserNameTag>
                    <UserModifyBtn>회원정보수정</UserModifyBtn>
                </UserInfoDiv1>
                <UserInfoDiv2>
                    <TextTag>잔여 포인트</TextTag>
                    <UserPointTag>{userWalletInfo.amount} P</UserPointTag>
                </UserInfoDiv2>
                <UserInfoDiv3>
                    <UserWalletModal />
                </UserInfoDiv3>
            </UserInfoWrapper>
            <UserClubTitle>내가 가입한 모임</UserClubTitle>
            <UserClubWrapper>
                <UserClubList data={myClubList}/>
            </UserClubWrapper>
        </div>
    );
}