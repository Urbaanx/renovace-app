import { useEffect, useState } from "react";

import "../../HomePage/subpages/Renovations/styles.css";

import { MoonLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  useGetApiRenovationAvailable,
  useGetApiRoomAvailable,
  useGetUserHasRole,
  usePostApiRenovation,
} from "../../../api/endpoints/api";
import SideBarDecoratorShop from "../../../components/Sidebar/SidebarDecoratorShop";
import UploadFileButton from "../../LandingPage/UploadFileButton";
import SortAndFilterBar from "../../../components/SortAndFilterBar/SortAndFilterBar";
import Button from "../../../components/Button/Button";
import RenovationCard from "../../HomePage/subpages/Renovations/RenovationCard";
import Paginator from "../../PortalRenovations/Paginator";
import Modal from "../../HomePage/subpages/Home/Modal";
import formatDate from "../../../components/DateFormater/formatDate";
import SuccessNotification from "../../../components/SuccessNotification/SuccessNotification";
import FailedNotification from "../../../components/FailedNotification/FailedNotification";
import ModalLoading from "../../HomePage/subpages/Renovations/ModalLoading";
import ModalComplete from "../../HomePage/subpages/Renovations/ModalComplete";

interface RenovationsDecoratorProps {
  isMobile: boolean;
}

