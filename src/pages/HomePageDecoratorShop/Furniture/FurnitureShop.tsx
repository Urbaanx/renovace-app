import { useEffect, useState } from "react";

import JSZip from "jszip";
import { MoonLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetApiObjectAvailable,
  useGetUserHasRole,
  usePostApiObjectCreateAndGenerate,
} from "../../../api/endpoints/api";
import { getVideoDuration } from "../../HomePage/subpages/useGetVideoDuration";
import SideBarDecoratorShop from "../../../components/Sidebar/SidebarDecoratorShop";
import UploadFileButton from "../../LandingPage/UploadFileButton";
import SortAndFilterBar from "../../../components/SortAndFilterBar/SortAndFilterBar";
import Button from "../../../components/Button/Button";
import FurnitureCard from "../../HomePage/subpages/Furniture/FurnitureCard";
import Paginator from "../../PortalRenovations/Paginator";
import SuccessNotification from "../../../components/SuccessNotification/SuccessNotification";
import FailedNotification from "../../../components/FailedNotification/FailedNotification";

import { useNavigate } from "react-router";
import Modal from "../../HomePage/subpages/Home/Modal";
import ModalLoading from "../../HomePage/subpages/Furniture/ModalLoading";
import ModalComplete from "../../HomePage/subpages/Furniture/ModalComplete";

interface FurnitureShopProps {
  isMobile: boolean;
}

interface FurnitureShopItem {
  objectId: string;
  thumbnail?: string;
  name: string;
  generationDate?: string;
  creationDate?: string;
  ownerId: string;
  modelGenerated: boolean;
  error: any;
  type: number | undefined;
}

