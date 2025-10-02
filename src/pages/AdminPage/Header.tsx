import { useState } from "react";
import hamburger from "../../assets/hamburger.svg";
import Menu from "./Menu";

interface HeaderProps {
  headerText: string;
}

function Header({ headerText }: HeaderProps) {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <div
        className={
          "absolute h-dvh top-[104px] z-30 bg-background py-10 border-l border-brown" +
          (menuActive ? " -right-[1px]" : " hidden")
        }
      >
        <Menu current={headerText.toLowerCase()}></Menu>
      </div>
      <div className="text-4xl col-span-8 text-background font-bold bg-mainColorText px-10 flex justify-between">
        <span className="my-auto">{headerText}</span>
        <button
          className="border-2 border-background rounded-md self-end my-auto p-1 xl:hidden"
          onClick={() => {
            setMenuActive(menuActive ? false : true);
          }}
        >
          <img src={hamburger}></img>
        </button>
      </div>
    </>
  );
}

export default Header;
