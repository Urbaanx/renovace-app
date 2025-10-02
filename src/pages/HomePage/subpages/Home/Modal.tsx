import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { memo } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-stone-900 bg-opacity-40 z-50">
      <motion.div
        className="bg-mainColorText w-[500px] h-[500px] p-6 rounded-2xl text-mainColorText relative flex flex-col items-center border border-brown shadow-[0_0_10px_rgba(0,0,0,0.1)]"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250 }}
      >
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-background hover:text-background transition"
        >
          <X size={24} />
        </motion.button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default memo(Modal);
