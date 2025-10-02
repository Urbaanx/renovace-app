import { useEffect, useState } from "react";
import VideoBackgroundWithText from "../../VideoBackgroundWithText";
import { AnimatePresence, motion } from "framer-motion";
import RenovationCard from "../Renovations/RenovationCard";
import RoomCard from "../Rooms/RoomCard";
import FurnitureCard from "../Furniture/FurnitureCard";
import { useAuth0 } from "@auth0/auth0-react";
import SuccessNotification from "../../../../components/SuccessNotification/SuccessNotification";
import FailedNotification from "../../../../components/FailedNotification/FailedNotification";

interface WelcomeProps {
  firstName: string | undefined;
}

interface ListCard {
  id: string;
  name: string;
  creationDate: string;
  type: string;
  ownerId: string;
  modelGenerated: boolean;
  modelError: any;
  error: string | null;
}

export default function Welcome({ firstName }: WelcomeProps) {
  const { user } = useAuth0();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

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

  const listCards = JSON.parse(localStorage.getItem("lastCards") || "[]");
  const filteredListCards = listCards.filter(
    (card: { ownerId: string }) => card.ownerId === user?.sub
  );
  const reversedListCards = filteredListCards.reverse();

  return (
    <motion.div className="relative bg-browndark flex flex-col min-h-screen">
      {/* Background */}
      <motion.div className="shadow-xl relative z-10 flex md:flex-row items-center md:justify-between text-background bg-mainColorText py-10 px-6 md:px-12">
        <div className="md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            {firstName ? `Witaj ${firstName}!` : "Witaj!"}
          </h1>
          <p className="text-sm font-bold">
            Zacznij projektować swoje wymarzone wnętrze już teraz!
            <br />
            Twoja kreatywna przestrzeń czeka na Ciebie!
          </p>
        </div>
      </motion.div>
      {reversedListCards.length > 0 ? (
        <motion.div className="text-background  p-8">
          <p className="px-4 pb-8  text-xl font-semibold ">Ostatnio otwarte:</p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3  gap-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {reversedListCards.map((card: ListCard) =>
              card.type === "renovation" ? (
                <RenovationCard
                  key={card.id}
                  roomId={null}
                  name={card.name}
                  creationDate={card.creationDate}
                  renovationsId={card.id}
                  ownerId={card.ownerId}
                  setIsErrorDelete={setIsFailed}
                  setIsErrorDeleteMessage={setErrorMessage}
                  setIsSuccessDeleteMessage={setSuccessMessage}
                  setIsSuccessDelete={setIsSuccess}
                />
              ) : card.type === "room" ? (
                <RoomCard
                  key={card.id}
                  name={card.name}
                  creationDate={card.creationDate}
                  roomId={card.id}
                  ownerId={card.ownerId}
                  modelGenerated={card.modelGenerated}
                  errorRoom={card.error}
                  setIsErrorDelete={setIsFailed}
                  setIsErrorDeleteMessage={setErrorMessage}
                  setIsSuccessDeleteMessage={setSuccessMessage}
                  setIsSuccessDelete={setIsSuccess}
                />
              ) : (
                <FurnitureCard
                  key={card.id}
                  name={card.name}
                  creationDate={card.creationDate}
                  furnitureId={card.id}
                  ownerId={card.ownerId}
                  modelGenerated={card.modelGenerated}
                  errorFurniture={card.error}
                  setIsErrorDelete={setIsFailed}
                  setIsErrorDeleteMessage={setErrorMessage}
                  setIsSuccessDeleteMessage={setSuccessMessage}
                  setIsSuccessDelete={setIsSuccess}
                />
              )
            )}
          </motion.div>
        </motion.div>
      ) : (
        <VideoBackgroundWithText />
      )}

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
    </motion.div>
  );
}
