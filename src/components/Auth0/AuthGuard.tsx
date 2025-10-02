import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../api/axiosInstance";
import { Outlet } from "react-router-dom";
import Logo from "../Logo/Logo";
import { AnimatePresence, motion } from "framer-motion";
import type { AxiosRequestHeaders } from "axios";

export default function AuthGuard() {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = instance.interceptors.request.use(async (config) => {
      const headers = config.headers as AxiosRequestHeaders;

      try {
        const token = await getAccessTokenSilently();
        headers.Authorization = `Bearer ${token}`;
        //console.log("Token:\n" + token);
      } catch (error) {
        console.error("Error getting token", error);
      }

      return {
        ...config,
        headers,
      };
    });

    return () => {
      instance.interceptors.request.eject(interceptorId);
    };
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect({
        authorizationParams: {
          appState: {
            returnTo: "/business",
          },
        },
      });
    }
  }, [isLoading, isAuthenticated, navigate, loginWithRedirect]);

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div className="flex flex-col bg-background w-screen h-screen place-content-center place-items-center">
          <motion.div
            animate={{
              opacity: [1, 0.6, 1],
              scale: [1, 0.95, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Logo width="250px" height="250px" />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen "
    >
      <Outlet />
    </motion.div>
  );
}
