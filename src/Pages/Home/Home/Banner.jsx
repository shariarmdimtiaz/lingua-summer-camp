import { useContext, useEffect } from "react";
import img1 from "../../../assets/banner-1.png";
import img2 from "../../../assets/banner-2.png";
import img3 from "../../../assets/banner-3.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ThemeContext } from "../../../Providers/ThemeProvider";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const Banner = () => {
  const { containerStyles } = useContext(ThemeContext);
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  return (
    <div style={containerStyles}>
      <div data-aos="fade-up" className="container mx-auto">
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false} // should stop playing on user interaction
          interval={6000}
        >
          <div data-src={img1} />
          <div data-src={img2} />
          <div data-src={img3} />
        </AutoplaySlider>
      </div>
    </div>
  );
};

export default Banner;
