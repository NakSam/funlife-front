import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { Button } from "@mui/material";

const ListBasic = ({data}) => {
    return(
        <div style={{display:"flex", margin:"5px 0px 5px 0px"}}>
            <div>
                <img alt="book" style={{width: "170px", borderRadius:"10px"}} src={data.thumbnail} />
            </div>
            <div style={{margin:"0px 0px 0px 5px"}}>
                <div className="location" style={{margin:"0px 5px 5px 5px", fontSize:"10px"}}>
                    <text style={{padding:"2px"}}>{data.location}</text>
                </div>
                <div className="clubTitle" style={{margin:"5px"}}>
                    <text>{data.clubTitle}</text>
                </div>
                <div className="personCount" style={{margin:"5px"}}>
                    <FontAwesomeIcon icon="users"/>
                    <text>{data.currentPerson} / {data.maxPerson}인</text>
                </div>
                
                <div className="tagCategory">
                    <Button variant="outlined" startIcon={<FontAwesomeIcon style={{width:"15px"}} icon="hashtag"/>} style={{borderRadius:"20px", fontSize:"12px", height:"25px"}}>
                        {data.tag}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ListBasic;