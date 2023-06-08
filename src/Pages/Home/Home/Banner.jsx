import { useEffect } from "react";
import img1 from "../../../assets/banner-1.png";
import img2 from "../../../assets/banner-2.png";
import img3 from "../../../assets/banner-3.png";
import img4 from "../../../assets/banner-4.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  return (
    <div data-aos="fade-up" className="container mx-auto">
      <div className="carousel w-full relative">
        <div id="slide1" className="carousel-item relative w-full">
          <LazyLoadImage src={img1} className="w-full rounded-xl" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <LazyLoadImage src={img2} className="w-full rounded-xl" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <LazyLoadImage src={img3} className="w-full rounded-xl" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <LazyLoadImage src={img4} className="w-full rounded-xl" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="md:absolute top-[420px] md:top-48 ">
        <h1 className="text-center md:text-left ps-5 md:w-1/2">
          <span className="font-extrabold text-[#136F95] text-lg md:text-5xl">
            Discover Endless Fun and Imagination with Our
          </span>
          <span className="font-extrabold py-2 text-[#EC2F8B] text-lg md:text-5xl">
            {" "}
            Language Tutor!
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Banner;
