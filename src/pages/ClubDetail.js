import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const useTabs = (initialTabs, allTabs) => {
    const [contentIndex, setContentIndex] = useState(initialTabs);
    return {
        contentItem: allTabs[contentIndex],
        contentChange: setContentIndex
    };
};

export default function ClubDetail(){
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
                    <p>캘리그라피 초보라면 누구나 환영합니다~^^</p>
                    <button class="category">캘리그라피/서예</button>
                    <button class="location"><FontAwesomeIcon icon="fa-solid fa-location-dot" /> 부산광역시 북구</button>
                </div>
    
                <div class="introStatistics">
                    <h2 class="introSubTitle">이 모임의 활동 정보</h2>
                    <ul>
                        <li>개설일 2017년 1월</li>
                        <li>멤버 67 명</li>
                        <li>회비 10000원/월</li>
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

    return(
        <div>
            <h1 class="clubName">초보 캘리스터디</h1>

            <div class="topnav">
                <button class="invitation"><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</button>
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