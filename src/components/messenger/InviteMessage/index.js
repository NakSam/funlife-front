import React from 'react';
import moment from 'moment';
import './InviteMessage.css';
import {Button} from '../../../pages/styled/Main.styled';

const dummy1 = "모임에서 회원님을 초대하였습니다."
const dummy2 = "수락하기를 눌러 모임을 시작해보세요.";
const team = "KB 연수생모임"

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      prevCompare
    } = props;

    const friendlyTimestamp = moment(data.timestamp).format('LL') + ' ' +moment(data.timestamp).format('dddd');
    const sendTimestamp = moment(data.timestamp).format('LT')
    return (
      <div className={[
        'invite',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        }

        <div className="bubble-container">
          {
            prevCompare && isMine && 
            <span className="sendtime">
              {sendTimestamp} 
            </span>
          }
          <div className="bubble" title={friendlyTimestamp}>
            <div style={{textAlign:"center"}}>
              <img className="conversation-photo" src={process.env.REACT_APP_USER_BASE_IMAGE} alt="conversation" />
            </div>
            <div style={{textAlign:"center", fontSize:"15px", marginTop:"7px", marginBottom:"7px"}}>
              <strong>{data.clubName}</strong>
            </div>
            <div style={{marginTop:"7px", marginBottom:"7px"}}>
              { dummy1 }
            </div>
            <div style={{marginTop:"7px", marginBottom:"7px"}}>
              { dummy2 }
            </div>
            <div>
              <Button style={{backgroundColor:"#79bcd7"}}>가입하기</Button>
            </div>            
          </div>
          {
            prevCompare && !isMine && 
            <span className="sendtime">
              <text>{sendTimestamp}</text>        
            </span>
          }          
        </div>
      </div>
    );
}