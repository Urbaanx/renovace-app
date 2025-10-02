import { ImgComparisonSlider } from "@img-comparison-slider/react";
import stol1 from "../../assets/stol1.png";
import stol2 from "../../assets/stol2.png";
import krzeslo1 from "../../assets/krzeslo1.png";
import krzeslo2 from "../../assets/krzeslo2.png";

export default function ComparisonGS() {
  return (
    <div className="bg-mainColorText">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <ImgComparisonSlider className="shadow-lg w-[90%] md:w-[70%] focus:outline-none mx-auto hover:cursor-pointer">
            <img
              slot="first"
              src={stol1}
              className="w-full h-full object-fill rounded-lg focus:outline-none"
              alt="Before"
            />
            <img
              slot="second"
              src={stol2}
              className="w-full h-full object-fill rounded-lg focus:outline-none"
              alt="After"
            />
          </ImgComparisonSlider>

          <ImgComparisonSlider className="shadow-lg w-[90%] md:w-[70%] focus:outline-none mx-auto hover:cursor-pointer">
            <img
              slot="first"
              src={krzeslo1}
              className="w-full h-full object-fill rounded-lg focus:outline-none"
              alt="Before"
            />
            <img
              slot="second"
              src={krzeslo2}
              className="w-full h-full object-fill rounded-lg focus:outline-none"
              alt="After"
            />
          </ImgComparisonSlider>
        </div>
      </div>
    </div>
  );
}
