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
import CreateClub from "../components/common/CreateClub";
import cookie from "react-cookies";
import { useEffect } from "react";
import { loginStatus } from "../states/state";
import { useRecoilState } from "recoil";
import Signup from "../components/user/Signup"

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

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
        
    // 내가 가입한 모임
    const [myClubList, setMyClubList] = useState("");
    // 내 모임 만들기
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleCreate = () => {
        setModalIsOpen(false);
    }

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
            <MainTitleWrapper>
                <MainLogo>
                    <img width="100%" height="100%" alt="" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
            <MainAddClub>
                {!userStatus 
                ? <Button onClick={login}>로그인</Button> 
                : <Button onClick={()=> setModalIsOpen(true)}>내 모임 만들기</Button>}
                
                <Button onClick={handleClickOpen}>회원가입</Button>   
                <Signup open={open} setOpen={setOpen} />   
            
            </MainAddClub>
            <CreateClub open={modalIsOpen} handleClose={handleCreate}/>
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
