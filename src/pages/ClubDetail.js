import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosUtils from "../utils/axiosUtils";
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";
import InviteModal from '../components/clubdetail/InviteModal';
import ClubDepositModal from '../components/clubdetail/ClubDepositModal';
import DevideModal from '../components/clubdetail/DevideModal';

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

    const [value, onChange] = useState(new Date());

    const content = [
    {
        tab:(
            <p class="tabName"><FontAwesomeIcon icon="fa-solid fa-circle-info" /> 정보</p>
        ),
        content:(
            <div id="Information" class="tabcontent">
                <div class="clubIntroDetail">
                    <h2 class="clubIntroTitle">모임 소개</h2>
                    <p>{club.description}</p>
                    <button class="category">{club.category}</button>
                    <button class="location"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> {club.location}</button>
                </div>
    
                <div class="introStatistics">
                    <h2 class="introSubTitle">이 모임의 활동 정보</h2>
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
            <p class="tabName"><FontAwesomeIcon icon="fa-solid fa-calendar-days" /> 일정</p>
        ),
        content:(
            <div id="Schedule" class="tabcontent calendar">
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
    const [calculateModalIsOpen, setCalculateModalIsOpen] = useState(false);
 
    return(
        <div>
            {/* 모임 이름 */}
            <h1 class="clubName">{club.name}</h1>

            <div class="topnav">
                {/* 초대 */}
                <InviteModal  name={club.name}/>

                {/* 모임 설정 */}
                <button class="setting"><FontAwesomeIcon icon="fa-solid fa-gear" /> 모임 설정</button>
            </div>

            {/* 클럽 지갑 */}
            <div class="cardBox">
                <div class="finance">
                    <h3 class="balance">45,600,000,000 <FontAwesomeIcon icon="fa-solid fa-p" /></h3>
                    
                    {/* 송금 */}
                    <ClubDepositModal clubId={query.get("clubId")} dues={club.dues} />

                    {/* 결제 */}
                    <button class="pay" onClick={()=> setPayModalIsOpen(true)}>결제</button>
                    <Modal isOpen={payModalIsOpen} ariaHideApp={false}>
                        This is Modal content2
                        <button onClick={()=> setPayModalIsOpen(false)}>Modal Open</button>
                    </Modal>

                    {/* 정산 */}
                    <DevideModal clubId={query.get("clubId")} />

                    {/* 내역 */}
                    {/* <button class="history" onClick={()=> setHistoryModalIsOpen(true)}>내역</button>
                    <Modal isOpen={calculateModalIsOpen} ariaHideApp={false}>
                        This is Modal content3
                        <button onClick={()=> setCalculateModalIsOpen(false)}>Modal Open</button>
                    </Modal> */}
                </div>
            </div>

            {/* 탭 */}
            <div className="tabs">
                {content.map((section, index) => (
                    <button class="tablinks" onClick={() => contentChange(index)}>{section.tab}</button>
                ))}
                <br />
                {contentItem.content}
            </div>
        </div>  
    );
}