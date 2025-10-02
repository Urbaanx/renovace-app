import { motion } from "framer-motion";

interface ListNavbarProps {
  scrollToAbout: () => void;
  scrollToPortal: () => void;
  scrollToGallery: () => void;
  scrollToContact: () => void;
}

export default function ListNavbar({
  scrollToAbout,
  scrollToPortal,
  scrollToGallery,
  scrollToContact,
}: ListNavbarProps) {
  return (
    <>
      <motion.ul className="flex flex-col sm:flex-row items-center justify-center text-mainColorText space-y-4 sm:space-y-0 sm:space-x-8">
        <motion.li
          className="hover:text-brown  cursor-pointer"
          onClick={scrollToAbout}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          }}
        >
          O aplikacji
        </motion.li>
        <motion.li
          className="hover:text-brown  cursor-pointer"
          onClick={scrollToPortal}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          }}
        >
          Portal
        </motion.li>
        <motion.li
          className="hover:text-brown  cursor-pointer"
          onClick={scrollToGallery}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          }}
        >
          Galeria
        </motion.li>
        <motion.li
          className="hover:text-brown  cursor-pointer"
          onClick={scrollToContact}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          }}
        >
          Kontakt
        </motion.li>
      </motion.ul>
    </>
  );
}
