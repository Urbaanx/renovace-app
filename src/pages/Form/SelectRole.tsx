import { useState } from "react";
import { motion } from "framer-motion";

interface SelectRoleProps {
  onRoleChange: (role: string) => void;
}

function SelectRole({ onRoleChange }: SelectRoleProps) {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div className="text-backgroundComponents max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center sm:text-left">
      <h1 className="md:text-2xl font-bold mb-4">
        Jesteś dekoratorem wnętrz czy właścicielem sklepu meblowego?
      </h1>
      <p className="md:text-m mb-6">Wybierz odpowiednią opcję:</p>
      <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 items-center sm:items-start">
        <label
          className={`hover:cursor-pointer flex items-center space-x-2 p-4 border-2 rounded shadow-lg transition-colors duration-300 ${
            selectedRole === "interiorDesigner"
              ? "border-background"
              : "border-browndark"
          }`}
        >
          <input
            type="radio"
            name="role"
            checked={selectedRole === "interiorDesigner"}
            onChange={() => handleRoleChange("interiorDesigner")}
            className="h-4 w-4"
          />
          <span>Dekorator wnętrz</span>
        </label>

        <label
          className={`hover:cursor-pointer flex items-center space-x-2 p-4 rounded shadow-lg border-2 transition-colors duration-300 ${
            selectedRole === "furnitureStore"
              ? "border-background"
              : "border-browndark"
          }`}
        >
          <input
            type="radio"
            name="role"
            checked={selectedRole === "furnitureStore"}
            onChange={() => handleRoleChange("furnitureStore")}
            className="h-4 w-4"
          />
          <span>Sklep meblowy</span>
        </label>
      </div>
      <motion.hr
        className="my-8 border-t-2 border-brown"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
      />
    </div>
  );
}

export default SelectRole;
