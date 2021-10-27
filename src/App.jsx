import { useRef, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./pages/Main";
import Search from "./pages/Search";
import UserInfo from "./pages/UserInfo";
import ClubDetail from "./pages/ClubDetail";
import Messenger from "./pages/Messenger";
import Navbar from "./components/common/Navbar";
import ClubModal from "./components/common/ClubModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppWrapper } from "./App.styled";
import SockJsClient from 'react-stomp';
import {useDispatch} from 'react-redux';
import { insertPartner, insertMessage, receive } from './modules/ConversationList'
import axios from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const $websocket = useRef(null); 
  let topics = ['/topic/test'];
  const dispatch = useDispatch();

  useEffect(() => {
    getConversations();
  }, [])

  const sendToMessage = (from, to, msg, status) =>{
    const m = {message:msg, author:from, to:to, timestamp: new Date().getTime()};
    const invite = {message:msg, author:"naksam", to:"test", clubName:"KB테스트모임", status:1, timestamp: new Date().getTime()};
    const accept = {message:msg, author:"naksam", to:"test", email:"test@google.com", clubId:99, status:2, timestamp: new Date().getTime()};
    if(status===0){
      $websocket.current.sendMessage("/app/send", JSON.stringify(m));
      dispatch(insertMessage(m));
    }
    if(status===1){
      $websocket.current.sendMessage("/app/send", JSON.stringify(invite));
      dispatch(insertMessage(invite));
    }
    if(status===2){}
    $websocket.current.sendMessage("/app/send", JSON.stringify(accept));
    dispatch(insertMessage(accept));
  }

  const recevieMessage = (msg) => {
    dispatch(receive(msg));    
  }

  const getConversations = () => {
    axios({
      method:"get",
      url:process.env.REACT_APP_USER_BASE_URL+'/fetchAllUsers/test'
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

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppWrapper>
          <Switch>
            <Route path="/search" component={Search} />
            <Route path="/messenger" render={()=><Messenger sendToMessage={sendToMessage} recevieMessage={recevieMessage}/>}/>
            <Route path="/userinfo" component={UserInfo}/>
            <Route path="/clubdetail" component={ClubDetail} />
            <Route path="/" component={Main}/>
          </Switch>   
          <Navbar />
          <ClubModal />
        </AppWrapper>
      </RecoilRoot>
      <SockJsClient
          url={process.env.REACT_APP_CHAT_BASE_URL}
          topics={topics}
          onMessage={msg => {
            recevieMessage(msg);
          }}
          ref={$websocket}
        />
    </QueryClientProvider>
  );
}
