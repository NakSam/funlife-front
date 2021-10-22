import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';
import { Button } from "@mui/material";

const ListBasic = ({data}) => {
    return(
        data && Object.entries(data).map((item) => {
            return(
                <div style={{display:"flex", margin:"5px 0px 5px 0px"}}>
                    <div>
                        <img alt="book" style={{width: "170px", borderRadius:"10px"}} src={item[1].image} />
                    </div>
                    <div style={{margin:"0px 0px 0px 5px"}}>
                        <div className="location" style={{margin:"0px 5px 5px 5px", fontSize:"10px"}}>
                            <div style={{padding:"2px"}}>{item[1].location}</div>
                        </div>
                        <div className="clubTitle" style={{margin:"5px"}}>
                            <div>{item[1].name}</div>
                        </div>
                        <div className="personCount" style={{margin:"5px"}}>
                            <FontAwesomeIcon icon="users"/>
                            <div>{item[1].memberNum} / {item[1].maxMemberNum}인</div>
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

export default ListBasic;