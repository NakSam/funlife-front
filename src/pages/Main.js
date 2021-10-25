import { MainTitleWrapper, MainTitle, MainLogo, Button, MainAddClub, MyClubList, SectionTitle, LatestClub } from "./styled/Main.styled";
import logo from "../static/img/logo.png"
import ClubCard from "../components/common/ClubCard";
import ListBasic from "../components/common/ListBasic";
import React, { useState } from 'react';
import axiosUtils from "../utils/axiosUtils";
import axios from "axios";
import UserClubList from "../components/userInfo/UserClubList";
import { UserClubWrapper} from "./styled/UserInfo.styled";
import Modal from 'react-modal';
import cookie from "react-cookies";
import { useEffect } from "react";
import { loginStatus } from "../states/state";
import { useRecoilState } from "recoil";

export default function Main(){
    const [ userStatus, setUserStatus ] = useRecoilState(loginStatus);
    const login = () => {
        axios.post("http://naksam.169.56.174.130.nip.io/user/session/login", {
            email: "qwe@google.com",
            password: "1q2w3e4r"
        }).then(() => {
            console.log(cookie.load("naksam"));
        })
    }

        
    // 내가 가입한 모임
    const [myClubList, setMyClubList] = useState("");
    // 내 모임 만들기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [Name, SetName] = useState("");
    const [Category, SetCategory] = useState("");
    const [Location, SetLocation] = useState("");
    const [Description, SetDescription] = useState("");

    const nameHandler = (e) => { e.preventDefault(); SetName(e.target.value); };
    const categoryHandler = (e) => { e.preventDefault(); SetCategory(e.target.value); };
    const locationHandler = (e) => { e.preventDefault(); SetLocation(e.target.value); };
    const descriptionHandler = (e) => { e.preventDefault(); SetDescription(e.target.value); };

    const submitHandler = (e) => {
        e.preventDefault();
        // state에 저장한 값을 가져옵니다.
        axios({
            method:"post",
            url:'http://naksam.169.56.174.130.nip.io:80/club/register',
            data:{
                category: Category,
                description: Description,
                image: "https://naksam.s3.ap-northeast-2.amazonaws.com/img/gym_1920.jpg",
                location: Location,
                maxMemberNum: 100,
                memberNum: 1,
                name: Name,
                ownerId: 1
              }
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            
          })
    };

    //최근 개설된 모임
    const [newClubList, setNewClubList] = useState("");
    useEffect(() => {
        axiosUtils.get("/club/myClub").then((res) => {
            setMyClubList(res.data);
        });
        axiosUtils.get("/club/home").then((res) => {
            setNewClubList(res.data);
        });
    }, []);

    return(
        <div>
            {/* 로그인 버튼 라우트 어떻게 쓰는거여*/}
            {/* <Router>
                <Route path="/login" component={Login}/>
            </Router> */}
            {/* 로그인 버튼 */}
            <MainTitleWrapper>
                <MainLogo>
                    <img width="100%" height="100%" alt="" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
            <MainAddClub>
                {!userStatus 
                ? <Button onClick={login}>로그인</Button> 
                : <Button onClick={()=> setModalIsOpen(true)}>내 모임 만들기</Button>}
            </MainAddClub>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                {/*onSubmit={submitHandler}*/} 
                <form onSubmit={submitHandler}>
                    <label>모임 이름</label><br />
                    <input type="text" value={Name} onChange={nameHandler}/><br />
                    <label>카테고리</label><br />
                    <input type="text" value={Category} onChange={categoryHandler}/><br />
                    <label>장소</label><br />
                    <input type="text" value={Location} onChange={locationHandler}/><br />
                    <label>설명</label><br />
                    <input type="text" value={Description} onChange={descriptionHandler}/><br />
                    <button type="submit">제출</button>
                </form>
                <button onClick={()=> setModalIsOpen(false)}>닫기</button>
            </Modal>
            <MyClubList>
                <SectionTitle>
                    내가 가입한 모임
                </SectionTitle>
                <UserClubWrapper>
                    <UserClubList data={myClubList}/>
                </UserClubWrapper>
            </MyClubList>
            <LatestClub>
                <SectionTitle>
                    최근 개설된 모임
                </SectionTitle>
                <ListBasic data={newClubList}/>
            </LatestClub>
        </div>        
    );
}
