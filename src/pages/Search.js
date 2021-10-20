import { useState } from "react";
import SearchBox from "../components/search/SearchBox";
import SearchResultList from "../components/search/SearchResultList";
import { SearchTitleWrapper, SearchTitle } from "./styled/Search.styled";

export default function Search(){
    const [ searchData, setSearchData ] = useState({ location : '전체', category : '전체', clubname : '' });

    return(
        <div>
            <SearchTitleWrapper>
                <SearchTitle>모임 찾기</SearchTitle>
            </SearchTitleWrapper>
            <SearchBox searchData={searchData} setSearchData={setSearchData} />
            <SearchResultList searchData={searchData} />
        </div>
    );
}