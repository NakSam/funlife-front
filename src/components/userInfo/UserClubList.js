import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { Button } from "@mui/material";
import ClubDetail from "../../pages/ClubDetail";

function test11(clubId){
    console.log(clubId);
    return window.location.replace("/clubDetail/?clubId="+clubId);
}

const UserClubList = ({data}) => {
    
    return(
        data && Object.entries(data).map((item) => {
            return (
                <div style={{display:"flex"}} key={item[1].id} name="clubId" value={item[1].id} onClick={() => test11(item[1].id)}>
                    <div >
                        <img alt="book" style={{width: "170px", borderRadius:"10px"}} src={item[1].image} />
                    </div>
                    <div style={{margin:"0px 0px 0px 5px"},{position:"relative"}}>
                        <div className="location" style={{margin:"0px 5px 5px 5px", fontSize:"10px"}}>
                            <text style={{padding:"2px"}}>{item[1].location}</text>
                        </div>
                        <div className="clubTitle" style={{margin:"5px"}}>
                            <text>{item[1].name}</text>
                        </div>
                        <div className="personCount" style={{margin:"5px"}}>
                            <FontAwesomeIcon icon="users"/>
                            <text>{item[1].memberNum} / {item[1].maxMemberNum}인</text>
                        </div>
                        
                        <div className="tagCategory">
                            <Button variant="outlined" startIcon={<FontAwesomeIcon style={{width:"15px"}} icon="hashtag"/>} style={{borderRadius:"20px", fontSize:"12px", height:"25px"}}>
                                {item[1].category}
                            </Button>
                        </div>
                    </div>
                </div>
            )
        })
    );
}

export default UserClubList;