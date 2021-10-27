import React from 'react';
import moment from 'moment';
import './AcceptMessage.css';
import {Button} from '../../../pages/styled/Main.styled';

const dummy1 = "KB모임에 참여하기를 원합니다."
const dummy2 = "수락하여 참여시켜주세요.";
const user = "수습행원"

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
        'accept',
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
              <img className="conversation-photo" src={'https://naksam.s3.ap-northeast-2.amazonaws.com/user-img/blank.png'} alt="conversation" />
            </div>
            <div style={{textAlign:"center", fontSize:"15px", marginTop:"7px", marginBottom:"7px"}}>
              <strong>{user}</strong>
            </div>
            <div style={{marginTop:"7px", marginBottom:"7px"}}>
              { dummy1 }
            </div>
            <div style={{marginTop:"7px", marginBottom:"7px"}}>
              { dummy2 }
            </div>
            <div>
              <Button style={{backgroundColor:"#79bcd7"}}>가입수락</Button>
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