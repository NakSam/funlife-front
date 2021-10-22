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

const newClubSample = [
    {
        "clubTitle": "역삼 스터디",
        "location": "강남구",
        "currentPerson": 2,
        "maxPerson": 8,
        "tag": "스터디",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/books_1920.jpg"
    },
    {
        "clubTitle": "잠실 맛집 탐방",
        "location": "송파구",
        "currentPerson": 3,
        "maxPerson": 4,
        "tag": "음식",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/platter_1920.jpg"
    },
    {
        "clubTitle": "노원 트레이너 모임",
        "location": "노원구",
        "currentPerson": 7,
        "maxPerson": 10,
        "tag": "운동",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/gym_1920.jpg"
    },
    {
        "clubTitle": "서초 테니스",
        "location": "서초구",
        "currentPerson": 1,
        "maxPerson": 4,
        "tag": "운동",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/tennis_1920.jpg"
    },
    {
        "clubTitle": "중구 DSLR 모임",
        "location": "중구",
        "currentPerson": 2,
        "maxPerson": 6,
        "tag": "사진",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/camera_1920.jpg"
    },
]

export default function Main(){
    const sampleList = newClubSample.map((data)=><ListBasic data={data}/>);
        
    // 내가 가입한 모임
    const [myClubList, setMyClubList] = React.useState(0);
    React.useEffect(() => {
        axiosUtils.get("/club/myClub").then((response) => {
            setMyClubList(response.data);
        });
    }, []);
    // 내가 가입한 모임

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

    return(
        <div>    
            <MainTitleWrapper>
                <MainTitle>
                    안녕하세요. <br /> NAKSAM입니다.
                </MainTitle>
                <MainLogo>
                    <img width="100" alt="" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
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
                {sampleList}
            </LatestClub>
        </div>        
    );
}