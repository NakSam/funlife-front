import { useRecoilValue } from "recoil";
import { searchState } from "../../states/state";
import useSearchList from "../../hooks/useSearchList";

export default function SearchResultList({ searchData }){
    const { data } = useSearchList(searchData);
    console.log(data);
    return(
        <div>
            <ul>
               {/* {data.map((item) => {
                   <li>{item}</li>
               })} */}
            </ul>
        </div>
    );
}