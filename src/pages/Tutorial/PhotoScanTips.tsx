import { motion } from "framer-motion";

function PhotoScanTips() {
  return (
    <div className="text-background max-w-6xl mx-auto px-4 sm:px-6 md:px-8 sm:text-left">
      <motion.h2
        className="md:text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        📸 Skany za pomocą zdjęć
      </motion.h2>

      <motion.p
        className="mb-6 font-medium text-base"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Jeśli chodzi o robienie skanów przy pomocy zdjęć to cały proces wygląda
        bardzo podobnie do robienia filmu. Tyle, że trzeba pod uwagę brać:
      </motion.p>

      <motion.ol
        className="list-decimal pl-5 space-y-6 font-medium text-sm"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.li
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Rozdzielczość zdjęć musi być proporcjonalna do ich ilości.
          <ul className="list-disc pl-5 mt-2">
            <li>
              tzn. jeśli planujemy zrobić skan małego pomieszczenia to może to
              być nawet 4k.
            </li>
          </ul>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Przed wykonaniem zdjęcia koniecznie upewniamy się, że złapało focus,
          każde tak wykonane zdjęcie idzie do COLMAP, także zdjęcia nie mogą być
          rozmazane.
          <ul className="list-disc pl-5 mt-2 text-sm">
            <li>
              tzn. jeśli planujemy zrobić skan małego pomieszczenia to może to
              być nawet 4k.
            </li>
          </ul>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Podążając wytyczoną ścieżką - zdjęcie robimy co około sekundę, ale co
          dwie też nie powinno być źle, ten aspekt też można by dodać do
          proporcji rozdzielczości zdjęć do ich ilości.
          <ul className="list-disc pl-5 mt-2">
            <li>
              tzn. że jeśli chcemy zrobić bardzo dobry jakościowo model nieco
              większej przestrzeni, to możemy robić zdjęcia 4k, ale robić je
              rzadziej (co 2-3 sekundy)
            </li>
          </ul>
        </motion.li>

        <motion.li
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Chyba najważniejszą i najbardziej fundamentalną zasadą żeby COLMAP
          dobrze zmatchował zdjęcia, to żeby zdjęcia wykonywane po sobie miały
          mniej więcej 75% pokrycia, tzn. w 75% powinny przedstawiać ten sam
          fragment pokoju, w ten sposób mamy pewność że każdy objęty fragment
          pokoju jest na co najmniej 3 zdjęciach.
        </motion.li>
      </motion.ol>

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

export default PhotoScanTips;
