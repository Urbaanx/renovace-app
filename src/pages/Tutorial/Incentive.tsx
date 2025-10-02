import { motion } from "framer-motion";

function Incentive() {
  return (
    <div className="text-background max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center sm:text-left">
      <motion.h1
        className="md:text-xl font-semibold mb-4"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Gotowy?
      </motion.h1>
      <motion.p
        className="font-medium md:text-sm pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
      >
        Chwyć telefon i nagraj swoje wnętrze, a my przekształcimy je w
        realistyczny model 3D!
      </motion.p>
    </div>
  );
}

export default Incentive;
