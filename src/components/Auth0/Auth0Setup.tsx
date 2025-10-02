import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

interface Auth0SetupProps {
  children: React.ReactNode;
}

export default function Auth0Setup({ children }: Auth0SetupProps) {
  const navigate = useNavigate();

  const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
  const CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE;
  return (
    <Auth0Provider
      domain={DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: AUDIENCE,
        scope:
          "openid profile email read:users update:users create:user_tickets",
      }}
      onRedirectCallback={(appState) => {
        if (appState?.returnTo) {
          navigate(appState.returnTo, { replace: true });
        } else {
          const path = localStorage.getItem("postLoginRedirect");

          if (path && path !== "/") {
            navigate(path, { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
}
