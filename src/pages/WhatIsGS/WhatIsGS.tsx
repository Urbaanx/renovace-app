import Footer from "../../components/Footer/Footer";
import NavBarPortal from "../PortalPage/NavbarPortal";
import Background from "./Background";
import Description from "./Description";
import { useEffect } from "react";

function WhatIsGS() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-mainColorText min-h-screen">
      <NavBarPortal />
      <Background />
      <Description />
      <Footer />
    </div>
  );
}

export default WhatIsGS;
