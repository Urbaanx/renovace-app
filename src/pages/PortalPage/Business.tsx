import { motion } from "framer-motion";
import logo from "../../assets/heart-handshake.svg";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Business() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const handleJoinClick = () => {
    localStorage.setItem("wantToJoin", "true");

    if (!isAuthenticated) {
      loginWithRedirect({
        appState: {
          returnTo: "portal/business",
        },
      });
    } else {
      navigate("/portal/business");
    }
  };

  return (
    <div className="text-background max-w-6xl py-2 mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center md:text-left">
      <div className="w-full flex flex-col md:flex-row items-center justify-between relative">
        <div className="max-w-2xl text-center md:text-left ">
          <p className="text-sm font-semibold mt-8">Dołącz do nas!</p>
          <p className="text-xl font-bold mt-4">
            Jesteś dekoratorem wnętrz lub prowadzisz sklep meblowy?
          </p>
          <h1 className="text-base font-medium mt-4 mb-4 max-w-xl">
            Zostań częścią Renovace i dotrzyj do tysięcy użytkowników, którzy
            szukają inspiracji i produktów do swoich wnętrz.
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4 sm:pt-4 relative w-full md:w-auto">
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
            className="relative z-10"
          >
            <button
              onClick={handleJoinClick}
              className="border-2 border-brown bg-background text-mainColorText text-base px-24 mt-4 md:mt-14 md:mr-24 sm:px-16 md:px-28 py-4 rounded-2xl font-medium hover:text-brown hover:bg-[#4d4842] transition-all"
            >
              Dołącz teraz
            </button>
          </motion.div>
          <img
            src={logo}
            className="z-0 w-24 sm:w-32 md:w-[190px] h-auto mt-4 md:absolute md:right-0 md:top-1/2 md:transform md:-translate-y-32"
          />
        </div>
      </div>
      <motion.hr
        className="my-4 w-full border-t-2 border-brown"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
      />
    </div>
  );
}

export default Business;
