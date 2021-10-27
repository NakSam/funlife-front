import React,{useState} from "react";
import ConversationList from "../components/messenger/ConversationList";
import { MessengerArea, MessengerTitle, MessengerTitleWrapper } from "./styled/messenger.styled";
import { loginStatus } from "../states/state";
import { useRecoilValue } from "recoil";
import Login from "../components/user/SignIn";
import { Button } from "./styled/UserInfo.styled";

export default function Messenger({sendToMessage, recevieMessage}){
    const userStatus = useRecoilValue(loginStatus);
    const [ open, setOpen ] = useState({signIn:false, signUp:false});
    return(
        <div>
            <MessengerTitleWrapper>
                <MessengerTitle>메신저</MessengerTitle>
            </MessengerTitleWrapper>
            {!userStatus 
            ? <>
                <Button onClick={() => setOpen({...open, signIn:true})}>로그인</Button> 
                <Login open={open} setOpen={setOpen} />
            </> 
            : <>
                <MessengerArea>
                    <ConversationList sendToMessage={sendToMessage} recevieMessage={recevieMessage}/>
                </MessengerArea>
            </> }
            
        </div>
    );
}