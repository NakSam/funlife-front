import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosUtils from "../utils/axiosUtils";
import { useLocation } from "react-router-dom";
import InviteModal from '../components/clubdetail/InviteModal';
import ClubDepositModal from '../components/clubdetail/ClubDepositModal';
import ClubPayModal from '../components/clubdetail/ClubPayModal';
import DevideModal from '../components/clubdetail/DevideModal';
import HistoryModal from '../components/clubdetail/HistoryModal';

import { TitleWrapper, DetailTitle, InviteButton } from "./styled/ClubDetail.styled";
import ClubInfoBox from '../components/clubdetail/ClubInfoBox';

const useTabs = (initialTabs, allTabs) => {
    const [contentIndex, setContentIndex] = useState(initialTabs);
    return {
        contentItem: allTabs[contentIndex],
        contentChange: setContentIndex
    };
};

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

export default function ClubDetail({sendToMessage}){
    let query = new URLSearchParams(useLocation().search);

    const [inviteModal, setInviteModal] = useState(false);
    const [clubWallet, setClubWallet] = useState();
    const [club, setClub] = useState();

    useEffect(() => {
        axiosUtils.get('/wallet/club/' + query.get("clubId") + '/history')
        .then((res) => { setClubWallet(res.data.amount) });
        axiosUtils.get('/club/search/' + query.get("clubId"))
        .then((res) => { setClub(res.data) });
    }, [])
    console.log(club, clubWallet)
    // const [value, onChange] = useState(new Date());

    // const content = [
    // {
    //     tab:(
    //         <p className="tabName"><FontAwesomeIcon icon="fa-solid fa-circle-info" /> 정보</p>
    //     ),
    //     content:(
    //         <div id="Information" className="tabcontent">
    //             <div className="clubIntroDetail">
    //                 <h2 className="clubIntroTitle">모임 소개</h2>
    //                 <p>{club.description}</p>
    //                 <button className="category">{club.category}</button>
    //                 <button className="location"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {club.location}</button>
    //             </div>
    
    //             <div className="introStatistics">
    //                 <h2 className="introSubTitle">이 모임의 활동 정보</h2>
    //                 <img src={club.image} />
    //                 <ul>
    //                     <li>리더 {club.clubMaster}</li>
    //                     <li>멤버 {club.memberNum}</li>
    //                     <li>회비 {club.dues}원</li>
    //                 </ul>
    //             </div>
    //         </div>
    //     )
    // },
    // {
    //     tab: (
    //         <p className="tabName"><FontAwesomeIcon icon="fa-solid fa-calendar-days" /> 일정</p>
    //     ),
    //     content:(
    //         <div id="Schedule" className="tabcontent calendar">
    //         <Calendar
    //             onChange={onChange}
    //             value={value}
    //         />
    //         </div>
    //     )
    // }
    // ];
      
    // const { contentItem, contentChange } = useTabs(0, content);

    return(
        <>
        {club && <div>
            <TitleWrapper>
                <DetailTitle>{club.name}</DetailTitle>
                <InviteButton onClick={() => setInviteModal({show:!inviteModal.show})}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</InviteButton>
                <InviteModal clubId={query.get("clubId")} name={club.name} inviteModal={inviteModal} setInviteModal={setInviteModal} sendToMessage={sendToMessage} />
            </TitleWrapper>

            <ClubInfoBox club={club} clubWallet={clubWallet} />

            <ClubDepositModal clubId={query.get("clubId")} dues={club.dues} />
            <ClubPayModal clubId={query.get("clubId")} />
            <DevideModal clubId={query.get("clubId")} />
        </div>}
        </>  
    );
}



// <div className="tabs">
//     {content.map((section, index) => (
//         <button className="tablinks" key={index} onClick={() => contentChange(index)}>{section.tab}</button>
//     ))}
//     <br />
//     {contentItem.content}
// </div>