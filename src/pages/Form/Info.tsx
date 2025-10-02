import { motion } from "framer-motion";

function Info() {
  return (
    <div className="px-4 sm:px-6 md:px-8 text-center sm:text-left">
      <motion.hr
        className="my-8 border-t-2 border-brown"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
      />
      <p className="text-sm font-medium text-backgroundComponents sm:text-left">
        Aby stać się częścią naszej platformy i czerpać pełne korzyści z
        obecności w Renovace,{" "}
        <strong>wymagane jest opłacenie subskrypcji.</strong>
      </p>
      <p className="text-sm font-medium py-4 pb-20 text-backgroundComponents sm:text-left">
        Dzięki niej zyskujesz dostęp do szerokiego grona użytkowników, możliwość
        promocji swoich usług lub produktów oraz ekskluzywne narzędzia
        wspierające Twoją działalność.
      </p>
    </div>
  );
}

export default Info;
