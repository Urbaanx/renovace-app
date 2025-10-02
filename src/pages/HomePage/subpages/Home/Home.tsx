import Welcome from "../Home/Welcome";
import { motion } from "framer-motion";

interface HomeProps {
  firstName: string | undefined;
}

export default function Home({ firstName }: HomeProps) {
  return (
    <motion.div className="flex flex-col bg-background min-h-screen">
      <Welcome firstName={firstName} />
    </motion.div>
  );
}
