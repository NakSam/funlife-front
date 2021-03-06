import React, {useEffect, useState} from 'react';
//import Compose from '../Compose';
import Toolbar from '../Toolbar';
//import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import InviteMessage from '../InviteMessage';
import AcceptMessage from '../AcceptMessage'
import moment from 'moment';
import 'moment/locale/ko'
import { Slide, Dialog } from '@mui/material';
//import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//import {useSelector, useDispatch} from 'react-redux';
//import { insertPartner, insertMessage } from '../../modules/ConversationList'
//import SendRoundedIcon from '@mui/icons-material/SendRounded';


import './MessageList.css';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//const MY_USER_ID = 'apple';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MessageList(props) {
  const {showMessage, setShowMessage, partner, list, host, sendToMessage, handleLeaveChat} = props;
  const [inputMessage, setInputMessage] = useState("");
  useEffect(() => {
  },[])

  const handleClose = () => {
    setShowMessage(false);
  };    

  // const handleExit = () => {
  //   handleLeaveChat(partner);    
  // }

  // const sendMessages = () => {
  //   if(inputMessage.length===0 || inputMessage===undefined)return;
  //   sendToMessage(host, partner, inputMessage)
  //   setInputMessage("")
  // }

  const renderMessages = () => {
    moment.locale('ko');
    let i = 0;
    let messageCount = list.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = list[i - 1];
      let current = list[i];
      let next = list[i + 1];
      let isMine = current.author === host;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;
      let prevCompare = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        const prevDateParts = previousMoment._d;
        const currentDateParts = currentMoment._d;
        if(prevDateParts.getYear() === currentDateParts.getYear() && prevDateParts.getMonth() === currentDateParts.getMonth() && prevDateParts.getDay() === currentDateParts.getDay()){
          showTimestamp = false;
        }
          
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }        
        const currentDateParts = currentMoment._d;
        const nextDateParts = nextMoment._d;
        
        if(currentDateParts.getYear() === nextDateParts.getYear() && currentDateParts.getMonth() === nextDateParts.getMonth() 
        && currentDateParts.getDay() === nextDateParts.getDay() && currentDateParts.getHours() === nextDateParts.getHours() && 
        currentDateParts.getMinutes() === nextDateParts.getMinutes()){
          prevCompare = false;
        }

        if(!nextBySameAuthor){
          prevCompare = true;
        }
        
      }

      if(current.status===2){
        tempMessages.push(
          <AcceptMessage
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
            prevCompare={prevCompare}
          />
        );
      }
      if(current.status===1){
        tempMessages.push(
          <InviteMessage
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
            prevCompare={prevCompare}
          />
        );
      }
      if(current.status===0){
        tempMessages.push(
          <Message
            key={i}
            isMine={isMine}
            startsSequence={startsSequence}
            endsSequence={endsSequence}
            showTimestamp={showTimestamp}
            data={current}
            prevCompare={prevCompare}
          />
        );
      }
      

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

    return(
      <Dialog fullScreen open={showMessage} TransitionComponent={Transition}>
        <div className="message-list">
          <Toolbar
            title={partner}
            leftItems={[
              //<ToolbarButton action={handleClose} key="back" icon="ion-ios-arrow-back" />
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <ArrowBackIosNewIcon/>
              </IconButton>
            ]}
            rightItems={[
              //<ToolbarButton action={handleExit} key="exit" icon="ion-md-exit"/>              
            ]}
          />

          <div className="message-list-container">{renderMessages()}</div>

          {/* <Compose 
            rightItems={[
              // <ToolbarButton action={sendMessages} key="send" icon="ion-ios-send"/>
              <IconButton
                edge="start"
                color="inherit"
                onClick={sendMessages}
                aria-label="close"
              >
                <SendRoundedIcon/>   
              </IconButton>
              // <SendRoundedIcon/>              
            ]}
            host={host}
            name={partner}
            setInputMessage={setInputMessage}
            //sendMessages={sendMessages}
            inputMessage={inputMessage}
          />               */}
        </div>
      </Dialog>
    );
}