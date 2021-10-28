import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axiosUtils from "../utils/axiosUtils";
import { loginStatus } from "../states/state";
import Login from "../components/user/SignIn";
import UserInfoBox from "../components/user/UserInfoBox";
import CardSlider from "../components/common/cardSlider/CardSlider";
import { UserInfoTitle, MyClubList, SectionTitle, Button } from "./styled/UserInfo.styled";
import {useCookies} from 'react-cookie';

export default function UserInfo() {
    const userStatus = useRecoilValue(loginStatus);
    const [ open, setOpen ] = useState({signIn:false, signUp:false});
    const [ userInfo, setUserInfo ] = useState();
    const [ userWalletInfo, setUserWalletInfo ] = useState();
    const [ myClubList, setMyClubList ] = useState();
    const [cookies] = useCookies();

    useEffect(() => {
        axiosUtils.get("/user/detail",{headers:{Authorization:cookies['naksam']}}).then((res) => setUserInfo(res.data));
        axiosUtils.get("/wallet/my", {headers:{Authorization:cookies['naksam']}}).then((res) => {setUserWalletInfo(res.data);});
        axiosUtils.get("/club/myClub", {headers:{Authorization:cookies['naksam']}}).then((res) => setMyClubList(res.data));
        if (!userStatus) setOpen({...open, signIn:true})
    }, []);

    return (
        <div>
            <UserInfoTitle>마이페이지</UserInfoTitle>
            {!userStatus 
            ? <>
                <Button onClick={() => setOpen({...open, signIn:true})}>로그인</Button> 
                <Login open={open} setOpen={setOpen} />
            </> 
            : <>
                <UserInfoBox userInfo={userInfo} userWalletInfo={userWalletInfo} setUserWalletInfo={setUserWalletInfo}/>
                <MyClubList>
                    <SectionTitle>내가 가입한 모임</SectionTitle>
                    {myClubList ? <CardSlider data={myClubList} /> : <small style={{fontSize:"0.8rem", display:"block",padding:"0.5rem 2rem 3rem 2rem"}}>아직 가입한 모임이 없습니다.<br />원하는 모임에 가입해보세요 :)</small> }
                </MyClubList>
            </> }
        </div> 
    );
}

// console.log(document.cookie);
// const [userInfo, setUserInfo] = React.useState("");
// React.useEffect(() => {
//     axiosUtils.get("/user/detail").then((response) => {
//         setUserInfo(response.data);
//     });
// }, []);

// const [userWalletInfo, setUserWalletInfo] = React.useState("");
// React.useEffect(() => {
//     axiosUtils.get("/wallet/my").then((response) => {
//         setUserWalletInfo(response.data);
//     });
// }, []);

// const [ showModal, setShowModal] = useState(false);

// const [myClubList, setMyClubList] = React.useState("");
// React.useEffect(() => {
//     axiosUtils.get("/club/myClub").then((response) => {
//         setMyClubList(response.data);
//     });
// }, []);

// return (
//     <div>
//         <UserInfoTitle>마이페이지</UserInfoTitle>
//         <UserInfoWrapper>
//             <UserInfoDiv1>
//                 <UserIcon/>
//                 <UserNameTag>{userInfo.name}</UserNameTag>
//                 <UserModifyBtn>회원정보수정</UserModifyBtn>
//             </UserInfoDiv1>
//             <UserInfoDiv2>
//                 <TextTag>잔여 포인트</TextTag>
//                 <UserPointTag>{userWalletInfo.amount} P</UserPointTag>
//             </UserInfoDiv2>
//             <UserInfoDiv3>
//                 <UserWalletModal />
//             </UserInfoDiv3>
//         </UserInfoWrapper>
//         <UserClubTitle>내가 가입한 모임</UserClubTitle>
//         <UserClubWrapper>
//             <UserClubList data={myClubList}/>
//         </UserClubWrapper>
//     </div>
// );
// }