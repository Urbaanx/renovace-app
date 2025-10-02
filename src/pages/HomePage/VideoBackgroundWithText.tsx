import React from "react";
import tloVideo from "../../assets/tlo3.mp4";
import { motion } from "framer-motion";

const VideoBackgroundWithText: React.FC = () => {
  return (
    <motion.div className="relative flex flex-col items-center justify-center h-screen w-full pb-32 bg-background">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover filter blur-md"
        playsInline
      >
        <source src={tloVideo} type="video/mp4" />
      </video>

      <motion.div
        className="absolute top-12 z-20 flex flex-col bg-mainColorText/80 w-11/12 mx-auto p-16 text-center rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <p className="text-lg font-bold text-background">
          Nie masz jeszcze żadnych zapisanych skanów ani projektów, ale to
          świetny moment, żeby zacząć!
        </p>
        <p className="mt-4 text-sm font-semibold text-background">
          Kliknij na przycisk powyżej, aby dodać skan pokoju i zacznij
          projektowanie!
        </p>
      </motion.div>
    </motion.div>
  );
};

export default VideoBackgroundWithText;
