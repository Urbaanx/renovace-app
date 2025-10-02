import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";
import searchIcon from "../../assets/search.svg";

function Header({
  onSearch,
}: {
  onSearch: (query: string, type: "name" | "author") => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"name" | "author">("name");

  useEffect(() => {
    onSearch(searchQuery, searchType);
  }, [searchQuery, searchType]);

  return (
    <div className="text-background max-w-6xl mx-auto pt-16 px-4 sm:px-6 md:px-8 flex flex-col items-center text-center md:text-left">
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold mt-8">
            Nie wiesz, od czego zacząć?
          </p>
          <h1 className="text-xl md:text-2xl font-bold mt-2">
            Znajdź gotowe metamorfozy lub konkretne style wnętrz, którymi możesz
            się zainspirować!
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-auto flex-grow">
              <input
                type="text"
                placeholder="Szukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pr-10 bg-transparent border border-background rounded-lg focus:outline-none focus:ring-2 focus:ring-brown"
              />
              <img
                src={searchIcon}
                alt="Search"
                className="absolute right-3 top-3.5 w-5 h-5 pointer-events-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Wyszukaj po:</span>
              <select
                className="border border-background rounded-lg px-1 py-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brown"
                value={searchType}
                onChange={(e) =>
                  setSearchType(e.target.value as "name" | "author")
                }
              >
                <option value="name">nazwie</option>
                <option value="author">autorze</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:ml-8">
          <img
            src={logo}
            className="w-[200px] h-auto mt-8 md:mr-6"
            alt="Room visualization"
          />
        </div>
      </div>

      <motion.hr
        className="my-8 w-full border-t-2 border-brown"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
      />
    </div>
  );
}

export default Header;
