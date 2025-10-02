import { forwardRef } from "react";
import foto from "../../assets/foto_room.png";
import ClickToStartButton from "./ClickToStartButton";
import PortalSection from "./PortalSection";
import logo from "../../assets/logo.svg";
import { motion } from "framer-motion";

interface ClickToStartProps {
  isMobile: boolean;
}

const ClickToStart = forwardRef<HTMLDivElement, ClickToStartProps>(
  ({ isMobile }, ref) => {
    return (
      <div className="w-full bg-mainColorText flex flex-col items-center">
        <PortalSection ref={ref} />
        <div className="w-full h-auto flex justify-center items-center">
          <img
            src={foto}
            className="w-full h-auto object-cover"
            alt="Room visualization"
          />
        </div>
        <div className="max-w-6xl w-full h-auto p-6 md:p-20 md:px-28 text-lg md:text-xl gap-10 md:gap-40 text-backgroundComponents">
          <motion.div
            className="w-full mb-10 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Otwórz drzwi do wymarzonego wnętrza!
              </h2>
              <p className="mb-4 font-bold">
                Dzięki naszej aplikacji tworzysz idealne wnętrze – krok po
                kroku!
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10 md:gap-20">
            <motion.div
              className="w-full md:w-1/2 pt-4 flex justify-center md:justify-start"
              initial={
                isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, x: -100 }
              }
              whileInView={
                isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center md:text-left">
                <p className="mb-10 text-lg">
                  Stwórz projekt, który nie tylko zachwyca wyglądem, ale także
                  sprawia, że czujesz się jak w domu.
                </p>
                <p className="mb-10 text-lg">
                  Projektowanie jeszcze nigdy nie było tak proste!
                </p>
                <p className="mb-4 font-bold pt-2">
                  Nie czekaj - zacznij już teraz!
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center items-center text-center md:text-left"
              initial={
                isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, x: 100 }
              }
              whileInView={
                isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0 }
              }
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <img src={logo} alt="Logo" className="md:w-40 w-32 mb-4" />
              <ClickToStartButton />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
);

export default ClickToStart;
