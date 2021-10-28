import React from 'react';
import moment from 'moment';
import './InviteMessage.css';
import {Button} from '../../../pages/styled/Main.styled';
import axiosUtils from '../../../utils/axiosUtils';
import {useCookies} from 'react-cookie';

const dummy1 = "모임에서 회원님을 초대하였습니다."
const dummy2 = "가입하기를 눌러 모임을 시작해보세요.";

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

    const handleRegister = () => {
      axiosUtils.post('/club/join/'+data.clubId,{},{headers:{Authorization:cookies['naksam']}})
      .then(()=>{
        alert("가입완료!")
      })
      .catch(()=>{
        alert("이미 가입되었거나 최대인원입니다.")
      })
    }

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
              <img className="message-photo" src={"https://naksam.s3.ap-northeast-2.amazonaws.com/user-img/base.png"} alt="conversation" />
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
              <Button onClick={handleRegister} style={{backgroundColor:"#79bcd7"}}>가입하기</Button>
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