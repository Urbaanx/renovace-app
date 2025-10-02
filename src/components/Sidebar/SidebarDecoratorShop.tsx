import Logo from "../Logo/Logo";
import home from "../../assets/home.svg";
import profile from "../../assets/account.svg";
import furniture from "../../assets/furniture.svg";
import renovations from "../../assets/renovations.svg";
import logoutIcon from "../../assets/logout.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import IconButton from "../IconButton/IconButton";
import { motion } from "framer-motion";
import { useGetUserHasRole } from "../../api/endpoints/api";

interface SideBarDecoratorShopProps {
  isMobile: boolean;
}

const BASE_URL = import.meta.env.VITE_AXIOS_BASE_URL_APP;

export default function SideBarDecoratorShop({
  isMobile,
}: SideBarDecoratorShopProps) {
  const { logout } = useAuth0();
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: BASE_URL } });
  };

  const centerAlignedIcons = [
    { src: home, label: "Panel", path: "portal/decorator-shop/dashboard" },
  ];

  const { data: isDecoratorRole, isLoading: isLoadingDecoratorRole } =
    useGetUserHasRole({ role: "Decorator" });
  const { data: isShopRole, isLoading: isLoadingShopRole } = useGetUserHasRole({
    role: "Shop",
  });

  if (isDecoratorRole && !isLoadingDecoratorRole) {
    centerAlignedIcons.push({
      src: renovations,
      label: "Renowacje",
      path: "portal/decorator-shop/renovations",
    });
  }
  if (isShopRole && !isLoadingShopRole) {
    centerAlignedIcons.push({
      src: furniture,
      label: "Meble",
      path: "portal/decorator-shop/furniture",
    });
  }

  const bottomAlignedIcons = [
    { src: profile, label: "Profil", path: "portal/decorator-shop/profile" },
  ];

  return (
    <motion.nav>
      {/* SideBar */}
      {!isMobile ? (
        <motion.div className="fixed flex flex-col py-3 justify-between place-items-center w-16 h-screen bg-backgroundComponents z-50 border-r-2 border-brown gap-4">
          <div className="h-1/6">
            <Link to={`/`}>
              <Logo width="50px" height="50px" />
            </Link>
          </div>
          <div className="flex flex-col  h-full xl:gap-5 md:gap-3  justify-center">
            {centerAlignedIcons.map((icon) => (
              <IconButton
                key={icon.label}
                src={icon.src}
                label={icon.label}
                path={icon.path}
                isLabel={true}
              />
            ))}
          </div>
          <div className="flex flex-col xl:gap-5 md:gap-3  ">
            {bottomAlignedIcons.map((icon) => (
              <IconButton
                key={icon.label}
                src={icon.src}
                label={icon.label}
                path={icon.path}
                isLabel={true}
              />
            ))}
            <div className="relative flex flex-col items-center group ">
              <Button className={null} onClick={handleLogout}>
                <img
                  src={logoutIcon}
                  className="w-9 group-hover:brightness-150"
                />
              </Button>
              <span className="absolute left-full ml-1 top-1/2 -translate-y-1/2 text-sm text-backgroundComponents bg-brownlight rounded-md px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-90 transition-opacity duration-200">
                Wyloguj
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Mobile Navbar */
        <div className="fixed bottom-0 left-0 w-full h-16 bg-backgroundComponents flex justify-around items-center z-50 shadow-lg border-t-2 border-brown">
          <div>
            <Link to={`/`}>
              <Logo width="50px" height="50px" />
            </Link>
          </div>
          {centerAlignedIcons.map((icon) => (
            <IconButton
              key={icon.label}
              src={icon.src}
              label={icon.label}
              path={icon.path}
              isLabel={false}
            />
          ))}
          {bottomAlignedIcons.map((icon) => (
            <div key={icon.label} className="relative group">
              <IconButton
                key={icon.label}
                src={icon.src}
                label={icon.label}
                path={icon.path}
                isLabel={false}
              />
            </div>
          ))}
          <div className="relative group">
            <Button className={null} onClick={handleLogout}>
              <img
                src={logoutIcon}
                className="w-9 group-hover:brightness-150"
              />
            </Button>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
