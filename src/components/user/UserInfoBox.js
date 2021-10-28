import { ProfileWrapper, UserInfoWrapper, 
    UserWalletInfoWrapper, UserButtonWrapper, 
    UserImgWrapper, UserImg, UserInfos, UserButton1,
    UserName, UserButton, LeftWalletInfo, RightWalletInfo } from "./styled/UserInfoBox.styled";
import user from "../../static/img/user1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserWalletModal from "./UserWalletModal";
import { useState } from "react";

export default function UserInfoBox({ userInfo, userWalletInfo, setUserWalletInfo }){
    const [ showModal, setShowModal ] = useState({show: false, type:0});

    return (
        <>
        {userInfo && userWalletInfo &&
        <ProfileWrapper>
            <UserInfoWrapper>
                <UserImgWrapper>
                    <UserImg src={user} alt="" />
                </UserImgWrapper>
                <UserInfos>
                    <UserName>{userInfo.name}<small> 님</small> <FontAwesomeIcon icon="fa-solid fa-gear" color="#a1a1a1" /></UserName>
                    <UserButtonWrapper>
                        <UserButton onClick={() => setShowModal({show: !showModal.show, type:1})}>충전</UserButton>
                        <UserButton onClick={() => setShowModal({show: !showModal.show, type:2})}>환전</UserButton>
                    </UserButtonWrapper>
                    {showModal.show && <UserWalletModal showModal={showModal} setShowModal={setShowModal} userWalletInfo={userWalletInfo} setUserWalletInfo={setUserWalletInfo}/>}
                </UserInfos>
            </UserInfoWrapper>
            <UserWalletInfoWrapper>
                <LeftWalletInfo>포인트</LeftWalletInfo>
                <RightWalletInfo>
                    {userWalletInfo.amount.toLocaleString()} P
                    <UserButton1 onClick={() => setShowModal({show: !showModal.show, type:3})}>내역</UserButton1>
                </RightWalletInfo>
            </UserWalletInfoWrapper>
        </ProfileWrapper>
        }
        </>
    );
}