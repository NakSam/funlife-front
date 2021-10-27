import { ProfileWrapper, UserInfoWrapper, 
    UserWalletInfoWrapper, UserButtonWrapper, 
    UserImgWrapper, UserImg, UserInfos, 
    UserName, UserButton, LeftWalletInfo, RightWalletInfo } from "./styled/UserInfoBox.styled";
import user from "../../static/img/user1.png"

export default function UserInfoBox({ userInfo, userWalletInfo }){
    console.log(userInfo)
    console.log(userWalletInfo)
    return (
        <>
        {userInfo && userWalletInfo &&
        <ProfileWrapper>
            <UserInfoWrapper>
                <UserImgWrapper>
                    <UserImg src={user} alt="" />
                </UserImgWrapper>
                <UserInfos>
                    <UserName>{userInfo.name}<small> 님 ⚙</small></UserName>
                    <UserButtonWrapper>
                        <UserButton>충전</UserButton>
                        <UserButton>환전</UserButton>
                        <UserButton>내역</UserButton>
                    </UserButtonWrapper>
                </UserInfos>
            </UserInfoWrapper>
            <UserWalletInfoWrapper>
                <LeftWalletInfo>잔여 포인트</LeftWalletInfo>
                <RightWalletInfo>{userWalletInfo.amount.toLocaleString()} P</RightWalletInfo>
            </UserWalletInfoWrapper>
        </ProfileWrapper>
        }
        </>
    );
}