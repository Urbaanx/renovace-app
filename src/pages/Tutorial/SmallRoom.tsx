import { motion } from "framer-motion";

export default function SmallRoom() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-20 h-40 bg-transparent border-2 border-background rounded-lg flex items-center justify-center overflow-hidden">
        <div
          className="absolute w-[6px] bg-brown"
          style={{
            top: "10px",
            bottom: "10px",
          }}
        />

        <motion.div
          className="absolute w-6 h-6 bg-background rounded-full"
          animate={{ y: [60, -60] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
