import { forwardRef } from "react";
import { motion } from "framer-motion";

const Contact = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section
      className="bg-background text-mainColorText py-16 px-4 md:px-8"
      ref={ref}
    >
      <div className="max-w-6xl mx-auto text-center md:text-left">
        {/* Nagłówek */}
        <motion.div
          className="mb-8 md:mb-12 md:mx-40 text-center md:text-left"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs md:text-sm uppercase tracking-widest text-mainColorText mb-2 md:mb-4">
            Skontaktuj się z nami
          </p>
          <h2 className="text-2xl md:text-4xl font-bold">Masz pytania?</h2>
          <h2 className="text-2xl md:text-4xl font-bold">
            Pozwól nam na nie odpowiedzieć!
          </h2>
        </motion.div>

        {/* Sekcja treści */}
        <div className="grid grid-cols-1 gap-8 md:gap-16 md:mx-40">
          {/* Informacje kontaktowe */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h1 className="text-xl md:text-2xl font-bold mb-4">Renovace</h1>
            <p className="text-sm md:text-base mb-2">
              e-mail: renovaceapp@gmail.com
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
