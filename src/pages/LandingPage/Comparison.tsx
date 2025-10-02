import { ImgComparisonSlider } from "@img-comparison-slider/react";
import stol1 from "../../assets/stol1.png";
import stol2 from "../../assets/stol2.png";
import krzeslo1 from "../../assets/krzeslo1.png";
import krzeslo2 from "../../assets/krzeslo2.png";

export default function Comparison() {
  return (
    <>
      <div className="bg-mainColorText">
        <div className="max-w-6xl mx-auto flex flex-col w-full h-auto px-4 py-10 md:px-28 text-background justify-center">
          <p className="text-xl pb-2 text-center md:text-left">
            EFEKT PRZED I PO
          </p>
          <p className="text-4xl font-bold text-center md:text-left">
            Zobacz jak wyglądają nasze wygenerowane obrazy
          </p>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center md:px-28 pb-14 gap-4">
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
    </>
  );
}
