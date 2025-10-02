import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FurnitureCardCarousel from "./FurnitureCardCarousel";

function FurnitureCollection() {
  const navigate = useNavigate();

  return (
    <div className="text-background max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center text-center md:text-left">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div>
          <p className="text-lg font-bold mt-8">
            Nie wiesz, jakie meble wybrać?
          </p>
          <h1 className="text-base font-medium mt-4">
            Przeglądaj kolekcje mebli w najlepszych sklepach i znajdź te idealne
            dla siebie!
          </h1>
        </div>
      </div>

      <FurnitureCardCarousel />

      <div className="w-full flex justify-end mt-4">
        <button
          onClick={() => navigate("/portal/furniture")}
          className="text-background font-semibold underline"
        >
          Zobacz więcej
        </button>
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

export default FurnitureCollection;
