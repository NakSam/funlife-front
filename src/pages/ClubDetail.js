import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosUtils from "../utils/axiosUtils";
import { useLocation } from "react-router-dom";
import InviteModal from '../components/clubdetail/InviteModal';
import ClubDepositModal from '../components/clubdetail/ClubDepositModal';
import ClubPayModal from '../components/clubdetail/ClubPayModal';
import DevideModal from '../components/clubdetail/DevideModal';
import HistoryModal from '../components/clubdetail/HistoryModal';

const useTabs = (initialTabs, allTabs) => {
    const [contentIndex, setContentIndex] = useState(initialTabs);
    return {
        contentItem: allTabs[contentIndex],
        contentChange: setContentIndex
    };
};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function ClubDetail(e){
    let query = useQuery();
    // club detail
    const [club, setClub] = React.useState("");
    console.log(query.get("clubId"));

    React.useEffect(() => {
        axiosUtils.get('/club/search/' + query.get("clubId")).then((response) => {
          setClub(response.data);
        });
    }, []);
    // club detail

    const [clubWallet, setClubWallet] = React.useState("");
    React.useEffect(() => {
        axiosUtils.get('/wallet/club/' + query.get("clubId") + '/history').then((response) => {
            setClubWallet(response.data.amount);
        });
    }, []);

    const [value, onChange] = useState(new Date());

    const content = [
    {
        tab:(
            <p className="tabName"><FontAwesomeIcon icon="fa-solid fa-circle-info" /> 정보</p>
        ),
        content:(
            <div id="Information" className="tabcontent">
                <div className="clubIntroDetail">
                    <h2 className="clubIntroTitle">모임 소개</h2>
                    <p>{club.description}</p>
                    <button className="category">{club.category}</button>
                    <button className="location"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {club.location}</button>
                </div>
    
                <div className="introStatistics">
                    <h2 className="introSubTitle">이 모임의 활동 정보</h2>
                    <img src={club.image} />
                    <ul>
                        <li>리더 {club.clubMaster}</li>
                        <li>멤버 {club.memberNum}</li>
                        <li>회비 {club.dues}원</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        tab: (
            <p className="tabName"><FontAwesomeIcon icon="fa-solid fa-calendar-days" /> 일정</p>
        ),
        content:(
            <div id="Schedule" className="tabcontent calendar">
            <Calendar
                onChange={onChange}
                value={value}
            />
            </div>
        )
    }
    ];
      
    const { contentItem, contentChange } = useTabs(0, content);

    // 모달
    const [payModalIsOpen, setPayModalIsOpen] = useState(false);
 
    return(
        <div>
            {/* 모임 이름 */}
            <h1 className="clubName">{club.name}</h1>

            <div className="topnav">
                {/* 초대 */}
                <InviteModal  name={club.name}/>

                {/* 모임 설정 */}
                <button className="setting"><FontAwesomeIcon icon="fa-solid fa-gear" /> 모임 설정</button>
            </div>

            {/* 클럽 지갑 */}
            <div className="cardBox">
                <div className="finance">
                    <h3 className="balance">{clubWallet} <FontAwesomeIcon icon="fa-solid fa-p" /></h3>
                    
                    {/* 송금 */}
                    <ClubDepositModal clubId={query.get("clubId")} dues={club.dues} />

                    {/* 결제 */}
                    <ClubPayModal clubId={query.get("clubId")} />

                    {/* 정산 */}
                    <DevideModal clubId={query.get("clubId")} />

                    {/* 내역 */}
                    <HistoryModal clubId={query.get("clubId")} />
                </div>
            </div>

            {/* 탭 */}
            <div className="tabs">
                {content.map((section, index) => (
                    <button className="tablinks" onClick={() => contentChange(index)}>{section.tab}</button>
                ))}
                <br />
                {contentItem.content}
            </div>
        </div>  
    );
}