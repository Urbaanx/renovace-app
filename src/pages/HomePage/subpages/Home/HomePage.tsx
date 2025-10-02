import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "../../../../components/Sidebar/Sidebar";
import Home from "../Home/Home";
import { motion } from "framer-motion";

interface HomePageProps {
  isMobile: boolean;
}

export default function HomePage({ isMobile }: HomePageProps) {
  const { user } = useAuth0();

  return (
    <>
      <SideBar isMobile={isMobile} />
      <motion.div className={`${!isMobile ? "ml-16" : "mb-16"} bg-background`}>
        <Home firstName={user?.given_name} />
      </motion.div>
    </>
  );
}