export default function FurnitureShop({ isMobile }: FurnitureShopProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [furnitureName, setFurnitureName] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [orderByCol, setOrderByCol] = useState<string>("name");
  const [orderByAsc, setOrderByAsc] = useState<boolean>(true);
  const [generatedFilterLower, setGeneratedFilterLower] = useState<string>("");
  const [generatedFilterUpper, setGeneratedFilterUpper] = useState<string>("");
  const [errorTypeUpload, setErrorTypeUpload] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();
  const { data: isShopRole, isLoading: isLoadingShopRole } = useGetUserHasRole({
    role: "Shop",
  });

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

  const videoExtensions = ["mp4", "mov", "avi", "wmv"];
  const imageExtensions = ["jpg", "jpeg", "png"];

  const { data, isLoading, error, refetch } = useGetApiObjectAvailable<{
    returnedObjects: FurnitureShopItem[];
    totalCount: number;
  }>({
    nameFilter: nameFilter,
    objectIdFilter: "",
    thumbnailFilter: "",
    generationDateFilterLower: generatedFilterLower,
    generationDateFilterUpper: generatedFilterUpper,
    page: currentPage,
    pageSize: pageSize,
    orderBycol: orderByCol,
    orderByAsc: orderByAsc,
    typeFilter: 1,
  });

  const sortOptions = [
    { name: "nazwy", sortBy: "name" },
    { name: "daty", sortBy: "generationDate" },
  ];

  const { mutate: postApiObjectCreateAndGenerate } =
    usePostApiObjectCreateAndGenerate();

  const closeModal = () => setIsModalOpen(false);
  const openLoadingModal = () => setIsLoadingModalOpen(true);
  const closeLoadingModal = () => setIsLoadingModalOpen(false);
  const openCompleteModal = () => setIsCompleteModalOpen(true);
  const closeCompleteModal = () => setIsCompleteModalOpen(false);

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
    refetch();
  };

  async function hasVideo(files: FileList) {
    const currentFiles = Array.from(files);

    const hasVideo = currentFiles.some((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      return videoExtensions.includes(extension);
    });
    return hasVideo;
  }

  async function hasImages(files: FileList) {
    const currentFiles = Array.from(files);

    const hasImage = currentFiles.some((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";
      return imageExtensions.includes(extension);
    });

    return hasImage;
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const hasImage = await hasImages(event.target.files);
      const isVideo = await hasVideo(event.target.files);

      if (hasImage && isVideo) {
        setFiles(null);
        setErrorTypeUpload(true);
        return;
      }

      if (isVideo && event.target.files.length > 1) {
        setFiles(null);
        setErrorTypeUpload(true);
        return;
      }
      setErrorTypeUpload(false);
      setFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files || !furnitureName) {
      setErrorMessage("Nie wybrano pliku lub nie podano nazwy mebla.");
      setIsFailed(true);
      return;
    }

    openLoadingModal();
    closeModal();
    let fileBlob;
    const isVideo = await hasVideo(files);
    const isImages = await hasImages(files);

    let videoLength: number | undefined | null = null;

    const data_type = isVideo ? "video" : "images";

    if (isVideo) {
      fileBlob = new File([files[0]], files[0].name, { type: files[0].type });
      const duration = await getVideoDuration(files[0]);
      videoLength = Number(duration.toFixed(0));
    }

    if (isImages) {
      const zip = new JSZip();

      for (const file of Array.from(files)) {
        const fileData = await file.arrayBuffer();
        zip.file(file.name, fileData);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipFileName = `${furnitureName}.zip`;
      fileBlob = new File([zipBlob], zipFileName, {
        type: "application/zip",
      });
    }

    postApiObjectCreateAndGenerate(
      {
        data: { file: fileBlob },
        params: {
          name: furnitureName,
          data_type: data_type,
          num_frames_target: 1200,
          max_num_iterations: 15000,
          videoLength: isVideo ? Number(videoLength) : undefined,
          type: 1
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Plik został pomyślnie przesłany!");
          setIsSuccess(true);
          closeLoadingModal();
          openCompleteModal();
          setFiles(null);
          setFurnitureName("");
          refetch();
        },
        onError: (error) => {
          if (
            error.response?.status === 400 &&
            typeof error.response?.data === "object" &&
            error.response?.data !== null &&
            "overLimit" in error.response.data &&
            (error.response.data as { overLimit?: boolean }).overLimit
          ) {
            setErrorMessage("Przekroczono limit mebli dla konta!");
          } else {
            setErrorMessage("Wystąpił błąd podczas przesyłania pliku!");
          }
          setFiles(null);
          setFurnitureName("");
          setIsFailed(true);
          closeLoadingModal();
          console.error("Upload error:", error);
        },
      }
    );
  };

  return (
    <>
      {isLoadingShopRole ? (
        <div className="flex flex-col gap-10 justify-center w-full h-screen bg-background text-center place-items-center">
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown pl-3">Ładowanie...</p>
        </div>
      ) : !isShopRole ? (
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
          <div
            className={`${
              !isMobile ? "ml-16" : "mb-16"
            } bg-browndark min-h-screen`}
          >
            <div className="relative z-0 flex flex-col min-h-screen">
              <div className="relative z-10 flex md:flex-row justify-between items-center text-background bg-mainColorText md:text-left py-10 px-6 md:px-12 shadow-2xl">
                <div className="md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    Twoje meble - Twoja kolekcja.
                  </h1>
                  <p className="text-sm font-bold">
                    Dodawaj, edytuj i śledź swoje produkty w świecie Renovace.
                  </p>
                </div>
                <div className="flex justify-end md:justify-end md:w-auto ml-10">
                  <UploadFileButton openModal={() => setIsModalOpen(true)} />
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
                generatedFilterLower={generatedFilterLower}
                setGeneratedFilterLower={setGeneratedFilterLower}
                generatedFilterUpper={generatedFilterUpper}
                setGeneratedFilterUpper={setGeneratedFilterUpper}
              />
              <div className="p-8">
                {isLoading ? (
                  <div className="flex justify-center items-center h-[60vh] w-full">
                    <MoonLoader size={50} />
                  </div>
                ) : (
                  error && (
                    <div className="w-full h-20 flex items-center justify-center">
                      <p className="text-lg font-semibold text-red-500">
                        Błąd podczas pobierania danych.
                      </p>
                    </div>
                  )
                )}
                {!isLoading &&
                  !error &&
                  data?.returnedObjects?.length === 0 && (
                    <motion.div className="flex flex-col w-full h-96  place-items-center place-content-center gap-10 ">
                      {!nameFilter &&
                      !generatedFilterLower &&
                      !generatedFilterUpper ? (
                        <motion.div
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="flex flex-col w-full h-96  place-items-center place-content-center gap-10 "
                        >
                          <p className="text-lg font-semibold">
                            Nie masz jeszcze żadnego mebla.
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              duration: 0.3,
                            }}
                          >
                            <Button onClick={() => setIsModalOpen(true)}>
                              Stwórz mebel!
                            </Button>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <p className="text-lg font-semibold">
                          Nie znaleziono mebla.
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
                  {!isLoading &&
                    !error &&
                    Array.isArray(data?.returnedObjects) &&
                    data.returnedObjects.length > 0 &&
                    data.returnedObjects.map((furniture, index) => (
                      <FurnitureCard
                        key={furniture.objectId || `index-${index}`}
                        name={furniture.name || "Nieznany obiekt"}
                        creationDate={furniture.creationDate || "Brak danych"}
                        furnitureId={furniture.objectId}
                        ownerId={furniture.ownerId}
                        modelGenerated={furniture.modelGenerated}
                        errorFurniture={furniture.error}
                        setIsSuccessDelete={setIsSuccess}
                        setIsErrorDelete={setIsFailed}
                        setIsErrorDeleteMessage={setErrorMessage}
                        setIsSuccessDeleteMessage={setSuccessMessage}
                        refetchFurniture={refetch}
                        type={furniture?.type}
                      />
                    ))}
                </motion.div>

                <div className="absolute bottom-4 right-4">
                  <Paginator
                    pages={Math.ceil((data?.totalCount ?? 0) / pageSize)}
                    onChangePage={handlePageClick}
                    startingPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              closeModal();
              setFiles(null);
            }}
          >
            <div className="flex flex-col items-center gap-6 text-background text-sm mt-10">
              <label className="flex flex-col items-center w-full">
                <input
                  type="file"
                  onChange={handleFileChange}
                  id="fileInput"
                  hidden
                  multiple
                  accept=".mp4,.mov,.avi,.jpg,.jpeg,.png"
                />
                <div
                  className="w-72 h-[200px] flex flex-col items-center justify-center border border-browndark rounded bg-brownlight shadow-[inset_0_0px_10px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-opacity-80"
                  onClick={() => document.getElementById("fileInput")?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    setFiles(e.dataTransfer.files);
                  }}
                >
                  <button
                    type="button"
                    className="bg-backgroundComponents text-mainColorText px-4 py-2 rounded hover:bg-opacity-80"
                  >
                    Wybierz plik...
                  </button>
                  <p
                    className={`mt-6 font-bold text-center over text-wrap ${
                      errorTypeUpload && "text-red-500"
                    }`}
                  >
                    {files && files.length < 2
                      ? files[0].name
                      : errorTypeUpload &&
                        "Możesz podać jeden plik wideo albo zdjęcie lub liste zdjęć!"}
                    {!files && "lub upuść go tutaj"}
                    <br />
                    {files &&
                      files.length > 1 &&
                      "Wybranych zdjęć: " + files.length}
                  </p>
                </div>
              </label>
              <label className="w-full flex flex-col gap-2">
                Podaj nazwę swojego mebla
                <input
                  type="text"
                  placeholder="Stolik..."
                  value={furnitureName}
                  onChange={(e) => setFurnitureName(e.target.value)}
                  className="p-2 border border-backgroundComponents rounded bg-transparent shadow-md text-black"
                />
              </label>
              <div className="flex justify-between w-full mt-4">
                <Button
                  onClick={() => {
                    closeModal();
                    setFiles(null);
                  }}
                  className="border border-backgroundComponents px-12 py-2 rounded text-backgroundComponents bg-transparent shadow-md hover:shadow-lg"
                >
                  Anuluj
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!files || !furnitureName.trim()}
                  className={`bg-backgroundComponents text-mainColorText px-12 py-2 rounded shadow-md ${
                    !files || !furnitureName.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-opacity-80"
                  }`}
                >
                  Prześlij
                </Button>
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
          />
        </>
      )}
    </>
  );
}
