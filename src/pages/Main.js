import { MainTitleWrapper, MainTitle, MainLogo, MainAddClub, MyClubList, SectionTitle, LatestClub } from "./styled/Main.styled";
import logo from "../static/img/logo.png"
import Button from '@mui/material/Button';
import ClubCard from "../components/common/ClubCard";
import ListBasic from "../components/common/ListBasic";

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
                <Button variant='outlined'style={{width: '100%', height:'50px'}} >내 모임 만들기</Button>
            </MainAddClub>
            <MyClubList>
                <SectionTitle>
                    내가 가입한 모임
                </SectionTitle>
                <div style={{display:"flex"}}>
                    <ClubCard/>
                    <ClubCard/>
                </div>
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