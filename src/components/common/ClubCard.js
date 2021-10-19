import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { Button } from "@mui/material";

const ClubCard = () => {
    return(
        <div style={{width:"170px"}}>
            <div className="clubImg">
                <img alt="book" style={{width: "150px", borderRadius:"10px"}} src="https://naksam.s3.ap-northeast-2.amazonaws.com/img/books_1920.jpg"/>
            </div>
            <div className="clubTitle" style={{margin:"5px"}}>
                <text>테스트모임</text>
            </div>
            <div className="personCount" style={{margin:"5px"}}>
                <FontAwesomeIcon icon="users"/>
                <text>5 / 5인</text>
            </div>
            <div className="location" style={{margin:"5px"}}>
                <text style={{padding:"2px"}}>강남구</text>
            </div>
            <div className="tagCategory">
                <Button variant="outlined" startIcon={<FontAwesomeIcon style={{width:"15px"}} icon="hashtag"/>} style={{borderRadius:"20px", fontSize:"12px", height:"25px"}}>
                    스터디
                </Button>
            </div>
        </div>
    );
}

export default ClubCard;