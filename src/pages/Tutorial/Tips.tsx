import { motion } from "framer-motion";

function Tips() {
  return (
    <div className="text-background max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:text-left">
      <motion.h2
        className="md:text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        🎥 Ogólne zasady nagrywania:
      </motion.h2>

      <motion.ul
        className="list-disc pl-5 space-y-4 font-medium text-sm"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skan wykonuj kamerą z jak najlepszą rozdzielczością (może być 30 FPS
          lub mniej)
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skan wykonuj kamerą z przybliżeniem poniżej 1x (nagranie szerokokątne)
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skan wykonuj w trybie horyzontalnym, trzymając telefon poziomo.
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skan ogólny i obwodowy wykonuj trzymając telefon prostopadle do
          podłoża. (skany suplementarne nie muszą być prostopadłe)
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Poruszaj się i urządzenie w bardzo powolnym tempie. Najlepiej odpalić
          jakąś muzykę dla łatwiejszego utrzymania tempa lub liczyć kroki.
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          W przypadku obrotów poruszaj się dwa razy wolniej w porównaniu do
          ruchu w linii prostej.
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Staraj się unikać chodzenia po łuku, w slalomie i okręgu zakręcaj w
          kącie prostym, ale obracaj się powoli.
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Staraj się unikać nagrywania miejsc bez cech charakterystycznych (np.
          nagrywanie więcej niż 5 sekund pustej ściany) (COLMAP może tego nie
          złapać)
        </motion.li>
      </motion.ul>

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

export default Tips;
