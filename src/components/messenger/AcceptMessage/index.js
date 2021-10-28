import React from 'react';
import moment from 'moment';
import './AcceptMessage.css';
import {Button} from '../../../pages/styled/Main.styled';
import axiosUtils from '../../../utils/axiosUtils';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const dummy1 = "에 참여하기를 원합니다."
const dummy2 = "수락하여 참여시켜주세요.";

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      prevCompare
    } = props;
    const [cookies] = useCookies();
    const friendlyTimestamp = moment(data.timestamp).format('LL') + ' ' +moment(data.timestamp).format('dddd');
    const sendTimestamp = moment(data.timestamp).format('LT');
    const handleAccept = () => {
      const info = {
        clubId:data.clubId,
        emails:[String(data.email)]
      }
      axios({
        method:"post",
        url:"http://naksam.169.56.174.130.nip.io/club/invite",
        data:{
          ...info
        },
        headers:{
          Authorization:cookies['naksam']
        }
      })
      .then(()=>{alert("가입수락완료")})
      .catch(()=>{alert("이미 가입되었거나 최대인원입니다.")})
    }

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
              <img className="message-photo" src={'https://naksam.s3.ap-northeast-2.amazonaws.com/user-img/blank.png'} alt="conversation" />
            </div>
            <div style={{textAlign:"center", fontSize:"15px", marginTop:"7px", marginBottom:"7px"}}>
              <strong>{data.email}</strong>
            </div>
            <div style={{marginTop:"7px", marginBottom:"7px"}}>
              {data.clubName}{ dummy1 }
            </div>
            <div style={{marginTop:"7px", marginBottom:"7px"}}>
              { dummy2 }
            </div>
            <div>
              <Button onClick={handleAccept} style={{backgroundColor:"#79bcd7"}}>가입수락</Button>
            </div>            
          </div>
          {
            prevCompare && !isMine && 
            <span className="sendtime">
              <p>{sendTimestamp}</p>        
            </span>
          }          
        </div>
      </div>
    );
}