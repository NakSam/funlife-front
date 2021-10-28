import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Row, Col} from "react-bootstrap";
import axiosUtils from "../utils/axiosUtils";
import { useLocation } from "react-router-dom";
import InviteModal from '../components/clubdetail/InviteModal';
import ClubInfoBox from '../components/clubdetail/ClubInfoBox';
import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TitleWrapper, DetailTitle, InviteButton } from "./styled/ClubDetail.styled";

export default function ClubDetail(){
    let query = new URLSearchParams(useLocation().search);
    const [inviteModal, setInviteModal] = useState(false);
    const [clubWallet, setClubWallet] = useState();
    const [club, setClub] = useState();
    const [tab, setTab] = useState(1);

    useEffect(() => {
        axiosUtils.get('/wallet/club/' + query.get("clubId") + '/history')
        .then((res) => { setClubWallet(res.data.amount) });
        axiosUtils.get('/club/search/' + query.get("clubId"))
        .then((res) => { setClub(res.data) });
    }, [club])

    return(
        <>
        {club && <div>
            <TitleWrapper>
                <DetailTitle>{club.name}</DetailTitle>
                <InviteButton onClick={() => setInviteModal({show:!inviteModal})}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</InviteButton>
            </TitleWrapper>
            <ClubInfoBox club={club} clubWallet={clubWallet} />

            <div style={{ marginBottom:"3rem", borderRadius:"0.7rem", fontFamily:"S-CoreDream-4Regular", border:"2px solid #ededed"}}>
                <div style={{ display:"flex", backgroundColor:"#ededed", cursor:"pointer"}}>
                    <div className={tab===1?'tab-color':'tab'} style={{ padding:"0.7rem", width:"50%", fontFamily:"S-CoreDream-6Bold", textAlign:"center" }} tab={tab} onClick={() => setTab(1)}>정보</div>
                    <div className={tab!==1?'tab-color':'tab'} style={{ padding:"0.7rem", width:"50%", fontFamily:"S-CoreDream-6Bold", textAlign:"center" }} tab={tab} onClick={() => setTab(2)}>일정</div>
                </div>
                <div>
                {tab === 1 
                ? <div style={{fontFamily:"S-CoreDream-4Regular", padding:"0.5rem"}}>
                    <div id="Information" className="tabcontent">
                        <div className="clubIntroDetail">
                            <h2 className="clubIntroTitle">모임장</h2>
                            <p>{club.clubMaster}</p>
                            <Row><Col>
                            <h2 className="clubIntroTitle">분류</h2>
                            <p>{club.category}</p>
                            </Col><Col>
                            <h2 className="clubIntroTitle">위치</h2>
                            <p>{club.location}</p>
                            </Col></Row>
                            <Row><Col>
                            <h2 className="clubIntroTitle">인원</h2>
                            <p>{club.memberNum} 인</p>
                            </Col><Col>
                            <h2 className="clubIntroTitle">회비</h2>
                            <p>{parseInt(club.dues).toLocaleString()} 원</p>
                            </Col></Row>
                            <h2 className="clubIntroTitle">설명</h2>
                            <p>{club.description}</p>
                            <img alt="club" src={club.image} />
                        </div>
                    </div>
                </div> 
                : <div style={{fontFamily:"S-CoreDream-4Regular", padding:"0.5rem"}}>
                    <div id="Schedule" className="calendar">
                     <Calendar
                     />
                     </div>
                </div>}
                </div>
            </div>
            <InviteModal inviteModal={inviteModal} setInviteModal={setInviteModal} />
        </div>}
        </>  
    );
}