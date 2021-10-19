import { Route, Switch } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Messenger from "./pages/Messenger";
import UserInfo from "./pages/UserInfo";
import Navbar from "./components/common/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppWrapper } from "./App.styled";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AppWrapper>
          <Switch>
            <Route path="/home" component={Main} />
            <Route path="/search" component={Search} />
            <Route path="/messenger" component={Messenger}/>
            <Route path="/userinfo" component={UserInfo}/>
          </Switch>   
          <Navbar />
        </AppWrapper>
      </RecoilRoot>
    </QueryClientProvider>
  );
}