import styled from "styled-components";
import Slider from "react-slick";
import "../../../../../node_modules/slick-carousel/slick/slick.css"; 
import "../../../../../node_modules/slick-carousel/slick/slick-theme.css";

export const SliderCustom = styled(Slider)`
    padding: 0.2rem 2.4rem;
`;

export function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display:"block", marginRight:"3rem" }}
        onClick={onClick}
      />
    );
  }
  
export function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display:"block", marginLeft:"3rem" }}
        onClick={onClick}
        />
    );
}