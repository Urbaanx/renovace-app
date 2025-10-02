import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toogleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toogleVisibility);
    return () => window.removeEventListener("scroll", toogleVisibility);
  }, [toogleVisibility]);

  return (
    <>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8"
          >
            <Button
              onClick={scrollToTop}
              className={`bg-brown text-white p-3 rounded-full shadow-lg hover:bg-mainColorText z-50`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
