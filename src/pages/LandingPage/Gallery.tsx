import { forwardRef, useRef, useEffect, useState } from "react";
import photo1 from "../../assets/photocarusel1.png";
import photo2 from "../../assets/photocarusel2.png";
import photo3 from "../../assets/photocarusel3.png";
import photo4 from "../../assets/photocarusel4.png";
import photo5 from "../../assets/photocarusel5.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallery = forwardRef<HTMLDivElement>((_, ref) => {
  const sliderRef = useRef<Slider>(null);
  //const [isInteracted, setIsInteracted] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastInteraction > 3000) {
        sliderRef.current?.slickNext();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastInteraction]);

  const handleInteraction = () => {
    setLastInteraction(Date.now());
    //setIsInteracted(true);
    setTimeout(() => {
      /*setIsInteracted(false)*/
    }, 3000);
  };

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: handleInteraction,
    afterChange: handleInteraction,
  };

  return (
    <div
      className="bg-background p-10"
      ref={ref}
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteraction}
    >
      <Slider ref={sliderRef} {...settings}>
        <div>
          <div className="w-[90%] max-w-[350px] mx-auto aspect-[16/9]">
            <img
              src={photo1}
              className="w-full h-full object-cover shadow-md rounded-lg"
              alt="photo1"
            />
          </div>
        </div>
        <div>
          <div className="w-[90%] max-w-[350px] mx-auto aspect-[16/9]">
            <img
              src={photo2}
              className="w-full h-full object-cover shadow-md rounded-lg"
              alt="photo2"
            />
          </div>
        </div>
        <div>
          <div className="w-[90%] max-w-[350px] mx-auto aspect-[16/9]">
            <img
              src={photo3}
              className="w-full h-full object-cover shadow-md rounded-lg"
              alt="photo3"
            />
          </div>
        </div>
        <div>
          <div className="w-[90%] max-w-[350px] mx-auto aspect-[16/9]">
            <img
              src={photo4}
              className="w-full h-full object-cover shadow-md rounded-lg"
              alt="photo4"
            />
          </div>
        </div>
        <div>
          <div className="w-[90%] max-w-[350px] mx-auto aspect-[16/9]">
            <img
              src={photo5}
              className="w-full h-full object-cover shadow-md rounded-lg"
              alt="photo4"
            />
          </div>
        </div>
      </Slider>
    </div>
  );
});

export default Gallery;
