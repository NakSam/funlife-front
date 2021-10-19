import SearchBox from "../components/search/SearchBox";
import SearchResultList from "../components/search/SearchResultList";
import TagList from "../components/search/TagList";
import { SearchTitle } from "./styled/Search.styled";

export default function Search(){
    return(
        <div>
            <SearchTitle>모임 찾기</SearchTitle>
            <SearchBox />
            <TagList />
            {/* <SearchResultList /> */}
        </div>
    );
}