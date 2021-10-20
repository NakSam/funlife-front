import { useRecoilState } from "recoil";
import useSearchList from "../../hooks/useSearchList";
import { modalStatus } from "../../states/state";

export default function SearchResultList({ searchData }){
    const { data } = useSearchList(searchData);  
    const [ showModal, setShowModal] = useRecoilState(modalStatus);

    return(
        <div>
            <ul>
                {data && Object.entries(data).map((item) => {
                    return (
                        <li key={item[1].id} onClick={() => setShowModal({show: !showModal.show, clubId:1})}>{item[1].name}</li>
                    )
                })}
            </ul>
        </div>
    );
}