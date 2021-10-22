import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { Button } from "@mui/material";

function goClubDetail(clubId){
    console.log(clubId);
    return window.location.href = "/clubDetail/?clubId="+clubId;
}

const UserClubList = ({data}) => {
    
    return(
        data && Object.entries(data).map((item) => {
            return (
                <div style={{display:"flex"}} key={item[1].id} name="clubId" value={item[1].id} onClick={() => goClubDetail(item[1].id)}>
                    <div >
                        <img alt="book" style={{width: "170px", borderRadius:"10px"}} src={item[1].image} />
                    </div>
                    <div style={{margin:"0px 0px 0px 5px"}}>
                        <div className="location" style={{margin:"0px 5px 5px 5px", fontSize:"10px"}}>
                            <span style={{padding:"2px"}}>{item[1].location}</span>
                        </div>
                        <div className="clubTitle" style={{margin:"5px"}}>
                            <span>{item[1].name}</span>
                        </div>
                        <div className="personCount" style={{margin:"5px"}}>
                            <FontAwesomeIcon icon="users"/>
                            <span>{item[1].memberNum} / {item[1].maxMemberNum}인</span>
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