import { useState } from "react";
import ListBasic from "../components/common/ListBasic";
import SearchBox from "../components/search/SearchBox";
import useSearchList from "../hooks/useSearchList";
import { SearchTitle, SearchResult } from "./styled/Search.styled";

export default function Search(){
    const [ searchData, setSearchData ] = useState({ location : '전체', category : '전체', clubname : '' });
    const { data } = useSearchList(searchData);  
    return(
        <div style={{ marginBottom:"4rem" }}>
            <SearchTitle>모임 찾기</SearchTitle>
            <SearchBox searchData={searchData} setSearchData={setSearchData} />
            <SearchResult>검색 결과</SearchResult>
            {data && data.length > 0 ? <ListBasic data={data}/> : <small>검색 결과가 없습니다.</small>}
        </div>
    );
}