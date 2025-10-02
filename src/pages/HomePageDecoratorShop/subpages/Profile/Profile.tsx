import { MoonLoader } from "react-spinners";
import SideBarDecoratorShop from "../../../../components/Sidebar/SidebarDecoratorShop";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router";
import { useGetUserHasRole } from "../../../../api/endpoints/api";
import { useEffect, useState } from "react";
import DecoratorProfile from "./DecoratorProfile";
import ShopProfile from "./ShopProfile";
import SuccessNotification from "../../../../components/SuccessNotification/SuccessNotification";
import FailedNotification from "../../../../components/FailedNotification/FailedNotification";

interface ProfileProps {
  isMobile: boolean;
}

export default function Profile({ isMobile }: ProfileProps) {
  const navigate = useNavigate();
  const { data: isDecoratorRole, isLoading: isLoadingDecoratorRole } =
    useGetUserHasRole({ role: "Decorator" });
  const { data: isShopRole, isLoading: isLoadingShopRole } = useGetUserHasRole({
    role: "Shop",
  });
  const [typeProfile, setTypeProfile] = useState<"Decorator" | "Shop">(
    "Decorator"
  );

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

  return (
    <>
      {isLoadingDecoratorRole && isLoadingShopRole ? (
        <div className="flex flex-col gap-10 justify-center w-full h-screen bg-background text-center place-items-center">
          <MoonLoader color="#CCC8BC" />
          <p className="text-2xl text-brown pl-3">Ładowanie...</p>
        </div>
      ) : !isDecoratorRole && !isShopRole ? (
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
          <motion.div
            className={`${
              !isMobile ? "ml-16" : "mb-16"
            } bg-browndark min-h-screen`}
          >
            <motion.div className="relative bg-browndark flex flex-col min-h-screen">
              {/* Background */}
              <motion.div className="shadow-xl relative z-10 flex md:flex-row items-center md:justify-between text-background bg-mainColorText py-10 px-6 md:px-12">
                <div className="md:mb-0">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    Pokaż, kim jesteś.
                  </h1>
                  <p className="text-sm font-bold text-wrap w-2/3">
                    {isDecoratorRole && isShopRole
                      ? "Uzupełnij informacje o swoim sklepie, aby użytkownicy mogli Cię poznać i wybierać Twoje produkty z większym zaufaniem. Uzupełnij informacje o sobie, dodaj swoje realizacje i pozwól użytkownikom poznać Twój styl."
                      : isDecoratorRole
                      ? "Uzupełnij informacje o sobie, dodaj swoje realizacje i pozwól użytkownikom poznać Twój styl."
                      : "Uzupełnij informacje o swoim sklepie, aby użytkownicy mogli Cię poznać i wybierać Twoje produkty z większym zaufaniem."}

                    <br />
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative  flex flex-col w-full  min-h-screen bg-graybrown">
                {isDecoratorRole && isShopRole ? (
                  <div className="flex flex-row w-auto md:pl-5 md:justify-start justify-center  ">
                    <Button
                      className={`w-36 h-8 rounded-bl-md ${
                        typeProfile === "Decorator"
                          ? "bg-background text-mainColorText"
                          : "bg-mainColorText"
                      } `}
                      onClick={() => setTypeProfile("Decorator")}
                    >
                      Dekorator
                    </Button>
                    <Button
                      className={` w-36 h-8 rounded-br-md ${
                        typeProfile === "Shop"
                          ? "bg-background text-mainColorText"
                          : "bg-mainColorText "
                      } `}
                      onClick={() => setTypeProfile("Shop")}
                    >
                      Sklep
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                {isDecoratorRole &&
                isShopRole &&
                typeProfile === "Decorator" ? (
                  <DecoratorProfile
                    setIsSuccess={setIsSuccess}
                    setIsFailed={setIsFailed}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                ) : isDecoratorRole && isShopRole && typeProfile === "Shop" ? (
                  <ShopProfile
                    setIsSuccess={setIsSuccess}
                    setIsFailed={setIsFailed}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                ) : !isDecoratorRole && isShopRole ? (
                  <ShopProfile
                    setIsSuccess={setIsSuccess}
                    setIsFailed={setIsFailed}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                ) : (
                  <DecoratorProfile
                    setIsSuccess={setIsSuccess}
                    setIsFailed={setIsFailed}
                    setErrorMessage={setErrorMessage}
                    setSuccessMessage={setSuccessMessage}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
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
        </>
      )}
    </>
  );
}
