import { useSetRecoilState } from "recoil";
import { searchStatus } from "../../states/state";
import { CategoryList, LocationList } from "../consts/search";
import { SelectBox1, SelectBox2, SearchInputBox, SearchInput, SearchButton } from "./styled/SearchBox.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputLabel, Select, MenuItem } from "@mui/material";

export default function SearchBox({ searchData, setSearchData }){
    const setSearch = useSetRecoilState(searchStatus);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name] : value }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(true);
        setSearchData(searchData);
    }

    return(
        <form onSubmit={handleSubmit}>
            <SelectBox1 size="small">
                <InputLabel id="category">카테고리</InputLabel>
                <Select
                    labelId="category"
                    id="category-select"
                    name="category"
                    label="category"
                    onChange={handleChange}
                    value={searchData.category}
                    defaultValue={CategoryList.전체}
                >
                    {Object.entries(CategoryList).map(([key, value]) => (
                        <MenuItem value={value} key={key}>{value}</MenuItem>
                    ))}
                </Select>
            </SelectBox1>
            <SelectBox2 size="small">
                <InputLabel id="location">지역</InputLabel>
                <Select
                    labelId="location"
                    id="location-select"
                    name="location"
                    label="location"
                    onChange={handleChange}
                    value={searchData.location}
                    defaultValue={LocationList.전체}
                >
                    {Object.entries(LocationList).map(([key, value]) => (
                        <MenuItem value={value} key={key}>{value}</MenuItem>
                    ))}
                </Select>
            </SelectBox2>
            <SearchInputBox>
                <SearchInput 
                    size="small" 
                    label="Search" 
                    name="clubname"
                    placeholder="모임을 검색하세요."
                    value={searchData.clubname}    
                    onChange={handleChange}
                />
                <SearchButton type="submit">
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> 
                </SearchButton>
            </SearchInputBox>
        </form>
    );
}