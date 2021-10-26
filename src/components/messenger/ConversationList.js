import React, {useState, useEffect, useRef} from 'react';
import ConversationSearch from './ConversationSearch';
import ConversationListItem from './ConversationListItem';
import Toolbar from './Toolbar';
import ToolbarButton from './ToolbarButton';
//import axios from 'axios';
import Button from '@mui/material/Button';
import SockJsClient from 'react-stomp';
//import AddPartner from '../AddPartner';
import './ConversationList.css';
import {useSelector, useDispatch} from 'react-redux';
import { insertPartner, insertMessage, receive } from '../../modules/ConversationList'

const dummy = ["test", "naksam", "hello"];

export default function ConversationList({userId}) {
  const conversationList = useSelector(state => state.conversationlist);
    // const [conversations, setConversations] = useState([]);
  const [addPartner, setAddPartner] = useState(false);
  const $websocket = useRef(null); 
  let topics = ['/topic/'+userId];
  const dispatch = useDispatch(); 

  useEffect(() => {
    setDummyList()
  },[])

  const sendToMessage = (from, to, msg) =>{
    const m = {message:msg, author:from, to:to, timestamp: new Date().getTime()};
    $websocket.current.sendMessage("/app/send", JSON.stringify(m));
    //dispatch(insertMessage(m));
  }

  const handleAddPartner = (name)=> {
    console.log(name);
    dispatch(insertPartner({
      photo:'https://naksam.s3.ap-northeast-2.amazonaws.com/user-img/base.png',
      partner:name,
      list:[]
    }))
  }

  const setDummyList = () => {
    for(const id in dummy){
      handleAddPartner(dummy[id]);
    }
  }

  const recevieMessage = (msg) => {
    //dispatch(receive(msg));    
  }
    return (
      <div className="conversation-list">        
        <ConversationSearch />
        { 
          Object.keys(conversationList).map((key) => 
            <ConversationListItem             
              key={key}
              //photo={conversation.photo}
              partner={key}
              //list={conversationList[key]}
              host={userId}
              sendToMessage={sendToMessage}
            />
          )
        }
        
        {/* <SockJsClient
          //url={process.env.REACT_APP_CHAT_BASE_URL}
          topics={topics}
          onMessage={msg => {
            recevieMessage(msg);
          }}
          ref={$websocket}
        /> */}
      </div>
    );
}