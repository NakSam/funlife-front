import { useState } from "react";
import { useRecoilState } from "recoil";
import SearchBox from "../components/search/SearchBox";
import TagList from "../components/search/TagList";
import SearchResultList from "../components/search/SearchResultList";
import { searchStatus } from "../states/state";
import { SearchTitleWrapper, SearchTitle, ReturnIcon } from "./styled/Search.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search(){
    const [ search, setSearch ] = useRecoilState(searchStatus);
    const [ searchData, setSearchData ] = useState({ location : '전체', category : '전체', clubname : '' });

    const resetSearch = () => {
        return (
            setSearch(false), 
            setSearchData({location:'전체', category:'전체', clubname:''})
        )
    }

    return(
        <div>
            <SearchTitleWrapper>
                <SearchTitle>모임 찾기</SearchTitle>
                <ReturnIcon>
                    <FontAwesomeIcon 
                        icon="fa-solid fa-arrow-rotate-left" 
                        onClick={resetSearch}
                    />          
                </ReturnIcon>
            </SearchTitleWrapper>
            <SearchBox searchData={searchData} setSearchData={setSearchData} />
            {!search ? <TagList /> : <SearchResultList searchData={searchData} />}
        </div>
    );
}