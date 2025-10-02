import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

const RegisterButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL_APP;

  const handleRegister = () => {
    if (isAuthenticated) {
      logout();
    }
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        redirectUri: `${BASE_URL}dashboard`,
      },
    });
  };
  return (
    <Button
      className="
  inline-block px-4 py-2 
  bg-backgroundComponents text-mainColorText 
  border-2 border-brown 
  font-semibold text-lg 
  rounded-md cursor-pointer 
  hover:text-brown
  shadow-md
"
      style={{
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)",
      }}
      onClick={handleRegister}
      whileHover={{
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      }}
    >
      Zarejestruj się
    </Button>
  );
};

export default RegisterButton;
