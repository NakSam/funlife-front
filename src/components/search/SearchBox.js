import { CategoryList, LocationList } from "../../consts/search";
import { SelectBox1, SelectBox2, SearchInputBox, SearchInput, SearchButton } from "./styled/SearchBox.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function SearchBox({ searchData, setSearchData }){
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name] : value }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchData(searchData);
    }

    return(
        <form onSubmit={handleSubmit} style={{marginBottom:"2rem"}}>
            <div style={{display:"flex"}}>
                <div>
                    <SelectBox1 aria-label="category" 
                        name="category"
                        onChange={handleChange}
                        value={searchData.category}
                    >
                        {Object.entries(CategoryList).map(([key, value]) => {
                            if (value === "전체") {
                                return <option value={value} key={key}>분류 : {value}</option>
                            }
                            return <option value={value} key={key}>{value}</option>
                        })}
                    </SelectBox1>
                </div>
                <div>
                    <SelectBox2 aria-label="location"
                        name="location"
                        onChange={handleChange}
                        value={searchData.location}
                    >
                        {Object.entries(LocationList).map(([key, value]) => {
                            if (value === "전체") {
                                return <option value={value} key={key}>지역 : {value}</option>
                            }
                            return <option value={value} key={key}>{value}</option>
                        })}
                    </SelectBox2>
                </div>
            </div>
            <SearchInputBox>
                <SearchInput 
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