export default function RenovationsDecorator({
  isMobile,
}: RenovationsDecoratorProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [orderByAsc, setOrderByAsc] = useState<boolean>(true);
  const [orderByCol, setOrderByCol] = useState<string>("name");
  const [creationFilterLower, setCreationFilterLower] = useState<string>("");
  const [creationFilterUpper, setCreationFilterUpper] = useState<string>("");
  const [roomIdFilter, setRoomIdFilter] = useState<string>("");
  const [renovationName, setRenovationName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();
  const { data: isDecoratorRole, isLoading: isLoadingDecoratorRole } =
    useGetUserHasRole({ role: "Decorator" });

  function closeNotificationSuccess() {
    setIsSuccess(false);
  }

  function closeNotificationFailed() {
    setIsFailed(false);
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } else if (isFailed) {
      setTimeout(() => {
        setIsFailed(false);
      }, 5000);
    }
  }, [isSuccess, setIsSuccess, isFailed, setIsFailed]);

  const { mutate: postApiRenovation } = usePostApiRenovation();

  const {
    data: roomsData,
    isLoading: isRoomsLoading,
    error: roomsError,
  } = useGetApiRoomAvailable({
    nameFilter: "",
    roomIdFilter: "",
    videoUploadedFilter: undefined,
    modelGeneratedFilter: true,
    thumbnailFilter: "",
    widthFilter: "",
    heightFilter: "",
    lengthFilter: "",
    generationDateFilterLower: undefined,
    generationDateFilterUpper: undefined,
    page: 1,
    pageSize: 100,
    orderBycol: "objectid",
    orderByAsc: true,
  });

  const {
    data: renovationsData,
    refetch: refetchRenovations,
    isLoading: isRenovationLoading,
    error: renovationError,
  } = useGetApiRenovationAvailable({
    nameFilter: nameFilter,
    renovationIdFilter: "",
    roomIdFilter: roomIdFilter,
    publicFilter: undefined,
    modificationDateFilterUpper: undefined,
    modificationDateFilterLower: undefined,
    creationDateFilterUpper: creationFilterUpper,
    creationDateFilterLower: creationFilterLower,
    page: currentPage,
    pageSize: 8,
    orderBycol: orderByCol,
    orderByAsc: orderByAsc,
    typeFilter: 1,
  });

  const roomsDataFilters = roomsData?.returnedObjects || [];
  const roomInfo = roomsDataFilters.map((room) => ({
    id: room.roomId || "",
    name: room.name || "",
  }));

  const sortOptions = [
    { name: "nazwy", sortBy: "name" },
    { name: "daty", sortBy: "creationDate" },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setRenovationName("");
  };

  const openLoadingModal = () => setIsLoadingModalOpen(true);
  const closeLoadingModal = () => setIsLoadingModalOpen(false);

  const openCompleteModal = () => setIsCompleteModalOpen(true);
  const closeCompleteModal = () => setIsCompleteModalOpen(false);

  const handleRoomSelect = (roomName: string) => setSelectedRoom(roomName);

  const handleRenovationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRenovationName(e.target.value);
  };

  const handleCreateRenovation = () => {
    if (selectedRoom && renovationName.trim() !== "") {
      const renovationData = {
        roomId: selectedRoom,
        name: renovationName,
        public: true,
        thumbnail: "string",
        type: 1,
      };

      openLoadingModal();
      closeModal();

      postApiRenovation(
        { data: renovationData },
        {
          onSuccess: () => {
            setSuccessMessage("Renowacja została pomyślnie stworzona!");
            setIsSuccess(true);
            closeLoadingModal();
            openCompleteModal();
            setRenovationName("");
            refetchRenovations();
          },
          onError: (error) => {
            if (
              error.response?.status === 400 &&
              typeof error.response?.data === "object" &&
              error.response?.data !== null &&
              "overLimit" in error.response.data &&
              (error.response.data as { overLimit?: boolean }).overLimit
            ) {
              setErrorMessage("Przekroczono limit renowacji dla konta!");
            } else {
              setErrorMessage("Nie udało się stworzyć renowacji.");
            }
            setRenovationName("");
            setIsFailed(true);
            console.error("Error creating renovation:", error);
            closeLoadingModal();
          },
        }
      );
    }
  };

  const isCreateButtonDisabled = !selectedRoom || renovationName.trim() === "";

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
    refetchRenovations();
  };

  return (
    <>
      {isLoadingDecoratorRole ? (
        <div className="flex flex-col gap-10 justify-center w-full h-screen bg-background text-center place-items-center">
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown pl-3">Ładowanie...</p>
        </div>
      ) : !isDecoratorRole ? (
        <div className="flex flex-col w-full h-screen justify-center bg-background place-items-center gap-10">
          <p className="text-2xl text-brown">
            Nie posiadasz uprawnień do tej strony!
          </p>
          <Button
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 200, damping: 10 },
            }}
            className="bg-brown  text-background px-14 py-2 rounded shadow-md hover:text-black"
            onClick={() => navigate("/")}
          >
            Strona Główna
          </Button>
        </div>
      ) : (
        <>
          <SideBarDecoratorShop isMobile={isMobile} />
          <div className={`${!isMobile ? "ml-16" : "mb-16"} bg-browndark`}>
            <div className="relative z-0 flex flex-col min-h-screen">
              <div className="relative z-10 flex md:flex-row justify-between items-center text-background bg-mainColorText md:text-left py-10 px-6 md:px-12 shadow-2xl">
                <div className="md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    Twoje projekty renowacyjne
                  </h1>
                  <p className="text-sm font-bold">
                    Tutaj znajdziesz wszystkie wnętrza, nad którymi pracujesz
                    lub pracowałeś.
                  </p>
                </div>
                <div className="flex justify-end md:justify-end md:w-auto ml-10">
                  <UploadFileButton openModal={openModal} />
                </div>
              </div>
              <SortAndFilterBar
                searchText={nameFilter}
                setSearchText={(text) => setNameFilter(text)}
                sortByAsc={orderByAsc}
                setSortByAsc={setOrderByAsc}
                sortByCol={orderByCol}
                setSortByCol={setOrderByCol}
                sortOptions={sortOptions}
                generatedFilterLower={creationFilterLower}
                setGeneratedFilterLower={setCreationFilterLower}
                generatedFilterUpper={creationFilterUpper}
                setGeneratedFilterUpper={setCreationFilterUpper}
                roomIdFilter={roomIdFilter}
                setRoomIdFilter={setRoomIdFilter}
                roomIdNames={roomInfo}
                type="renovations"
              />
              <div className="p-8">
                {isRenovationLoading ? (
                  <div className="flex justify-center items-center h-[60vh] w-full">
                    <MoonLoader size={50} />
                  </div>
                ) : (
                  renovationError && (
                    <div className="w-full h-20 place-content-center text-center">
                      <p className="text-lg font-semibold text-red-500">
                        Błąd podczas pobierania danych.
                      </p>
                    </div>
                  )
                )}
                {!isRenovationLoading &&
                  !renovationError &&
                  renovationsData?.returnedObjects?.length === 0 && (
                    <motion.div className="flex flex-col w-full h-96  place-items-center place-content-center gap-10 ">
                      {!nameFilter &&
                      !creationFilterLower &&
                      !creationFilterUpper &&
                      !roomIdFilter ? (
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="flex flex-col w-full h-96  place-items-center place-content-center gap-10 "
                        >
                          <p className="text-lg font-semibold">
                            Nie masz jeszcze żadnej renowacji.
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              duration: 0.3,
                            }}
                          >
                            {roomsData?.returnedObjects?.length === 0 ? (
                              <Button onClick={() => navigate("/rooms")}>
                                Zacznij od stworzenia pokoju!
                              </Button>
                            ) : (
                              <Button onClick={openModal}>
                                Stwórz renowację!
                              </Button>
                            )}
                          </motion.div>
                        </motion.div>
                      ) : (
                        <p className="text-lg font-semibold">
                          Nie znaleziono renowacji.
                        </p>
                      )}
                    </motion.div>
                  )}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4 pb-10"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {!isRenovationLoading &&
                    !renovationError &&
                    Array.isArray(renovationsData?.returnedObjects) &&
                    renovationsData.returnedObjects.length > 0 &&
                    renovationsData.returnedObjects.map((renovation: any, index) => (
                      <RenovationCard
                        key={renovation?.renovationId || `index-${index}`}
                        roomId={renovation?.roomId}
                        name={renovation?.name || "Nieznana renowacja"}
                        creationDate={renovation?.creationDate || "Brak daty"}
                        renovationsId={renovation?.renovationId}
                        ownerId={renovation?.ownerId}
                        setIsSuccessDelete={setIsSuccess}
                        setIsErrorDelete={setIsFailed}
                        setIsErrorDeleteMessage={setErrorMessage}
                        setIsSuccessDeleteMessage={setSuccessMessage}
                        refetchRenovations={refetchRenovations}
                        type={renovation?.type}
                      />
                    ))}
                </motion.div>

                <div className="absolute bottom-4 right-4">
                  <Paginator
                    pages={Math.ceil((renovationsData?.totalCount ?? 0) / 8)}
                    onChangePage={handlePageClick}
                    startingPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex flex-col items-center justify-center text-background text-sm">
              <div className="p-12 w-full max-w-lg bg-transparent">
                <h2 className="text-2xl font-bold text-center mb-4">
                  Wybierz pokój do renowacji
                </h2>

                <div className="flex justify-center h-48">
                  {isRoomsLoading ? (
                    <p className="text-lg font-semibold">Ładowanie pokoi...</p>
                  ) : roomsError ? (
                    <p className="text-lg font-semibold text-red-500">
                      Błąd podczas pobierania danych.
                    </p>
                  ) : Array.isArray(roomsData?.returnedObjects) &&
                    roomsData.returnedObjects.length > 0 ? (
                    <div className="w-full space-y-2 overflow-y-auto h-[200px] custom-scrollbar">
                      {roomsData.returnedObjects.map((room) => (
                        <button
                          key={room?.roomId || Math.random()}
                          onClick={() =>
                            handleRoomSelect(room?.roomId || "Nieznany pokój")
                          }
                          className={`w-80 py-2 text-center rounded-[16px] shadow-[0_0_10px_rgba(0,0,0,0.2)] mt-2 ml-4
                        ${
                          selectedRoom === room?.roomId
                            ? "border-2 border-background bg-[#e0dcd5]"
                            : "bg-mainColorText"
                        }`}
                        >
                          <span className="font-bold block text-sm">
                            Nazwa pokoju: {room?.name || "Nieznany pokój"}
                          </span>
                          <span className="text-xs text-gray-500">
                            Data wygenerowania:{" "}
                            {room?.creationDate
                              ? formatDate(room.creationDate)
                              : "Brak danych"}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-lg font-semibold">
                      Brak dostępnych pokoi.
                    </p>
                  )}
                </div>

                <label className="w-full flex flex-col gap-2 mt-4">
                  Podaj nazwę renowacji
                  <input
                    type="text"
                    placeholder="Sypialnia..."
                    value={renovationName}
                    onChange={handleRenovationNameChange}
                    className="p-2 border border-backgroundComponents rounded bg-transparent shadow-md text-black"
                  />
                </label>

                {/* Przyciski */}
                <div className="flex justify-between mt-4 space-x-4">
                  <Button
                    onClick={closeModal}
                    className="text-backgroundComponents border border-backgroundComponents px-14 py-2 rounded shadow-md hover:shadow-lg"
                  >
                    Zamknij
                  </Button>
                  <Button
                    onClick={handleCreateRenovation}
                    className={`bg-background text-mainColorText px-14 py-2 rounded shadow-md ${
                      isCreateButtonDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-opacity-80"
                    }`}
                    disabled={isCreateButtonDisabled}
                  >
                    Stwórz
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
          <AnimatePresence>
            {isSuccess && (
              <SuccessNotification
                text={successMessage}
                closeNotification={closeNotificationSuccess}
              />
            )}

            {isFailed && (
              <FailedNotification
                text={errorMessage}
                closeNotification={closeNotificationFailed}
              />
            )}
          </AnimatePresence>

          <ModalLoading
            isOpen={isLoadingModalOpen}
            onClose={closeLoadingModal}
          />

          <ModalComplete
            isOpen={isCompleteModalOpen}
            onClose={closeCompleteModal}
            renovationsId={
              renovationsData?.returnedObjects?.reduce(
                (latest, renovation) =>
                  new Date(renovation.creationDate || "1970-01-01") >
                  new Date(latest.creationDate || "1970-01-01")
                    ? renovation
                    : latest,
                renovationsData.returnedObjects[0]
              )?.renovationId || ""
            }
          />
        </>
      )}
    </>
  );
}
