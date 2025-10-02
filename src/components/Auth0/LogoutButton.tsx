import { useAuth0 } from "@auth0/auth0-react";
import Button from "../Button/Button";

interface LogoutButtonProps{
  className?: string;
}

const LogoutButton = ({className="inline-block px-6 py-2 bg-backgroundComponents text-mainColorText border-2 border-brown font-semibold text-lg rounded-md cursor-pointer transition duration-300 ease-in-outhover:text-brown shadow-mdcustom-box-shadow"}: LogoutButtonProps) => {
  const { logout } = useAuth0();

  const BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL_APP;

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: BASE_URL } });
  };

  return (
    <div className="flex mt-0 ml-10">
      <Button
        className={className}
        onClick={handleLogout}
      >
        Wyloguj się
      </Button>
    </div>
  );
};

export default LogoutButton;
