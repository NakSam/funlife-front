import { TabsWrapper, TabsTitleWrapper, TabsTitle1, TabsTitle2, TabsBodyWrapper, TabsBody } from "./styled/TabBox.styled";
import { useState } from "react";
import Calendar from "./Calendar";
import ClubDetailInfo from "./ClubDetailInfo";

export default function TabBox({ club }) {
    const [tab, setTab] = useState(1);
    return (
        <TabsWrapper>
            <TabsTitleWrapper>
                <TabsTitle1 tab={tab} onClick={() => setTab(1)}>정보</TabsTitle1>
                <TabsTitle2 tab={tab} onClick={() => setTab(2)}>일정</TabsTitle2>
            </TabsTitleWrapper>
            <TabsBodyWrapper>
            {tab === 1 
            ? <TabsBody><ClubDetailInfo club={club} /></TabsBody> 
            : <TabsBody><Calendar /></TabsBody>}
            </TabsBodyWrapper>
        </TabsWrapper>
    )
}