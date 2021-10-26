import React from 'react';
import ConversationSearch from './ConversationSearch';
import ConversationListItem from './ConversationListItem';
import './ConversationList.css';
import {useSelector} from 'react-redux';

export default function ConversationList({userId, sendToMessage}) {
  const conversationList = useSelector(state => state.conversationlist);  
 
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
      </div>
    );
}