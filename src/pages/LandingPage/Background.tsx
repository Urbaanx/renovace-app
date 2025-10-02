import { useState, useEffect } from "react";
import tloVideo from "../../assets/tlo3.mp4";
import { motion } from "framer-motion";

export default function Background() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isBackspacing, setIsBackspacing] = useState(false);

  const phrases = [
    "zaprojektuj z nami swoją przestrzeń",
    "stwórz idealne wnętrze",
    "skanuj, projektuj, podziwiaj",
    "zobacz swoje wnętrze w nowej odsłonie",
  ];

  const typingSpeed = 70;
  const eraseSpeed = 30;
  const pauseBetweenTexts = 2000;

  useEffect(() => {
    if (!isBackspacing) {
      if (index < phrases[currentPhraseIndex].length) {
        const timeout = setTimeout(() => {
          setText((prev) => prev + phrases[currentPhraseIndex][index]);
          setIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setIsBackspacing(true);
        }, pauseBetweenTexts);
      }
    } else {
      if (index > 0) {
        const timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, eraseSpeed);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setIsBackspacing(false);
          setCurrentPhraseIndex((prev) =>
            prev === phrases.length - 1 ? 0 : prev + 1
          );
          setIndex(0);
        }, pauseBetweenTexts);
      }
    }
  }, [index, currentPhraseIndex, isBackspacing, phrases]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center pointer-events-none">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover filter blur pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={tloVideo} type="video/mp4" />
      </video>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.h1
          className="md:text-8xl text-6xl font-bold drop-shadow-lg text-background"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Renovace
        </motion.h1>
        <p
          className="md:text-2xl mt-6 text-mainColorText font-bold"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          {text}
          <span className="cursor-blink">|</span>
        </p>
      </div>
    </div>
  );
}
