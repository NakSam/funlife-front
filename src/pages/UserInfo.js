import {UserInfoTitle, UserInfoWrapper,
    UserInfoDiv1, UserIcon, UserNameTag, UserModifyBtn,
     UserInfoDiv2, TextTag, UserPointTag,
      UserInfoDiv3, ChargeBtn, BarTag, ExchangeBtn,
      UserClubTitle, UserClubWrapper} from "./styled/UserInfo.styled";
import UserClubList from "../components/userInfo/UserClubList";
import axiosUtils from "../utils/axiosUtils";
import React from "react";

export default function UserInfo() {
    
    // const { loginInfo } = axiosUtils.post("/user/session/login", {
    //     email: "test@test.com",
    //     password: "1q2w3e4r"
    // });
    // console.log(document.cookie);
    const [userInfo, setUserInfo] = React.useState(0);
    React.useEffect(() => {
        axiosUtils.get("/user/detail").then((response) => {
            setUserInfo(response.data);
        });
    }, []);
    
    const [myClubList, setMyClubList] = React.useState(0);
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
                    <UserPointTag>456,000 P</UserPointTag>
                </UserInfoDiv2>
                <UserInfoDiv3>
                    <ChargeBtn>충전</ChargeBtn>
                    <BarTag></BarTag>
                    <ExchangeBtn>환전</ExchangeBtn>
                </UserInfoDiv3>
            </UserInfoWrapper>
            <UserClubTitle>내가 가입한 모임</UserClubTitle>
            <UserClubWrapper>
                <UserClubList data={myClubList}/>
            </UserClubWrapper>
        </div>
    );
}