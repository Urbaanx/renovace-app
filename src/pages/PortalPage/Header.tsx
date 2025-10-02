import logo from "../../assets/logo.svg";
import { motion } from "framer-motion";

function Header() {
  return (
    <div className=" text-background max-w-6xl mx-auto pt-16 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center md:text-left">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl">
          <p className="text-2xl font-bold mt-8">
            Zobacz, jak inni odmienili swoje wnętrza!
          </p>
          <h1 className="text-base font-medium mt-4">
            Dzięki Renovace każda zmiana staje się łatwa, przyjemna i pełna
            inspiracji!
          </h1>
        </div>
        <div className="mt-8 md:mt-0 md:ml-8">
          <img src={logo} className="w-[120px] h-auto mt-8 md:mr-6" />
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

export default Header;
