import Background from "./Background";
import NavBar from "../PortalPage/NavbarPortal";
import Header from "./Header";
import Tips from "./Tips";
import Animations from "./Animations";
import Tips2 from "./Tips2";
import Incentive from "./Incentive";
import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import PhotoScanTips from "./PhotoScanTips";

function Tutorial() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-mainColorText min-h-screen">
      <NavBar />
      <Background />
      <Header />
      <Tips />
      <Animations />
      <Tips2 />
      <PhotoScanTips />
      <Incentive />
      <Footer />
    </div>
  );
}

export default Tutorial;
