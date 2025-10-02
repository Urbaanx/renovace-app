import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { svgPathProperties } from "svg-path-properties";

export default function LargeRoom() {
  const path = `M 15,90 A 5 5 0 0 1 10,85 L 10,15 A 5 5 0 0 1 15,10 L 35,10 A 5 5 0 0 1 40,15 L 40,35 A 5 5 0 0 0 45,40 L 55,40 A 5 5 0 0 0 60,35 L 60,15 A 5 5 0 0 1 65,10 L 85,10 A 5 5 0 0 1 90,15 L 90,85 A 5 5 0 0 1 85,90 L 65,90 A 5 5 0 0 1 60,85 L 60,65 A 5 5 0 0 0 55,60 L 45,60 A 5 5 0 0 0 40,65 L 40,85 A 5 5 0 0 1 35,90 L 15,90 Z`;

  const properties = new svgPathProperties(path);
  const totalLength = properties.getTotalLength();

  const t = useMotionValue(0);
  const xRaw = useTransform(t, (latest) =>
    properties.getPointAtLength(latest).x
  );
  const yRaw = useTransform(t, (latest) =>
    properties.getPointAtLength(latest).y
  );

  const x = useTransform(xRaw, (val) => `${val}%`);
  const y = useTransform(yRaw, (val) => `${val}%`);

  useEffect(() => {
    const animation = animate(t, totalLength, {
      duration: 6,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => animation.stop();
  }, [t, totalLength]);

  return (
    <div
      className="flex"
      style={{
        transform: "rotate(90deg)",
        transformOrigin: "center",
      }}
    >
      <div className="relative w-64 h-48 bg-transparent border-2 border-background rounded-lg flex items-center justify-center overflow-hidden">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path} stroke="#C4B7A6" strokeWidth="3" fill="none" />
        </svg>

        <motion.div
          className="absolute w-6 h-6 bg-background rounded-full"
          style={{
            left: x,
            top: y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </div>
    </div>
  );
}
