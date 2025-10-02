import { motion } from "framer-motion";
import SideBarDecoratorShop from "../../../../components/Sidebar/SidebarDecoratorShop";
import { useGetUserHasRole } from "../../../../api/endpoints/api";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router";
import Button from "../../../../components/Button/Button";
import furniture from "../../../../assets/furniture.svg";
import renovations from "../../../../assets/renovations.svg";
import profile from "../../../../assets/account.svg";

interface HomePageDecoratorShopProps {
  isMobile: boolean;
}

export default function HomePageDecoratorShop({
  isMobile,
}: HomePageDecoratorShopProps) {
  const navigate = useNavigate();
  const { data: isDecoratorRole, isLoading: isLoadingDecoratorRole } =
    useGetUserHasRole({ role: "Decorator" });
  const { data: isShopRole, isLoading: isLoadingShopRole } = useGetUserHasRole({
    role: "Shop",
  });

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
                    Witaj w panelu{" "}
                    {isDecoratorRole && isShopRole
                      ? "dekoratora wnętrz/sklepu"
                      : isDecoratorRole
                      ? "dekoratora wnętrz"
                      : "sklepu"}
                    !
                  </h1>
                  <p className="text-sm font-bold text-wrap w-2/3">
                    {isDecoratorRole && isShopRole
                      ? "Tutaj możesz zarządzać swoimi projektami renowacyjnymi,współpracować z użytkownikami, pokazywać swoje realizacje światu oraz zarządzać swoimi meblami, aktualizować dane sklepu i śledzić, jak Twoje produkty są używane w projektach użytkowników Renovace."
                      : isDecoratorRole
                      ? "Tutaj możesz zarządzać swoimi projektami renowacyjnymi, współpracować z użytkownikami oraz pokazywać swoje realizacje światu."
                      : "Tutaj możesz zarządzać swoimi meblami, aktualizować dane sklepu i śledzić, jak Twoje produkty są używane w projektach użytkowników Renovace"}

                    <br />
                  </p>
                </div>
              </motion.div>
              <motion.div className="relative flex flex-col items-center justify-center min-h-screen  bg-browndark ">
                <motion.div
                  className="relative inset-y-0 my-12 z-20 flex flex-col bg-mainColorText/80 w-11/12 mx-auto p-8 text-center rounded-lg shadow-lg "
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                >
                  <p className="text-base font-semibold text-background">
                    Wprowadź swoje{" "}
                    {isDecoratorRole && isShopRole
                      ? "projekty/asortymenty "
                      : isDecoratorRole
                      ? "projekty "
                      : "asortyment "}
                    do świata Renovace!
                  </p>
                  <p className="mt-4 text-base font-semibold text-background">
                    Dołącz do społeczności{" "}
                    {isDecoratorRole && isShopRole
                      ? "dekoratorów/sklepów "
                      : isDecoratorRole
                      ? "dekoratorów "
                      : "sklepów "}
                    , które zmieniają wnętrza na lepsze!
                  </p>
                  <div className="flex flex-col text-left text-background">
                    {isDecoratorRole === true && (
                      <div className="flex md:flex-row flex-col text-left w-full h-auto md:px-24 px-2 py-10 gap-10">
                        <div className="flex  md:justify-start justify-center lg:w-14 md:w-24 w-full">
                          <img
                            src={renovations}
                            className="lg:w-14 md:w-24 w-14   brightness-50 "
                          />{" "}
                        </div>
                        <div className="flex flex-col gap-3 md:text-left text-center">
                          <p className="font-bold text-xl">
                            Zacznij od stworzenia renowacji
                          </p>
                          <p className="text-wrap text-base ">
                            Przejdź do zakładki „Zarządzaj renowacjami”, aby
                            dodać swój pierwszy projekt. Wybierz przestrzeń,
                            zaplanuj zmiany i pokaż, jak potrafisz odmienić
                            każde wnętrze!
                          </p>
                          <p className="text-sm font-semibold pt-3">
                            Twój projekt może zainspirować setki użytkowników
                            Renovace!
                          </p>
                        </div>
                      </div>
                    )}
                    {isShopRole === true && (
                      <div className="flex md:flex-row flex-col text-left w-full h-auto md:px-24 px-2 py-10 gap-10">
                        <div className="flex  md:justify-start justify-center lg:w-14 md:w-24 w-full">
                          <img
                            src={furniture}
                            className="lg:w-14 md:w-24 w-14   brightness-50 "
                          />{" "}
                        </div>
                        <div className="flex flex-col gap-3 md:text-left text-center">
                          <p className="font-bold text-xl">
                            Zacznij od dodania mebli
                          </p>
                          <p className="text-wrap text-base ">
                            Przejdź do zakładki „Zarządzaj meblami”, aby dodać
                            swój pierwszy produkt. Dodaj zdjęcie, model 3D i
                            krótki opis – a my zajmiemy się resztą!
                          </p>
                          <p className="text-sm font-semibold pt-3">
                            Twój mebel może trafić do setek projektów
                            użytkowników!
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex md:flex-row flex-col text-left w-full h-auto md:px-24 px-2 py-10 gap-10">
                      <div className="flex  md:justify-start justify-center lg:w-14 md:w-24 w-full">
                        <img
                          src={profile}
                          className="lg:w-14 md:w-24 w-14   brightness-50 "
                        />{" "}
                      </div>
                      <div className="flex flex-col gap-3 md:text-left text-center">
                        <p className="font-bold text-xl">
                          Uzupełnij{" "}
                          {isDecoratorRole && isShopRole
                            ? "profilu dekoratora/informacje o sklepie "
                            : isDecoratorRole
                            ? "swój profil dekoratora "
                            : "informacje o sklepie "}
                        </p>
                        <p className="text-wrap text-base ">
                          Wypełnij zakładkę{" "}
                          {isDecoratorRole && isShopRole
                            ? "„Mój profil dekoratora”/„Informacje o sklepie”"
                            : isDecoratorRole
                            ? "„Mój profil dekoratora”"
                            : "„Informacje o sklepie”"}{" "}
                          – dodaj opis, dane kontaktowe. Pokaż swoje
                          umiejętności i pozwól użytkownikom odnaleźć Twój
                          unikalny styl!!
                        </p>
                        <p className="text-sm font-semibold pt-3">
                          Zbuduj rozpoznawalność{" "}
                          {isDecoratorRole && isShopRole
                            ? "swojej marki jako dekoratora wnętrz/swojego sklepu w świecie"
                            : isDecoratorRole
                            ? "swojej marki jako dekoratora wnętrz"
                            : "swojego sklepu w świecie"}{" "}
                          w świecie Renovace!
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
}
