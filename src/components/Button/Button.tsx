import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  className?: string | undefined | null;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  whileHover?: {
    scale: number;
    transition: {
      type: string;
      stiffness: number;
      damping: number;
    };
  };
}

export default function Button({
  children,
  className = "bg-background text-mainColorText px-14 py-2 rounded shadow-md hover:bg-opacity-80",
  onClick,
  type,
  disabled,
  whileHover,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={className || ""}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={whileHover}
      {...props}
    >
      {children}
    </motion.button>
  );
}
