import backgroundImage from "../../assets/foto_room.png";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Background() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isBackspacing, setIsBackspacing] = useState(false);

  const phrase =
    "Idealny model 3D zaczyna się od dobrego nagrania – zobacz, jak je zrobić!";

  const typingSpeed = 40;
  const eraseSpeed = 30;
  const pauseBetweenTexts = 2000;

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isBackspacing && index < phrase.length) {
          setText((prev) => prev + phrase[index]);
          setIndex((prev) => prev + 1);
        } else if (index === phrase.length) {
          setTimeout(() => setIsBackspacing(true), pauseBetweenTexts);
        } else if (index > 0) {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setTimeout(() => {
            setIsBackspacing(false);
          }, pauseBetweenTexts);
        }
      },
      isBackspacing ? eraseSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [index, isBackspacing, phrase]);

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center text-mainColorText px-4">
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      </div>

      <div className="relative z-10 max-w-6xl">
        <motion.h1
          className="text-5xl font-bold text-mainColorText drop-shadow-lg"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Jak nagrywać, żeby efekt był jak najlepszy?
        </motion.h1>

        <motion.p
          className="text-2xl mt-6 text-mainColorText font-bold"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          {text}
          <span className="cursor-blink">|</span>
        </motion.p>
      </div>
    </div>
  );
}
