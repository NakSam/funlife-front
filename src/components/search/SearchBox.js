import { Row, Col } from "react-bootstrap";
import { CategoryList, LocationList } from "../../consts/search";
import { SelectBox1, SelectBox2, SearchInputBox, SearchInput } from "./styled/SearchBox.styled";

export default function SearchBox({ searchData, setSearchData }){

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name] : e.target.value }) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchData(searchData);
    }

    return(
        <form onSubmit={handleSubmit} style={{marginBottom:"2rem"}}>
            <Row style={{ margin:"0" }}>
                <Col style={{ padding:"0 0.2rem 0 0" }}>
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
                </Col>
                <Col style={{ padding:"0 0 0 0.2rem" }}>
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
                </Col>
            </Row>
            <SearchInputBox>
                <SearchInput 
                    name="clubname"
                    placeholder="모임을 검색하세요."
                    maxLength="20"
                    value={searchData.clubname}    
                    onChange={handleChange}
                />
            </SearchInputBox>
        </form>
    );
}