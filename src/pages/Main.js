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
import cookie from "react-cookies";

export default function Main(){
    
    const login = () => {
        axios.post("http://naksam.169.56.174.130.nip.io/user/session/login", {
            email: "qwe@google.com",
            password: "1q2w3e4r"
        }).then(() => {
            console.log(cookie.load("naksam"));
        })
    }

        
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
            <MainTitleWrapper>
                <MainLogo>
                    <img width="100%" height="100%" alt="" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
            <button onClick={login}>로그인</button>
            <MainAddClub>
                <Button variant='outlined'style={{width: '100%', height:'50px'}} onClick={()=> setModalIsOpen(true)}>내 모임 만들기</Button>
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
