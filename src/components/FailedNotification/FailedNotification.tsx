import failedIcon from "../../assets/fail-icon .svg";
import closeIcon from "../../assets/x.svg";
import Button from "../Button/Button";
import { motion } from "framer-motion";

interface FailedNotificationProps {
  text: string;
  className?: string;
  closeNotification: () => void;
}

export default function FailedNotification({
  text,
  className = "w-78 top-10 sm:right-5 right-5 z-50 rounded justify-center flex flex-row  lg:text-md md:text-sm  absolute bg-background  border-2 border-red-600 text-mainColorText py-2 px-5 gap-5",
  closeNotification,
}: FailedNotificationProps) {
  return (
    <motion.div
      className={className || ""}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, transition: { duration: 1, type: "tween" } }}
      transition={{ duration: 0.5, type: "spring", stiffness: 400 }}
    >
      <img className="w-10" src={failedIcon} />
      <div>
        <p>Błąd!</p>
        <p className="text-graylight">{text}</p>
      </div>
      <Button className={null} onClick={closeNotification}>
        <img className="brightness-200 w-5" src={closeIcon} />
      </Button>
    </motion.div>
  );
}
