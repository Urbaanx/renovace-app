import closeIcon from "../../assets/x.svg";
import succesIcon from "../../assets/success-icon.svg";
import { motion } from "framer-motion";
import Button from "../Button/Button";

interface SuccessNotificationProps {
  text: string;
  className?: string;
  closeNotification: () => void;
}

export default function SuccessNotification({
  text,
  className = "w-78 top-10 sm:right-5 right-5 z-50 rounded justify-center flex flex-row  lg:text-md md:text-sm  absolute bg-background border-2 border-green-500 text-mainColorText py-2 px-5 gap-5",
  closeNotification,
}: SuccessNotificationProps) {
  return (
    <motion.div
      className={className || ""}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 1, type: "tween" } }}
      transition={{ duration: 0.5, type: "spring", stiffness: 400 }}
    >
      <img className="w-8" src={succesIcon} />
      <div>
        <p>Sukces!</p>
        <p className="text-graylight">{text}</p>
      </div>
      <Button className={null} onClick={closeNotification}>
        <img className="brightness-200 w-5" src={closeIcon} />
      </Button>
    </motion.div>
  );
}
