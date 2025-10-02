import { useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Business from "./Business";
import ClickToStart from "./ClickToStart";
import FurnitureCollection from "./FurnitureCollection";
import Header from "./Header";
import NavBarPortal from "./NavbarPortal";
import RenovationsCollection from "./RenovationsCollection";

export default function Portal() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-mainColorText">
      <NavBarPortal />
      <main className="flex-grow">
        <Header />
        <RenovationsCollection />
        <FurnitureCollection />
        <Business />
        <ClickToStart />
      </main>
      <Footer />
    </div>
  );
}
