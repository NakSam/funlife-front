import { MainTitleWrapper, MainTitle, MainLogo, MainAddClub, MyClubList, SectionTitle, LatestClub } from "./styled/Main.styled";
import logo from "../static/img/logo.png"
import Button from '@mui/material/Button';
import ClubCard from "../components/common/ClubCard";
import ListBasic from "../components/common/ListBasic";

export default function Main(){
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
                <ListBasic/>
            </LatestClub>
        </div>        
    );
}