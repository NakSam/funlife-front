import { CardWrapper,LinkWrapper, Thumbnail, Location, ClubName, Category } from "./styled/Card.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({ data }) {
    return (
        <CardWrapper>
            <LinkWrapper to={`/clubdetail?clubId=${data.id}`}>
                <Thumbnail src={data.image} alt="thumbnail" />
                <Location><FontAwesomeIcon icon="location-dot"/> {data.location}</Location>
                <ClubName>{data.name}</ClubName>
                <Category cate={data.category}>{data.category}</Category>
            </LinkWrapper>
        </CardWrapper>
    );
}