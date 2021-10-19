import './styled/ClubDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClubDetail(){
    return(
        <div>
            <h1 class="name">강남구 맛집 탐방 모임</h1>
            <div class="topnav">
                <a class="invitation" href=""><FontAwesomeIcon icon="fa-solid fa-circle-plus" /> 초대</a>
                <a class="setting" href=""><FontAwesomeIcon icon="fa-solid fa-gear" /> 모임 설정</a>
            </div>

            <div class="tab">
                <button class="tablinks" onclick="openCity(event, 'Information')" id="defaultOpen"><FontAwesomeIcon icon="fa-solid fa-circle-info" /> 정보</button>
                <button class="tablinks" onclick="openCity(event, 'Schedule')"><FontAwesomeIcon icon="fa-solid fa-calendar-days" /> 일정</button>
            </div>

            <div id="Information" class="tabcontent">
                <h2>모임 소개</h2>
                <p>캘리그라피 초보라면 누구나 환영합니다~^^</p>
                <div>
                    <button class="button">캘리그라피/서예</button>
                </div>
                <p>
                    <a class="location" href=""><FontAwesomeIcon icon="fa-solid fa-location-dot" /> 부산광역시 북구</a>
                </p>
            </div>

            <div id="Schedule" class="tabcontent">
                <h3>Schedule</h3>
            </div>

            {/* <script>
                function openCity(evt, cityName) {
                    var i, tabcontent, tablinks;
                    tabcontent = document.getElementsByClassName("tabcontent");
                    for (i = 0; i < tabcontent.length; i++) {
                        tabcontent[i].style.display = "none";
                    }
                    tablinks = document.getElementsByClassName("tablinks");
                    for (i = 0; i < tablinks.length; i++) {
                        tablinks[i].className = tablinks[i].className.replace(" active", "");
                    }
                    document.getElementById(cityName).style.display = "block";
                    evt.currentTarget.className += " active";
                }

                // Get the element with id="defaultOpen" and click on it
                document.getElementById("defaultOpen").click();
            </script> */}
        </div>  
    );
}