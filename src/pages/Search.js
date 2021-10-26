import { useState } from "react";
import SearchBox from "../components/search/SearchBox";
import SearchResultList from "../components/search/SearchResultList";
import { SearchTitle } from "./styled/Search.styled";

export default function Search(){
    const [ searchData, setSearchData ] = useState({ location : '전체', category : '전체', clubname : '' });

    return(
        <div>
            <SearchTitle>모임 찾기</SearchTitle>
            <SearchBox searchData={searchData} setSearchData={setSearchData} />
            <SearchResultList searchData={searchData} />
        </div>
    );
}