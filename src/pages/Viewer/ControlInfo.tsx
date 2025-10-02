import { useState } from "react";
import Button from "../../components/Button/Button";

export default function ControlInfo() {
  const [enableInfo, setEnableInfo] = useState<boolean>(false);

  const info = (
    <div className=" w-1/3 top-14  xl:left-[37%] lg:left-[38%] sm:left-[40%] z-50 rounded justify-center xl:text-xl lg:text-md md:text-sm hidden md:block text-center absolute bg-background border-2 border-brown text-mainColorText">
      <p className="font-bold">Sterowanie:</p>
      <div className="flex flex-col text-start px-4 py-4 gap-4">
        <p className="font-bold">Lewy przycisk myszy:</p>
        <p>Obracanie kamerą</p>
        <p className="font-bold">Prawy przycisk myszy:</p>
        <p> Przesuwanie widoku w poziomie i pionie</p>
        <p className="font-bold">Środkowy przycisk myszy:</p>
        <p> Przybliżanie i oddalanie widoku (zoom)</p>
      </div>
    </div>
  );

  function handleInfo() {
    if (enableInfo == false) {
      setEnableInfo(true);
    } else {
      setEnableInfo(false);
    }
  }

  return (
    <>
      <Button
        className=" w-24 h-8 top-2 left-1/2   z-30 rounded justify-center absolute bg-background border-2 border-brown text-mainColorText hidden md:block"
        onClick={handleInfo}
      >
        Sterowanie
      </Button>
      {enableInfo ? info : undefined}
    </>
  );
}
