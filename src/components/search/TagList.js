import { TagWrapper, TagTitle } from "./styled/TagList.styled";

export default function TagList(){
    return(
        <TagWrapper>
            <TagTitle>인기있는 모임</TagTitle>
            {/* {popularClubData.map((item) => {
                <p>{item.clubTitle}</p>
            })} */}
        </TagWrapper>
    );
}

const popularClubData = [
    {
        "clubTitle": "역삼 스터디",
        "location": "강남구",
        "currentPerson": 2,
        "maxPerson": 8,
        "tag": "스터디",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/books_1920.jpg"
    },
    {
        "clubTitle": "잠실 맛집 탐방",
        "location": "송파구",
        "currentPerson": 3,
        "maxPerson": 4,
        "tag": "음식",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/platter_1920.jpg"
    },
    {
        "clubTitle": "노원 트레이너 모임",
        "location": "노원구",
        "currentPerson": 7,
        "maxPerson": 10,
        "tag": "운동",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/gym_1920.jpg"
    },
    {
        "clubTitle": "서초 테니스",
        "location": "서초구",
        "currentPerson": 1,
        "maxPerson": 4,
        "tag": "운동",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/tennis_1920.jpg"
    },
    {
        "clubTitle": "중구 DSLR 모임",
        "location": "중구",
        "currentPerson": 2,
        "maxPerson": 6,
        "tag": "사진",
        "thumbnail":"https://naksam.s3.ap-northeast-2.amazonaws.com/img/camera_1920.jpg"
    },
]