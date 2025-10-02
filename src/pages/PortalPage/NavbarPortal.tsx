import { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import LoginButton from "../../components/Auth0/LoginButton";
import RegisterButton from "../../components/Auth0/RegisterButton";
import Button from "../../components/Button/Button";
import { Link, redirect } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../../components/Auth0/LogoutButton";

export default function NavBarPortal() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const auth0 = useAuth0();

  const BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL_APP;

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    localStorage.setItem("postLoginRedirect", window.location.pathname);
    loginWithRedirect({
      authorizationParams: {
        appState: {
          redirectTo: "/dashboard",
        },
      },
    });
  };

  const handleRegister = () => {
    if (isAuthenticated) {
      logout();
    }
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        redirectUri: `${BASE_URL}portal/decorator-shop/dashboard`,
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 ${
        isScrolled
          ? "bg-backgroundComponents shadow-lg"
          : "bg-backgroundComponents"
      } border-b border-brown flex items-center justify-between px-4 sm:px-10 z-50 transition duration-300`}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <Logo width="50px" height="50px" />
        <p className="font-bold text-xl sm:text-3xl ml-2 sm:ml-10 text-mainColorText">
          Renovace
        </p>
      </div>

      {/* Desktop Navigation */}
      <div className=" hidden  lg:flex items-center justify-center">
        <ul className="flex flex-col sm:flex-row items-center justify-center text-mainColorText space-y-4 sm:space-y-0 sm:space-x-8">
          <li className="hover:text-brown  cursor-pointer">
            <Link to={"/"}>Strona Główna</Link>
          </li>
        </ul>
        {/* <ListNavbar
          scrollToAbout={scrollToAbout}
          scrollToGallery={scrollToGallery}
          scrollToContact={scrollToContact}
        /> */}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        {auth0.isAuthenticated && (
          <div className="mr-4 flex">
            <LogoutButton  className="
                inline-block px-3 py-2
                bg-backgroundComponents text-mainColorText
                 text-base
                rounded-md cursor-pointer
                transition duration-300 ease-in-out
                hover:text-brown
              "/>
            <Button
              className="
                  text-backgroundComponents
                  bg-brown
                  ml-5
                  inline-block px-6 py-2
                  border-2 border-brown
                  font-semibold text-lg
                  rounded-md cursor-pointer
                  transition duration-300 ease-in-out
                  hover:text-mainColorText
                  hover:bg-background
                  shadow-md
                  custom-box-shadow
                "
            >
              <Link to="/portal/decorator-shop/dashboard">Zarządzaj</Link>
            </Button>
          </div>
        )}
        {!auth0.isAuthenticated && (
          <>
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
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <Button
          className="text-mainColorText focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute  top-16 left-0 w-full bg-backgroundComponents border-t  border-brown text-center  py-4 z-40">
          <ul className="flex flex-col sm:flex-row items-center justify-center text-mainColorText space-y-4 sm:space-y-0 sm:space-x-8">
            <li className="hover:text-brown  cursor-pointer">
              <Link to={"/"}>Strona Główna</Link>
            </li>
          </ul>
          {/* <ListNavbar
            scrollToAbout={() => {
              scrollToAbout();
              setIsMobileMenuOpen(false);
            }}
            scrollToGallery={() => {
              scrollToGallery();
              setIsMobileMenuOpen(false);
            }}
            scrollToContact={() => {
              scrollToContact();
              setIsMobileMenuOpen(false);
            }}
          /> */}
          <div className="flex justify-around mt-4">
            {auth0.isAuthenticated && (
              <div className="mr-4 flex">
                <LogoutButton />
                <Button
                  className="
                  text-backgroundComponents
                  bg-brown
                  ml-5
                  inline-block px-6 py-2
                  border-2 border-brown
                  font-semibold text-lg
                  rounded-md cursor-pointer
                  transition duration-300 ease-in-out
                  hover:text-mainColorText
                  hover:bg-background
                  shadow-md
                  custom-box-shadow
                "
                >
                  <Link to="/portal/decorator-shop/dashboard">Zarządzaj</Link>
                </Button>
              </div>
            )}
            {!auth0.isAuthenticated && (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
