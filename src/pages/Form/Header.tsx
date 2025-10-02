import { motion } from "framer-motion";

function Header() {
  return (
    <div className="text-backgroundComponents max-w-6xl mx-auto pt-32 px-4 sm:px-6 md:px-8 text-center sm:text-left">
      <h1 className="md:text-2xl font-bold mb-4">
        Dołącz do Renovace – Rozwiń swoją działalność!
      </h1>
      <p className="md:text-m font-semibold mb-6">
        Chcemy, abyś stał się częścią naszej platformy, dzięki której dotrzesz
        do tysięcy użytkowników szukających inspiracji <br /> oraz produktów do
        swoich wnętrz.
      </p>
      <p className="md:text-m">
        Niezależnie od tego, czy jesteś dekoratorem wnętrz, czy właścicielem
        sklepu meblowego – mamy dla Ciebie idealne miejsce!
      </p>
      <motion.hr
        className="my-8 border-t-2 border-brown"
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
