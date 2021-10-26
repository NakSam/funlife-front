import React from "react";
import ConversationList from "../components/messenger/ConversationList";
import { MessengerArea, MessengerTitle, MessengerTitleWrapper } from "./styled/messenger.styled";

export default function Messenger({sendToMessage, recevieMessage}){
    return(
        <div>
            <MessengerTitleWrapper>
                <MessengerTitle>메신저</MessengerTitle>
            </MessengerTitleWrapper>
            <MessengerArea>
                <ConversationList sendToMessage={sendToMessage} recevieMessage={recevieMessage}/>
            </MessengerArea>
        </div>
    );
}