import Background from "../LandingPage/Background";
import Footer from "../../components/Footer/Footer";
import NavBar from "../LandingPage/NavBar";
import { useRef } from "react";
import About from "../LandingPage/About";
import Contact from "../LandingPage/Contact";
import Gallery from "../LandingPage/Gallery";
import ClickToStart from "../LandingPage/ClickToStart";
import ScrollToTopButton from "../LandingPage/ScrollToTopButton";
import Comparison from "../LandingPage/Comparison";
import { motion } from "framer-motion";

interface LandingPageProps {
  isMobile: boolean;
}

export default function LandingPage({ isMobile }: LandingPageProps) {
  const moveToAboutRef = useRef<HTMLDivElement>(null);
  const moveToPortalRef = useRef<HTMLDivElement>(null);
  const moveToGalleryRef = useRef<HTMLDivElement>(null);
  const moveToContactRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="w-full h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavBar
        scrollToAbout={() => {
          moveToAboutRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }}
        scrollToPortal={() => {
          moveToPortalRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }}
        scrollToGallery={() => {
          moveToGalleryRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }}
        scrollToContact={() => {
          moveToContactRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }}
      />
      <Background />
      <About ref={moveToAboutRef} isMobile={isMobile} />
      <ClickToStart ref={moveToPortalRef} isMobile={isMobile} />
      <Gallery ref={moveToGalleryRef} />
      <Comparison />
      <Contact ref={moveToContactRef} />
      <Footer />
      <ScrollToTopButton />
    </motion.div>
  );
}
