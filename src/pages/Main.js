import { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import SignIn from "../components/user/SignIn";
import ListBasic from "../components/common/ListBasic";
import CreateClub from "../components/common/CreateClub";
import CardSlider from "../components/common/cardSlider/CardSlider";
import logo from "../static/img/logo.png";
import axiosUtils from "../utils/axiosUtils";
import { loginStatus } from "../states/state";
import { MainTitleWrapper, MainLogo, Button, MainAddClub, MyClubList, SectionTitle, SectionTitle1, LatestClub } from "./styled/Main.styled";

export default function Main(){
<<<<<<< HEAD
    const [ userStatus, setUserStatus ] = useRecoilState(loginStatus);
    const login = () => {
        axios.post("http://naksam.169.56.174.130.nip.io/user/session/login", {
            email: "qwe@google.com",
            password: "1q2w3e4r"
        }).then(() => {
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
              
          })
          .catch((error) => {
            
          })
    };
=======
    const userStatus = useRecoilValue(loginStatus);
    // const [ loginModal, setLoginModal ] = useState({modal:false, login:cookie.load("naksam")});
    const [ myClubList, setMyClubList ] = useState();
    const [ newClubList, setNewClubList ] = useState();
    const [ createClubOpen, setCreateClubOpen ] = useState(false);
    const [ open, setOpen ] = useState({signIn:false, signUp:false});
    
    const handleCreate = () => setCreateClubOpen(false);
>>>>>>> bc45d9b1ac1276e2b23b652b28abe6442a4e8f6c

    useEffect(() => {
        axiosUtils.get("/club/myClub").then((res) => setMyClubList(res.data));
        axiosUtils.get("/club/home").then((res) => setNewClubList(res.data));
    }, []);

    return(
        <div>
            <MainTitleWrapper>
                <MainLogo>
                    <img width="80rem" height="80rem" alt="logo" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
            <MainAddClub>
                {!userStatus
                ? <Button onClick={() => setOpen({...open, signIn:true})}>로그인</Button> 
                : <Button onClick={()=> setCreateClubOpen(true)}>내 모임 만들기</Button>}
                <SignIn open={open} setOpen={setOpen} />
            </MainAddClub>
            <CreateClub open={createClubOpen} handleClose={handleCreate}/>
            {userStatus && <MyClubList>
                <SectionTitle1>내가 가입한 모임 👩‍👦‍👦</SectionTitle1>
                {myClubList ? <CardSlider data={myClubList} /> : <small style={{fontSize:"0.8rem", display:"block",padding:"0.5rem 2rem 3rem 2rem"}}>아직 가입한 모임이 없습니다.<br />원하는 모임에 가입해보세요 :)</small> }
            </MyClubList>}
            <LatestClub>
                <SectionTitle>최근 개설된 모임</SectionTitle>
                <ListBasic data={newClubList}/>
            </LatestClub>
        </div>        
    );
}
