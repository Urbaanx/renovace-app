import { useEffect, useState } from "react";
import {
  useGetApiRoomAvailable,
  usePostApiRoomCreateAndGenerate,
} from "../../../../api/endpoints/api";
import SideBar from "../../../../components/Sidebar/Sidebar";
import UploadFileButton from "../../../LandingPage/UploadFileButton";
import Modal from "../Home/Modal";
import Button from "../../../../components/Button/Button";
import ModalLoading from "./ModalLoading";
import ModalComplete from "./ModalComplete";
import RoomCard from "./RoomCard";
import SortAndFilterBar from "../../../../components/SortAndFilterBar/SortAndFilterBar";
import Paginator from "../../../PortalRenovations/Paginator";
import JSZip from "jszip";
import { MoonLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import { getVideoDuration } from "../useGetVideoDuration";
import SuccessNotification from "../../../../components/SuccessNotification/SuccessNotification";
import FailedNotification from "../../../../components/FailedNotification/FailedNotification";
import { memo } from "react";
interface RoomsProps {
  isMobile: boolean;
}

function Rooms({ isMobile }: RoomsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [roomName, setRoomName] = useState("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [orderByAsc, setOrderByAsc] = useState<boolean>(true);
  const [orderByCol, setOrderByCol] = useState<string>("name");
  const [createdFilterLower, setCreatedFilterLower] = useState<string>("");
  const [createdFilterUpper, setCreatedFilterUpper] = useState<string>("");
  const [errorTypeUpload, setErrorTypeUpload] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

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

  const { data, isLoading, error, refetch } = useGetApiRoomAvailable({
    nameFilter: nameFilter,
    roomIdFilter: "",
    videoUploadedFilter: undefined,
    modelGeneratedFilter: undefined,
    thumbnailFilter: "",
    widthFilter: "",
    heightFilter: "",
    lengthFilter: "",
    creationDateFilterLower: createdFilterLower,
    creationDateFilterUpper: createdFilterUpper,
    page: currentPage,
    pageSize: pageSize,
    orderBycol: orderByCol,
    orderByAsc: orderByAsc,
  });

  const sortOptions = [
    { name: "nazwy", sortBy: "name" },
    { name: "daty", sortBy: "generationDate" },
  ];

  const { mutate: postApiRoomCreateAndGenerate } =
    usePostApiRoomCreateAndGenerate();

  const closeModal = () => setIsModalOpen(false);
  const openLoadingModal = () => setIsLoadingModalOpen(true);
  const closeLoadingModal = () => setIsLoadingModalOpen(false);
  const openCompleteModal = () => setIsCompleteModalOpen(true);
  const closeCompleteModal = () => setIsCompleteModalOpen(false);

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
    if (!files || !roomName) {
      setErrorMessage("Nie wybrano pliku lub nie podano nazwy pokoju.");
      setIsFailed(true);
      return;
    }

    openLoadingModal();
    closeModal();

    let fileBlob;

    let videoLength: number | undefined | null = null;

    const isVideo = await hasVideo(files);
    const isImages = await hasImages(files);

    const data_type = isVideo ? "video" : "images";
    if (isVideo) {
      fileBlob = new File([files[0]], files[0].name, { type: files[0].type });
      videoLength = await getVideoDuration(files[0]);
      videoLength = Number(videoLength.toFixed(0));
    }
    if (isImages) {
      const zip = new JSZip();

      for (const file of Array.from(files)) {
        const fileData = await file.arrayBuffer();
        zip.file(file.name, fileData);
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipFileName = `${roomName}.zip`;
      fileBlob = new File([zipBlob], zipFileName, {
        type: "application/zip",
      });
    }

    postApiRoomCreateAndGenerate(
      {
        data: { file: fileBlob },
        params: {
          name: roomName,
          data_type: data_type,
          num_frames_target: 1200,
          max_num_iterations: 15000,
          videoLength: isVideo ? Number(videoLength) : undefined,
        },
      },
      {
        onSuccess: () => {
          setSuccessMessage("Plik został pomyślnie przesłany!");
          setIsSuccess(true);
          closeLoadingModal();
          openCompleteModal();
          setFiles(null);
          setRoomName("");
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
            setErrorMessage("Przekroczono limit pokoji dla konta!");
          } else {
            setErrorMessage("Wystąpił błąd podczas przesyłania pliku!");
          }
          setFiles(null);
          setRoomName("");
          setIsFailed(true);
          closeLoadingModal();
          console.error("Upload error:", error);
        },
      }
    );
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files;
    if (droppedFile) {
      setFiles(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handlePageClick = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <>
      <SideBar isMobile={isMobile} />
      <div className={`${!isMobile ? "ml-16" : "mb-16"} bg-browndark`}>
        <div className="relative z-0 flex flex-col min-h-screen">
          <div className="relative z-10 flex md:flex-row justify-between items-center text-background bg-mainColorText md:text-left py-10 px-6 md:px-12 shadow-2xl">
            <div className="md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                Twoje pokoje
              </h1>
              <p className="text-sm font-bold">
                Kliknij na przycisk obok, aby dodać nowy pokój do swojej
                kolekcji!
                <br />
                Dodaj pokój i nadaj każdemu zakątkowi domu niepowtarzalny
                charakter.
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
            generatedFilterLower={createdFilterLower}
            setGeneratedFilterLower={setCreatedFilterLower}
            generatedFilterUpper={createdFilterUpper}
            setGeneratedFilterUpper={setCreatedFilterUpper}
          />
          <div className="p-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-[60vh] w-full">
                <MoonLoader size={50} />
              </div>
            ) : (
              error && (
                <div className="w-full h-20 place-content-center text-center">
                  <p className="text-lg font-semibold text-red-500">
                    Błąd podczas pobierania danych.
                  </p>
                </div>
              )
            )}

            {!isLoading && !error && data?.returnedObjects?.length === 0 && (
              <motion.div className="flex flex-col w-full h-96  place-items-center place-content-center gap-10 ">
                {!nameFilter && !createdFilterLower && !createdFilterUpper ? (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex flex-col w-full h-96  place-items-center place-content-center gap-10 "
                  >
                    <p className="text-lg font-semibold">
                      Nie masz jeszcze żadnego pokoju.
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
                        Stwórz pokój!
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <p className="text-lg font-semibold">
                    Nie znaleziono pokoju.
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
                data.returnedObjects.map((room: any, index) => (
                  <RoomCard
                    key={room.roomId || `index-${index}`}
                    name={room.name || "Nieznany pokój"}
                    creationDate={room.creationDate || "Brak daty"}
                    roomId={room.roomId}
                    ownerId={room.ownerId}
                    modelGenerated={room.modelGenerated}
                    errorRoom={room.error}
                    setIsSuccessDelete={setIsSuccess}
                    setIsErrorDelete={setIsFailed}
                    setIsErrorDeleteMessage={setErrorMessage}
                    setIsSuccessDeleteMessage={setSuccessMessage}
                    refetchRooms={refetch}
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
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <button
                type="button"
                className="bg-backgroundComponents text-mainColorText px-4 py-2 rounded hover:bg-opacity-80"
              >
                Wybierz plik...
              </button>
              <p
                className={`w-full mt-6 px-2 font-bold text-center text-wrap overflow-hidden text-ellipsis ${
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
            Podaj nazwę swojego pokoju
            <input
              type="text"
              placeholder="Sypialnia..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
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
              disabled={!files || !roomName.trim()}
              className={`bg-background text-mainColorText px-12 py-2 rounded shadow-md ${
                !files || !roomName.trim()
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
        onClose={() => {
          closeLoadingModal();
          setFiles(null);
        }}
      />
      <ModalComplete
        isOpen={isCompleteModalOpen}
        onClose={() => {
          closeCompleteModal();
          setFiles(null);
        }}
      />
    </>
  );
}
export default memo(Rooms);
