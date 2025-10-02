import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import NavBar from "./NavbarForm";
import SelectRole from "./SelectRole";
import FormShop from "./FormShop";
import FormDecorator from "./FormDecorator";
import Benefits from "./Benefits";
import Info from "./Info";
import Footer from "../../components/Footer/Footer";

const Form = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-mainColorText">
      <NavBar />
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto">
          <Header />
          <SelectRole onRoleChange={handleRoleChange} />
          <div className="h-8" />

          {!selectedRole ? (
            <motion.div
              className="flex justify-center max-w-lg mx-auto"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: selectedRole ? 200 : 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Benefits />
            </motion.div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 px-10">
              <motion.div
                className="w-full md:w-1/2"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {selectedRole === "furnitureStore" && <FormShop />}
                {selectedRole === "interiorDesigner" && <FormDecorator />}
              </motion.div>

              <motion.div
                className="w-full md:w-1/2"
                initial={{ x: -270 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Benefits />
              </motion.div>
            </div>
          )}
          <Info />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Form;
