import { MainTitleWrapper, MainTitle, MainLogo } from "./styled/Main.styled";
import logo from "../static/img/logo.png"

export default function Main(){
    return(
        <div>    
            <MainTitleWrapper>
                <MainTitle>
                    안녕하세요. <br /> NAKSAM입니다.
                </MainTitle>
                <MainLogo>
                    <img width="100" alt="" src={logo} />
                </MainLogo>
            </MainTitleWrapper>
        </div>
    );
}