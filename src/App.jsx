import { Route, Switch } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from "react-query";
import Main from "./pages/Main";
import Search from "./pages/Search";
import UserInfo from "./pages/UserInfo";
import ClubDetail from "./pages/ClubDetail";
import Navbar from "./components/common/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppWrapper } from "./App.styled";
import ClubModal from "./components/common/ClubModal";
import UserWalletModal from "./components/common/UserWalletModal";

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
            <Route path="/home" component={Main}/>
            <Route path="/search" component={Search} />
            <Route path="/userinfo" component={UserInfo}/>
            <Route path="/clubdetail" component={ClubDetail} />
            <Route path="/" component={Main}/>
          </Switch>   
          <Navbar />
          <ClubModal />
          <UserWalletModal />
        </AppWrapper>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
