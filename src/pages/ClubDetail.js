import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axiosUtils from "../utils/axiosUtils";
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";

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
    // 바인딩
    const [club, setClub] = React.useState("");
    console.log(query.get("clubId"));

    React.useEffect(() => {
        axiosUtils.get('/club/search/' + query.get("clubId")).then((response) => {
          setClub(response.data);
        });
    }, []);
    // 바인딩

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
    const [modalIsOpen, setModalIsOpen] = useState(false);
 
    return(
        <div>
            <h1 class="clubName">{club.name}</h1>

            <div class="topnav">
                <button class="invitation" onClick={()=> setModalIsOpen(true)}><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</button>
                <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                    This is Modal content
                    <button onClick={()=> setModalIsOpen(false)}>Modal Open</button>
                </Modal>
                {/* 모임 설정 */}
                <button class="setting"><FontAwesomeIcon icon="fa-solid fa-gear" /> 모임 설정</button>
            </div>

            <div class="cardBox">
                <div class="finance">
                    <h3 class="balance">45,600,000,000 <FontAwesomeIcon icon="fa-solid fa-p" /></h3>
                    <button class="transfer">송금</button>
                    <button class="pay">결제</button>
                    <button class="calculate">정산</button>
                </div>
            </div>

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