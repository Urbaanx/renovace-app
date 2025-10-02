import { useState } from "react";
import { motion } from "framer-motion";
import { usePostApiRenovationShare } from "../../../../api/endpoints/api";
import { PostShare } from "../../../../api/endpoints/api.schemas";
import { memo } from "react";

interface ShareRenovationModalProps {
  onClose: () => void;
  onShare?: (data: { email: string; canEdit: boolean }) => void;
  renovationId: string;
}

function ShareRenovationModal({
  onClose,
  onShare,
  renovationId,
}: ShareRenovationModalProps) {
  const [email, setEmail] = useState("");
  const [canEdit, setCanEdit] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isDisabled = !isValidEmail(email);
  const { mutate: shareRenovation } = usePostApiRenovationShare();

  const handleShare = () => {
    if (isValidEmail(email)) {
      const payload: PostShare = {
        userEmail: email,
        id: renovationId,
        canEdit: canEdit,
      };

      shareRenovation({ data: payload });

      if (onShare) {
        onShare({ email, canEdit });
      }
      onClose();
    } else {
      alert("Niepoprawny adres e-mail");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-mainColorText rounded-2xl p-10 w-full max-w-md relative shadow-lg text-background">
        <button onClick={onClose} className="absolute top-2 right-4 text-lg ">
          ✕
        </button>

        <h2 className="text-base font-bold text-center mb-2">
          Udostępnij renowację
        </h2>
        <p className="text-center text-sm mb-4">
          Chcesz podzielić się postępami w renowacji z innymi?
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
          <label className="block text-xs mb-2 ">
            Wprowadź adres e-mail osoby, której chcesz udostępnić projekt
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

        <div className="mb-2 text-xs">
          Możesz także zaznaczyć opcję, aby umożliwić tej osobie edycję.
        </div>

        <div className="mb-6 border border-background rounded-md p-2 shadow-md pl-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={canEdit}
              onChange={() => setCanEdit(!canEdit)}
              className="form-checkbox h-4 w-4 accent-brown focus:ring-brown"
            />
            <span className="text-xs">Możliwość edytowania</span>
          </label>
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

export default memo(ShareRenovationModal);
