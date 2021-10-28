import React, {useEffect} from 'react';
import ConversationSearch from './ConversationSearch';
import ConversationListItem from './ConversationListItem';
import './ConversationList.css';
import {useSelector,useDispatch} from 'react-redux';
import axios from 'axios';
import { insertPartner } from '../../modules/ConversationList';
import axiosUtils from '../../utils/axiosUtils';
import {useCookies} from 'react-cookie';
import { login, email, userid } from '../../modules/UserData';



export default function ConversationList({userId, sendToMessage}) {
  const conversationList = useSelector(state => state.conversationlist); 
  const userData = useSelector(state => state.userdata);
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  useEffect(() => {
    axiosUtils.get("/user/detail",{headers:{Authorization:cookies['naksam']}}).then((res) => {
      dispatch(login(true));
      dispatch(email(res.data.email));
      dispatch(userid(res.data.id));
      getConversations(res.data.id);
    });
  }, [])
  const getConversations = (id) => {
    axios({
      method:"get",
      url:process.env.REACT_APP_USER_BASE_URL+'/fetchAllUsers/'+String(id)
    })
    .then((response) => {
      for (const key in response.data) {
        dispatch(insertPartner(
          {
            photo:process.env.REACT_APP_USER_BASE_IMAGE,
            partner: response.data[key].partner,
            list:[...response.data[key].messageList]
          }
        ))
      }           
    })
    .catch((error) => {

    })
  } 
  // const sendMessage = () => {
  //   sendToMessage("test", "naksam", "hello");
  // }

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