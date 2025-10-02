import { Mode } from "./SplatModel";
import rotationIcon from "../../assets/rotation.svg";
import transitionIcon from "../../assets/transition.svg";
import scaleIcon from "../../assets/scale.svg";
import meshIcon from "../../assets/mesh.svg";
import themeColorPicker from "../../assets/theme_picker.svg";
import ColorPicker from "react-pick-color";
import { useState } from "react";
import Button from "../../components/Button/Button";

interface OptionsProps {
  setMode: (mode: Mode) => void;
  activeMesh: boolean;
  setActiveMesh: (mesh: boolean) => void;
  setColorPicker: (color: string) => void;
  color: string;
}

export default function Options({
  setMode,
  setActiveMesh,
  activeMesh,
  setColorPicker,
  color,
}: OptionsProps) {
  function handleSetActiveMesh() {
    if (activeMesh) {
      setActiveMesh(false);
    } else {
      setActiveMesh(true);
    }
  }

  const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<string>("translate");

  function handleActiveColorPicker() {
    if (activeColorPicker) {
      setActiveColorPicker(false);
    } else {
      setActiveColorPicker(true);
    }
  }

  const colorPicker = (
    <div className="absolute bottom-44 -right-24 w-44 h-44 bg-brown rounded-lg">
      <ColorPicker
        theme={{
          background: "#353229",
          inputBackground: "#434343",
          borderColor: "#BC936F",
          borderRadius: "4px",
          color: "#BC936F",
          width: "320px",
        }}
        color={color}
        onChange={(color) => {
          setColorPicker(color.hex);
          localStorage.setItem("themeBackground", color.hex);
        }}
      />
    </div>
  );

  const icons: { src: string; label: string; mode: Mode }[] = [
    { src: transitionIcon, label: "Translacja", mode: "translate" },
    { src: rotationIcon, label: "Rotacja", mode: "rotate" },
    { src: scaleIcon, label: "Skalowanie", mode: "scale" },
  ];

  return (
    <div className="flex flex-row xl:w-1/6 lg:w-1/4 sm:w-1/3 h-12 xl:bottom-5 lg:bottom-5 md:bottom-15 bottom-20 sm:bottom-15 bg-backgroundComponents  items-center justify-center absolute xl:left-[45%] sm:left-[40%]  z-20 rounded border-2 border-brown">
      <div className="flex flex-row w-full  items-center justify-center gap-2 ">
        <div className="flex flex-row gap-1 items-center">
          {icons.map((icon) => (
            <div
              className="relative flex flex-col items-center group "
              key={icon.mode}
            >
              <Button
                onClick={() => {
                  setActiveMode(icon.mode);
                  setMode(icon.mode);
                }}
                className={`w-9 h-9  flex items-center justify-center  hover:bg-backgroundComponents hover:border-2 border-brown rounded ${
                  activeMode === icon.mode
                    ? "bg-backgroundComponents border-2 border-brown"
                    : "bg-graydark"
                }`}
              >
                <img src={icon.src} />
              </Button>
              <span className="absolute bottom-12 z-50 text-sm text-backgroundComponents bg-brownlight rounded-md px-2 py-1 opacity-0 group-hover:opacity-90">
                {icon.label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[2px] h-8 bg-brown"></div>
        <div className="flex flex-row gap-1">
          <div className="relative flex flex-col items-center group">
            <Button
              onClick={handleSetActiveMesh}
              className={`w-9 h-9  flex items-center justify-center hover:bg-backgroundComponents hover:border-2 border-brown rounded ${
                !activeMesh
                  ? "bg-backgroundComponents border-2 border-brown"
                  : "bg-graydark"
              }`}
            >
              <img src={meshIcon} />
            </Button>
            <span className="absolute bottom-12 z-50 w-24 text-sm text-backgroundComponents bg-brownlight rounded-md px-2 py-1 opacity-0 group-hover:opacity-90">
              Siatka {activeMesh ? "Wł." : "Wył."}
            </span>
          </div>
          <div className="relative flex flex-col items-center group">
            <Button
              onClick={handleActiveColorPicker}
              className={`w-9 h-9  flex items-center justify-center hover:bg-backgroundComponents hover:border-2 border-brown rounded ${
                activeColorPicker
                  ? "bg-backgroundComponents border-2 border-brown"
                  : "bg-graydark"
              }`}
            >
              <img src={themeColorPicker} />
            </Button>
            <span className="absolute bottom-12 z-50 w-24 text-sm text-backgroundComponents bg-brownlight rounded-md px-2 py-1 opacity-0 group-hover:opacity-90">
              Kolor tła
            </span>
          </div>
          {activeColorPicker ? colorPicker : undefined}
        </div>
      </div>
    </div>
  );
}
