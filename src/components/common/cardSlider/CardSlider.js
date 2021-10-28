import Card from "./Card";
import { SampleNextArrow, SamplePrevArrow, SliderCustom } from "./styled/CardSlider.styled";

export default function CardSlider({ data }) {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    }
    return (
        <div>
            <SliderCustom {...settings}>
            {data && Object.entries(data).map((item) => { return <Card data={item[1]} key={item[1].id} /> })}
            </SliderCustom>
        </div>
    );
}