import Logo from "../Logo/Logo";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import loginLogo from "../../assets/login-2.svg";
import homeLogo from "../../assets/home.svg";

import { motion } from "framer-motion";

interface SideBarPublicViewerProps {
  isMobile: boolean;
}

export default function SideBarPublicViewer({
  isMobile,
}: SideBarPublicViewerProps) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    localStorage.setItem("postLoginRedirect", "/");
    loginWithRedirect({
      authorizationParams: {
        appState: {
          returnTo: "/dashboard",
        },
      },
    });
  };

  return (
    <motion.nav>
      {/* SideBar */}
      {!isMobile ? (
        <motion.div className="fixed flex flex-col py-3 justify-between place-items-center w-16 h-screen bg-backgroundComponents z-50 border-r-2 border-brown gap-4">
          <div>
            <Link to={`/`}>
              <Logo width="50px" height="50px" />
            </Link>
          </div>
          {!isAuthenticated ? (
            <div>
              <Link to={"/dashboard"}>
                <img
                  src={loginLogo}
                  className="w-10 group-hover:brightness-150"
                  onClick={handleLogin}
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/dashboard"}>
                <img
                  src={homeLogo}
                  className="w-9 group-hover:brightness-150"
                />
              </Link>
            </div>
          )}
        </motion.div>
      ) : (
        /* Mobile Navbar */
        <div className="fixed bottom-0 left-0 w-full h-16 bg-backgroundComponents flex justify-around items-center z-50 shadow-lg border-t-2 border-brown">
          <div>
            <Link to={`/`}>
              <Logo width="50px" height="50px" />
            </Link>
          </div>
          {!isAuthenticated ? (
            <div>
              <Link to={"/dashboard"}>
                <img
                  src={loginLogo}
                  className="w-10 group-hover:brightness-150"
                  onClick={handleLogin}
                />
              </Link>
            </div>
          ) : (
            <div>
              <Link to={"/dashboard"}>
                <img
                  src={homeLogo}
                  className="w-9 group-hover:brightness-150"
                />
              </Link>
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
}
