import { motion } from "framer-motion";

export default function MediumRoom() {
  return (
    <div className="flex">
      <div className="relative w-40 h-40 bg-transparent border-2 border-background rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute w-28 h-28 border-[6px] border-brown rounded-lg" />

        <motion.div
          className="absolute w-6 h-6 bg-background rounded-full"
          animate={{
            x: [54, 54, -54, -54, 54],
            y: [54, -54, -54, 54, 54],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </div>
  );
}
