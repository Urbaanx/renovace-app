import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    localStorage.setItem("postLoginRedirect", window.location.pathname);
    loginWithRedirect({
      authorizationParams: {
        appState: {
          returnTo: "/dashboard",
        },
      },
    });
  };

  return (
    <Button
      className="mr-3 text-mainColorText hover:text-brown "
      onClick={handleLogin}
      whileHover={{
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 10,
        },
      }}
    >
      Zaloguj się
    </Button>
  );
};

export default LoginButton;
