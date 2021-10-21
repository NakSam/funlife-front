import {UserInfoTitle, UserInfoWrapper,
    UserInfoDiv1, UserIcon, UserNameTag, UserModifyBtn,
     UserInfoDiv2, TextTag, UserPointTag,
      UserInfoDiv3, ChargeBtn, BarTag, ExchangeBtn,
      UserClubTitle, UserClubWrapper} from "./styled/UserInfo.styled";
import UserClubList from "../components/userInfo/UserClubList";
import axiosUtils from "../utils/axiosUtils";
import React from "react";
// import userInfoList from "../hooks/userInfoList";

const newClubSample = [
    {
        id: 1,
        "clubTitle": "역삼 스터디",
        "location": "강남구",
        "currentPerson": 2,
        "maxPerson": 8,
        "tag": "스터디",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/books_1920.jpg"
    },
    {
        id: 2,
        "clubTitle": "잠실 맛집 탐방",
        "location": "송파구",
        "currentPerson": 3,
        "maxPerson": 4,
        "tag": "음식",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/platter_1920.jpg"
    },
    {
        id: 3,
        "clubTitle": "노원 트레이너 모임",
        "location": "노원구",
        "currentPerson": 7,
        "maxPerson": 10,
        "tag": "운동",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/gym_1920.jpg"
    },
    {
        id: 4,
        "clubTitle": "서초 테니스",
        "location": "서초구",
        "currentPerson": 1,
        "maxPerson": 4,
        "tag": "운동",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/tennis_1920.jpg"
    },
    {
        id: 5,
        "clubTitle": "중구 DSLR 모임",
        "location": "중구",
        "currentPerson": 2,
        "maxPerson": 6,
        "tag": "사진",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/camera_1920.jpg"
    },
]

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
    // const sampleList = newClubSample.map((data,index)=><UserClubList data={data} key={index}/>);

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