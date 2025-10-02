import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {
  const { isAuthenticated } = useAuth0();
  const [path, setPath] = useState<string>("/");

  useEffect(() => {
    if (isAuthenticated) {
      setPath("/dashboard");
    } else {
      setPath("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col bg-background place-items-center w-screen h-screen text-center py-48 text-brownlight gap-10">
      <p className="text-9xl">404</p>
      <p className="text-2xl">Not Found</p>
      <Link
        to={path}
        className="px-3 py-3 w-52 bg-brown text-white rounded-lg hover:bg-opacity-90"
      >
        Wróć do strony głównej
      </Link>
    </div>
  );
}
