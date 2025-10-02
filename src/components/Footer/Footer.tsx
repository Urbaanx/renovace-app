import ListFooter from "../../pages/LandingPage/ListFooter";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <footer className="relative w-full bg-backgroundComponents border-t border-solid border-brown text-mainColorText">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between py-2">
        {/* List */}
        <div className="w-full text-center">
          <ListFooter />
        </div>

        {/* Logo */}
        <div className="flex justify-center md:justify-end mt-4 md:mt-0">
          <Logo width="50px" height="50px" />
        </div>
      </div>
    </footer>
  );
}
