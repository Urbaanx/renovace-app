import Footer from "../../components/Footer/Footer";
import NavBarPortal from "../PortalPage/NavbarPortal";
import FurnitureShopPublic from "./FurnitureShopPublic";
import MainInfo from "./MainInfo";
import { useLocation } from "react-router-dom";

function ShopPublicPage() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  return (
    <div className="bg-mainColorText min-h-screen flex flex-col">
      <NavBarPortal />
      <main className="flex-grow">
        <MainInfo id={id ?? undefined}/>
        <FurnitureShopPublic />
      </main>
      <Footer />
    </div>
  );
}

export default ShopPublicPage;
