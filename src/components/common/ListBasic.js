import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { Button } from "@mui/material";

const ListBasic = () => {
    return(
        <div style={{display:"flex"}}>
            <div>
                <img alt="book" style={{width: "170px", borderRadius:"10px"}} src="https://naksam.s3.ap-northeast-2.amazonaws.com/img/books_1920.jpg"/>
            </div>
            <div style={{margin:"0px 0px 0px 5px"}}>
                <div className="location" style={{margin:"0px 5px 5px 5px", fontSize:"10px"}}>
                    <text style={{padding:"2px"}}>강남구</text>
                </div>
                <div className="clubTitle" style={{margin:"5px"}}>
                    <text>테스트모임</text>
                </div>
                <div className="personCount" style={{margin:"5px"}}>
                    <FontAwesomeIcon icon="users"/>
                    <text>5 / 5인</text>
                </div>
                
                <div className="tagCategory">
                    <Button variant="outlined" startIcon={<FontAwesomeIcon style={{width:"15px"}} icon="hashtag"/>} style={{borderRadius:"20px", fontSize:"12px", height:"25px"}}>
                        스터디
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ListBasic;