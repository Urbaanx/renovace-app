import { forwardRef } from "react";
import { motion } from "framer-motion";
import scanImage from "../../assets/scan.png";
import designImage from "../../assets/design.png";
import admireImage from "../../assets/admire.png";

interface AboutProps {
  isMobile: boolean;
}

const About = forwardRef<HTMLDivElement, AboutProps>(({ isMobile }, ref) => {
  return (
    <section className="bg-background text-mainColorText py-16" ref={ref}>
      <div className="max-w-6xl mx-auto text-center md:text-left">
        {/* Nagłówek */}
        <motion.div
          className="mb-12 md:mx-40"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <p className="text-xs md:text-sm uppercase tracking-widest text-mainColorText mb-2 md:mb-4 font-bold">
            Dowiedz się więcej
          </p>
          <h2 className="text-2xl md:text-4xl font-bold">
            Jak działa nasza aplikacja?
          </h2>
        </motion.div>

        {/* Sekcja treści */}
        <div className="grid grid-cols-1 gap-12 md:gap-16 md:mx-40">
          {/* Skanuj */}
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-start gap-4"
            initial={
              isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, x: -100 }
            }
            whileInView={
              isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0 }
            }
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={scanImage} className="w-16 md:w-24" alt="Scan" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                Skanuj
              </h3>
              <p className="text-sm md:text-base text-mainColorText">
                Zeskanuj swoje wnętrze i zobacz je w nowym świetle! Nasz model
                3D pozwoli Ci rozpocząć projektowanie bez wysiłku.
              </p>
            </div>
          </motion.div>

          {/* Projektuj */}
          <motion.div
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-4"
            initial={
              isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, x: 100 }
            }
            whileInView={
              isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0 }
            }
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                Projektuj
              </h3>
              <p className="text-sm md:text-base text-mainColorText">
                Baw się kolorami i meblami, tworząc unikalne aranżacje. Twoje
                pomysły zyskają nowy wymiar dzięki intuicyjnym narzędziom.
              </p>
            </div>
            <img src={designImage} className="w-16 md:w-24" alt="Design" />
          </motion.div>

          {/* Podziwiaj */}
          <motion.div
            className="flex flex-col md:flex-row items-center md:items-start gap-4"
            initial={
              isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, x: -100 }
            }
            whileInView={
              isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0 }
            }
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <img src={admireImage} className="w-16 md:w-24" alt="Admire" />
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">
                Podziwiaj
              </h3>
              <p className="text-sm md:text-base text-mainColorText">
                Podziwiaj swoje dzieło w realistycznym podglądzie. Stwórz
                przestrzeń, która będzie zachwycać każdego dnia!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default About;
