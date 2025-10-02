import TextInput from "../TextInput/TextInput";
import filterIcon from "../../assets/filter.svg";
import sortAscIcon from "../../assets/sort.svg";
import sortDscIcon from "../../assets/sort-dsc.svg";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import { motion, AnimatePresence } from "framer-motion";

interface SortAndFilterBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  sortByAsc: boolean;
  setSortByAsc: (flag: boolean) => void;
  sortByCol: string;
  setSortByCol: (option: string) => void;
  sortOptions: Array<{
    name: string;
    sortBy: string;
  }>;
  generatedFilterLower: string;
  setGeneratedFilterLower: (date: string) => void;
  generatedFilterUpper: string;
  setGeneratedFilterUpper: (date: string) => void;
  type?: string;
  roomIdFilter?: string;
  setRoomIdFilter?: (id: string) => void;
  roomIdNames?: Array<{ id: string; name: string }>;
}

export default function SortAndFilterBar({
  searchText,
  setSearchText,
  sortByAsc,
  setSortByAsc,
  sortByCol,
  setSortByCol,
  sortOptions,
  generatedFilterLower,
  setGeneratedFilterLower,
  generatedFilterUpper,
  setGeneratedFilterUpper,
  type,
  roomIdFilter,
  setRoomIdFilter,
  roomIdNames,
}: SortAndFilterBarProps) {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [countFilters, setCountFilters] = useState<number>(0);

  useEffect(() => {
    let filtersCount = 0;

    if (generatedFilterLower || generatedFilterUpper) {
      filtersCount += 1;
    }
    if (roomIdFilter != "" && roomIdFilter !== undefined) {
      filtersCount += 1;
    }
    setCountFilters(filtersCount);
  }, [generatedFilterLower, generatedFilterUpper, roomIdFilter]);

  return (
    <>
      <div className="flex flex-row w-full h-20 justify-start xl:px-8 px-8 sm:px-16 xl:gap-10 lg:gap-10 md:gap-10 gap-2 bg-browndark text-background">
        <TextInput
          className="px-2 xl:w-1/3 w-1/4 h-8 mt-9 mb-5 rounded-md font-semibold focus:drop-shadow-md bg-browndark border-2 border-background focus:outline-none text-mainColorText placeholder-mainColorText hover:border-black"
          placeholder="Szukaj..."
          defaultValue={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <div className="flex flex-row mt-11 mb-5">
          <Button
            className="flex flex-row place-items-center font-semibold gap-2 hover:brightness-0"
            onClick={() => setOpenFilters(!openFilters)}
          >
            <img src={filterIcon} />
            <p className="hidden lg:block">
              {openFilters ? "Ukryj filtry" : "Pokaż filtry"}
              {countFilters > 0 && ` (${countFilters})`}
            </p>
          </Button>
        </div>
        <div className="flex flex-row place-items-center font-semibold gap-2 mt-11 mb-5 hover:text-black">
          <p className="xl:text-base text-sm">Sortuj wg</p>
          <select
            className="px-2 py-1 xl:w-48 lg:w-48 md:w-48 sm:w-48 w-32 mx-2 rounded-md focus:drop-shadow-md bg-browndark border-2 border-background focus:outline-none cursor-pointer hover:text-black hover:border-black"
            value={sortByCol}
            onChange={(e) => setSortByCol(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.name} value={option.sortBy}>
                {option.name}
              </option>
            ))}
          </select>
          {sortByAsc ? (
            <Button
              onClick={() => setSortByAsc(!sortByAsc)}
              className="hover:brightness-0"
            >
              <img src={sortAscIcon} alt="sort asc" />
            </Button>
          ) : (
            <Button
              onClick={() => setSortByAsc(!sortByAsc)}
              className="hover:brightness-0"
            >
              <img src={sortDscIcon} alt="sort dsc" />
            </Button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {openFilters && (
          <motion.div
            className="flex flex-col px-8 justify-start"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
          >
            <hr className="border border-background my-2" />
            <div className="flex justify-start px-2 mb-1">
              <p className="font-semibold">Data</p>
            </div>
            <div className="flex flex-row  gap-3 pb-4 pt-1">
              <div className="flex w-full sm:flex-row flex-col  gap-3 items-center  px-6">
                <p>Od:</p>
                <DateInput
                  className="lg:w-1/6 sm:w-1/3 w-1/3 h-9 px-1  font-semibold  rounded-md  hover:drop-shadow-md bg-browndark border-2 border-background focus:outline-none text-mainColorText hover:border-black"
                  value={generatedFilterLower.split("T")[0]}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    setGeneratedFilterLower(`${dateValue}T00:00`);
                  }}
                />
                <p>Do:</p>
                <DateInput
                  className="lg:w-1/6 sm:w-1/3 w-1/2 h-9 px-1 font-semibold hover:drop-shadow-md  rounded-md  bg-browndark border-2 border-background focus:outline-none text-mainColorText   hover:border-black"
                  value={generatedFilterUpper.split("T")[0]}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    setGeneratedFilterUpper(`${dateValue}T23:59`);
                  }}
                />
                {(generatedFilterLower !== "" ||
                  generatedFilterUpper !== "") && (
                  <Button
                    className="w-36 h-9 ml-5 bg-mainColorText text-background  font-semibold rounded-md hover:drop-shadow-lg hover:text-black"
                    onClick={() => {
                      setGeneratedFilterLower("");
                      setGeneratedFilterUpper("");
                    }}
                  >
                    Wyczyść
                  </Button>
                )}
              </div>
            </div>
            {type === "renovations" && (
              <>
                <div className="flex justify-start px-2 mb-1">
                  <p className="font-semibold">Pokój w renowacji</p>
                </div>
                <div className="flex flex-row  gap-3 pb-4 pt-1">
                  <div className="flex w-full sm:flex-row flex-col  gap-3 items-center  px-6">
                    <p>Nazwa:</p>
                    <select
                      className="px-2 py-1 xl:w-48 lg:w-48 md:w-48 sm:w-48 w-32 mx-2 rounded-md focus:drop-shadow-md bg-browndark border-2 text-mainColorText border-background focus:outline-none cursor-pointer  hover:border-black"
                      value={roomIdFilter}
                      onChange={(e) =>
                        setRoomIdFilter && setRoomIdFilter(e.target.value)
                      }
                    >
                      <option key="" value={""}>
                        brak
                      </option>
                      {roomIdNames?.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}
            <hr className="border border-background my-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
