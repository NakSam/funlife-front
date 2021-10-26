import { useRecoilState } from "recoil";
import { modalStatus } from "../../states/state";
import { ListWrapper, Thumbnail, Location, ClubName, PeopleCnt, Category, Left, Right } from "./styled/ListBasic.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../static/icons/FontAwesome';

export default function ListBasic({ data }){
    const [ showModal, setShowModal] = useRecoilState(modalStatus);
    return (
        <>
        {data && Object.entries(data).map((item) => {
            return(
                <ListWrapper style={{maxWidth:"100%"}} onClick={() => setShowModal({show: !showModal.show, clubId:item[1].id})} key={item[1].id} >
                    <Left>
                        <Thumbnail alt="book" src={item[1].image} />
                    </Left>
                    <Right>
                        <Location><FontAwesomeIcon icon="location-dot"/> {item[1].location}</Location>
                        <ClubName>{item[1].name.length > 16 ? item[1].name.substr(0, 15) + "..." : item[1].name}</ClubName>
                        <PeopleCnt>
                            <FontAwesomeIcon icon="user"/> {item[1].memberNum} / {item[1].maxMemberNum}인
                        </PeopleCnt>
                        <Category cate={item[1].category}>{item[1].category}</Category>
                    </Right>
                </ListWrapper>
            )
        })}
        </>
    );
}