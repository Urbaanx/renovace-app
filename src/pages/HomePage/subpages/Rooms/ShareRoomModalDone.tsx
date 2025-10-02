import { motion } from "framer-motion";
import { memo } from "react";

interface ShareRoomModalDoneProps {
  onClose: () => void;
}

function ShareRoomModalDone({ onClose }: ShareRoomModalDoneProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-mainColorText rounded-2xl p-10 w-full max-w-md relative shadow-lg text-background text-center">
        <button onClick={onClose} className="absolute top-2 right-4 text-lg">
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-2">Gotowe!</h2>

        <motion.hr
          className="mb-4 mx-auto w-1/2 border-t border-background"
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 0.6 }}
        />

        <p className="mb-6 text-sm font-medium">
          Pokój został udostępniony podanemu użytkownikowi
        </p>
        <p className="mb-6 text-xs font-semibold">
          Możesz teraz zamknąć to okno.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
          onClick={onClose}
          className="w-full text-sm py-2 rounded-md border border-brown shadow-lg bg-background text-mainColorText hover:bg-[#4d4842] hover:text-brown"
        >
          Zamknij
        </motion.button>
      </div>
    </div>
  );
}

export default memo(ShareRoomModalDone);
