import { Route, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Messenger from "./pages/Messenger";
import UserInfo from "./pages/UserInfo";
import ClubDetail from "./pages/ClubDetail";
import { AppWrapper } from "./App.styled";

export default function App() {
  return (
    <AppWrapper>
      <Switch>
        <Route path="/home" component={Main} />
        <Route path="/search" component={Search} />
        <Route path="/messenger" component={Messenger}/>
        <Route path="/userinfo" component={UserInfo}/>
        <Route path="/clubdetail" component={ClubDetail} />
      </Switch>   
    </AppWrapper>
  );
}
