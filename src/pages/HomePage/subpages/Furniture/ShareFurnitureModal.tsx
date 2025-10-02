import { useState } from "react";
import { motion } from "framer-motion";
import { usePostApiObjectShare } from "../../../../api/endpoints/api";
import { PostShare } from "../../../../api/endpoints/api.schemas";
import { memo } from "react";

interface ShareRenovationModalProps {
  onClose: () => void;
  onShare?: (data: { email: string }) => void;
  furnitureId: string;
}

function ShareFurnitureModal({
  onClose,
  onShare,
  furnitureId,
}: ShareRenovationModalProps) {
  const [email, setEmail] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const { mutate: shareFurniture } = usePostApiObjectShare();

  const handleShare = () => {
    if (isValidEmail(email)) {
      const payload: PostShare = {
        userEmail: email,
        id: furnitureId,
        canEdit: true,
      };

      shareFurniture({ data: payload });

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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-mainColorText rounded-2xl p-10 w-full max-w-md relative shadow-lg text-background">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-lg"
          aria-label="Zamknij modal"
        >
          ✕
        </button>

        <h2 className="text-base font-bold text-center mb-2">
          Udostępnij mebel
        </h2>
        <p className="text-center text-sm mb-4">
          Chcesz pokazać ten mebel komuś innemu?
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
      </div>
    </div>
  );
}

export default memo(ShareFurnitureModal);
