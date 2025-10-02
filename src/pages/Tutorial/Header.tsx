import { motion } from "framer-motion";

function Header() {
  return (
    <div className="text-background max-w-6xl mx-auto pt-12 px-4 sm:px-6 md:px-8 text-center sm:text-left">
      <motion.h1
        className="md:text-sm font-semibold mb-4"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Chcesz uzyskać dokładny model 3D?
      </motion.h1>
      
      <motion.p
        className="md:text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Zobacz, jak prawidłowo nagrać film!
      </motion.p>

      <motion.p
        className="font-medium md:text-sm"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Aby stworzyć jak najlepszy model 3D Twojego wnętrza lub przedmiotu za
        pomocą Gaussian Splatting, ważne jest odpowiednie nagranie materiału
        wideo.
      </motion.p>

      <motion.p
        className="font-medium md:text-sm mt-4"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Oto kilka prostych zasad, które pozwolą uzyskać najlepszy efekt!
      </motion.p>

      <motion.hr
        className="my-8 w-full border-t-2 border-brown"
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
