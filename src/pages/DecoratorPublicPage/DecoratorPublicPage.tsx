import Footer from "../../components/Footer/Footer";
import NavBarPortal from "../PortalPage/NavbarPortal";
import MainInfo from "./MainInfo";
import RenovationsDecoratorPublic from "./RenovationsDecoratorPublic";
import { useLocation } from "react-router-dom";

function DecoratorPublicPage() {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  return (
    <div className="bg-mainColorText min-h-screen flex flex-col">
      <NavBarPortal />
      <main className="flex-grow">
        <MainInfo id={id ?? undefined}/>
        <RenovationsDecoratorPublic />
      </main>
      <Footer />
    </div>
  );
}

export default DecoratorPublicPage;
