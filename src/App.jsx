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
import { useSelector, useDispatch} from 'react-redux';
import { insertMessage, receive } from './modules/ConversationList'
import { countMessage } from "./modules/UserData";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const $websocket = useRef(null);   
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userdata);
  let topics = ['/topic/'+userData.userId];  

  const sendToMessage = (from, to, msg, status) =>{
    if(status===0){
      const m = {message:msg, author:from, to:to, timestamp: new Date().getTime()};
      $websocket.current.sendMessage("/app/send", JSON.stringify(m));
      dispatch(insertMessage(m));
    }
    if(status===1){
      const invite = {message:"초대", author:"naksam", to:to, clubId:msg.clubId, email:msg.email, clubName:msg.clubName, status:1, timestamp: new Date().getTime()};
      $websocket.current.sendMessage("/app/send", JSON.stringify(invite));      
    }
    if(status===2){
      const accept = {message:"가입신청", author:"naksam", to:to, clubId:msg.clubId, email:msg.email, clubName:msg.clubName, status:2, timestamp: new Date().getTime()};
      $websocket.current.sendMessage("/app/send", JSON.stringify(accept));      
    }
  }

  const recevieMessage = (msg) => {
    dispatch(receive(msg));    
    dispatch(countMessage(1));
  }
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppWrapper>
          <Switch>
            <Route path="/search" render={()=><Search sendToMessage={sendToMessage}/>} />
            <Route path="/messenger" render={()=><Messenger sendToMessage={sendToMessage} recevieMessage={recevieMessage}/>}/>
            <Route path="/userinfo" component={UserInfo}/>
            <Route path="/clubdetail" render={()=><ClubDetail sendToMessage={sendToMessage}/>} />
            <Route path="/" render={()=><Main sendToMessage={sendToMessage}/>}/>
          </Switch>   
          <Navbar />
          <ClubModal sendToMessage={sendToMessage}/>
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
