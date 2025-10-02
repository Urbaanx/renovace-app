import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button";
import { motion } from "framer-motion";

export default function ClickToStartButton() {
  const { loginWithRedirect } = useAuth0();

  const BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL_APP;

  const handleLogin = async () => {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${BASE_URL}dashboard`,
      },
    });
  };

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 300, damping: 10 },
        }}
      >
        <Button
          className="text-mainColorText border-2 border-browndark shadow-lg hover:bg-[#4d4842] hover:text-brown transition duration-200 bg-backgroundComponents rounded-[20px] md:w-96 w-72 h-16 text-lg"
          onClick={handleLogin}
        >
          Kliknij aby rozpocząć
        </Button>
      </motion.div>
    </>
  );
}
