import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { svgPathProperties } from "svg-path-properties";

export default function LShapedRoom() {
  const path = `
    M 20,20
    Q 20,15 25,15
    L 35,15
    Q 40,15 40,20
    L 40,45
    Q 40,50 45,50
    L 65,50
    Q 70,50 70,55
    L 70,75
    Q 70,80 65,80
    L 25,80
    Q 20,80 20,75
    L 20,25
    Q 20,20 20,20
    Z
  `;

  const outerPath = `
    M 10,10
    Q 10,5 15,5
    L 45,5
    Q 50,5 50,10
    L 50,35
    Q 50,40 55,40
    L 75,40
    Q 80,40 80,45
    L 80,85
    Q 80,90 75,90
    L 15,90
    Q 10,90 10,85
    L 10,15
    Q 10,10 10,10
    Z
  `;

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
    <div className="flex pt-2">
      <div className="relative w-80 h-72 bg-transparent flex items-center justify-center overflow-visible">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={outerPath} stroke="black" strokeWidth="0.5" fill="none" />
          <path d={path} stroke="#C4B7A6" strokeWidth="2" fill="none" />
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
