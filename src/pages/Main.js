import { MainTitleWrapper, MainTitle, MainLogo, MainAddClub, MyClubList, SectionTitle, LatestClub } from "./styled/Main.styled";
import logo from "../static/img/logo.png"
import Button from '@mui/material/Button';
import ClubCard from "../components/common/ClubCard";
import ListBasic from "../components/common/ListBasic";
import React, { useState } from 'react';
import axiosUtils from "../utils/axiosUtils";
import axios from "axios";
import UserClubList from "../components/userInfo/UserClubList";
import { UserClubWrapper} from "./styled/UserInfo.styled";
import Modal from 'react-modal';
import { Route } from "react-router-dom";
import CreateClub from "../components/common/CreateClub";

export default function Main(){
        
    // 내가 가입한 모임
    const [myClubList, setMyClubList] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/club/myClub").then((response) => {
            setMyClubList(response.data);
        });
    }, []);
    // 내가 .가입한 모임

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
        console.log(Name);
        console.log(Category);
        console.log(Location);
        console.log(Description);
        
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
    // 내 모임 만들기

    const [newClubList, setNewClubList] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get("/club/home").then((response) => {
            setNewClubList(response.data);
        });
    }, []);//최근 개설된 모임

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
                <Button variant='outlined'style={{width: '100%', height:'50px'}} onClick={()=> setModalIsOpen(true)}>내 모임 만들기</Button>
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
