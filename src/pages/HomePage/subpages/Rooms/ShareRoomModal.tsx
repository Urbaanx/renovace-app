import { useState, memo } from "react";
import { motion } from "framer-motion";
import { usePostApiRoomShare } from "../../../../api/endpoints/api";
import { PostShare } from "../../../../api/endpoints/api.schemas";

interface ShareRenovationModalProps {
  onClose: () => void;
  onShare?: (data: { email: string }) => void;
  roomId: string;
}

function ShareRoomModal({
  onClose,
  onShare,
  roomId,
}: ShareRenovationModalProps) {
  const [email, setEmail] = useState("");

  const { mutate: shareRoom } = usePostApiRoomShare();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleShare = () => {
    if (isValidEmail(email)) {
      const payload: PostShare = {
        userEmail: email,
        id: roomId,
        canEdit: true,
      };

      shareRoom({ data: payload });

      if (onShare) {
        onShare({ email });
      }
      onClose();
    } else {
      alert("Niepoprawny adres e-mail");
    }
  };

  const isDisabled = !isValidEmail(email);

  return (
    <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        className="bg-mainColorText rounded-2xl p-10 w-full max-w-md relative shadow-lg text-background"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <button onClick={onClose} className="absolute top-2 right-4 text-lg">
          ✕
        </button>

        <h2 className="text-base font-bold text-center mb-2">
          Udostępnij pokój
        </h2>
        <p className="text-center text-sm mb-4">
          Chcesz pokazać komuś swój pokój?
        </p>

        <motion.hr
          className="mb-6 mx-auto w-full border-t-1 border-background"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
        />

        <div className="mb-4">
          <label className="block text-xs mb-2 font-light">
            Wprowadź adres e-mail osoby, której chcesz go udostępnić
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jankowalski@gmail.com"
            className="pl-4 mb-2 shadow-md w-full text-xs p-2 border border-background bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-background focus:border-brown"
          />
          {email && !isValidEmail(email) && (
            <p className="text-red-400 text-xs mt-1">
              Niepoprawny adres e-mail
            </p>
          )}
        </div>

        <motion.button
          whileHover={
            !isDisabled
              ? {
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 300, damping: 10 },
                }
              : {}
          }
          onClick={handleShare}
          disabled={isDisabled}
          className={`w-full text-sm py-2 rounded-md border border-brown shadow-lg ${
            isDisabled
              ? "bg-gray-500 text-white cursor-not-allowed"
              : "bg-background text-mainColorText hover:bg-[#4d4842] hover:text-brown"
          }`}
        >
          Udostępnij
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default memo(ShareRoomModal);
