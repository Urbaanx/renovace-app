import { forwardRef } from "react";
import portalImg from "../../assets/portal.png";
import { Link } from "react-router";
import { motion } from "framer-motion";

const PortalSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="bg-mainColorText">
      <div
        className="mx-auto max-w-6xl flex flex-col w-full h-auto pt-10 sm:pb-32 pb-10 px-4 sm:px-24 text-background lg:items-start items-center lg:text-start text-center"
        ref={ref}
      >
        <motion.p
          className="text-4xl font-bold mx-4 sm:mx-16 mt-10"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Odkryj Nasz Portal
        </motion.p>

        <motion.p
          className="pt-2 text-xl font-semibold mx-4 sm:mx-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Znajdź inspiracje, które pomogą Ci stworzyć wymarzone wnętrze!
        </motion.p>

        <motion.p
          className="pt-16 text-xl font-bold mx-4 sm:mx-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Przeglądaj projekty użytkowników i zobacz, jak fantastyczne efekty
          uzyskali dzięki naszej aplikacji!
        </motion.p>

        <div className="mx-4 flex w-full lg:flex-row flex-col pt-16 gap-14 justify-between items-center lg:text-start text-center">
          <div className="flex flex-row sm:w-full flex-1 justify-center lg:justify-start">
            <motion.img
              src={portalImg}
              className="w-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </div>
          <motion.div
            className="flex flex-col gap-3 sm:w-1/2 w-72 lg:items-start items-center justify-center flex-1"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-bold">Przekonaj się sam!</p>
            <p className="font-semibold text-lg whitespace-normal">
              Kliknij i zobacz, jak inni przekształcili swoje <br></br> wnętrza
              w zaledwie kilka kroków
            </p>

            <motion.div
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
            >
              <Link
                to={"/portal"}
                className="flex text-mainColorText text-base justify-center mt-10 items-center border-2 border-browndark hover:text-brown shadow-lg hover:bg-[#4d4842] transition duration-200 bg-backgroundComponents rounded-[20px] lg:w-96 md:w-80 w-64 h-16"
              >
                Przejdź do Portalu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default PortalSection;
