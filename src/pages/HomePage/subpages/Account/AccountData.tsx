import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import CancelSubcriptionModal from "./CancelSubcriptionModal";
import { usePatchApiUsersPasswordReset } from "../../../../api/endpoints/api";
import successIcon from "../../../../assets/success-icon.svg";
import { MoonLoader } from "react-spinners";

interface AccountDataProps {
  email: string;
  connection: string;
  isPremiumRole: boolean;
  setIsPremiumRole: (value: boolean) => void;
  isLoading: boolean;
}

export default function AccountData({
  email,
  connection,
  isLoading,
  isPremiumRole,
  setIsPremiumRole,
}: AccountDataProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [confirmResetPassword, setConfirmResetPassword] =
    useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  function closeModal() {
    setOpenModal(false);
  }

  const resetPassword = usePatchApiUsersPasswordReset();

  useEffect(() => {
    if (confirmResetPassword && !isSend) {
      resetPassword.mutateAsync({
        params: { email },
      });
      setIsSend(true);
    }
  }, [confirmResetPassword, isSend, email, resetPassword]);

  const metadata = [
    { name: "Email", value: email, edit: false },
    {
      name: "Hasło",
      value: "************",
      edit: connection === "google-oauth2" ? false : true,
    },

    {
      name: "Typ konta",
      value: !isPremiumRole ? "Darmowe" : "Premium",
      edit: false,
    },
  ];

  return (
    <>
      <div className="w-full  bg-background  text-brown">
        <p className="pb-12 pt-20 text-4xl font-bold lg:px-16 px-12 text-mainColorText">
          Moje dane
        </p>
        <div className="w-full h-full bg-background flex flex-col lg:flex-row justify-between place-items-center py-9 lg:pb-16 pb-12 lg:p-0  ">
          {isLoading ? (
            <div className="flex justify-center items-center h-[40vh] w-full">
              <MoonLoader size={50} color="#F0ECE6" />
            </div>
          ) : (
            <>
              <div className="pl-12 pr-12 lg:pl-16 lg:pr-8 flex flex-col w-full h-52 justify-between ">
                {metadata.slice(0, 2).map((data) => (
                  <div key={data.name} className="flex flex-col gap-3 pb-10">
                    <p className="text-lg uppercase">{data.name}</p>
                    <div className="flex flex-row justify-between">
                      <p className="text-graywhite place-content-center">
                        {connection === "google-oauth2" && data.name === "Hasło"
                          ? "Twoje konto jest połączone z Google."
                          : data.value}
                      </p>
                      {data.edit && data.name === "Hasło" && (
                        <Button
                          className="w-36 h-10 text-graywhite text-sm bg-backgroundComponents border-brown border-2 rounded-md "
                          onClick={() => setConfirmResetPassword(true)}
                        >
                          Resetuj hasło...
                        </Button>
                      )}
                    </div>
                    {confirmResetPassword && (
                      <div className="fixed inset-0 flex items-center justify-center bg-stone-900 bg-opacity-40 z-50">
                        {!isSend ? (
                          <div className="flex flex-col w-96 bg-brownlight text-background rounded-md p-5 gap-5">
                            <p className="text-center text-xl font-semibold">
                              Czy na pewno chcesz zresetować hasło?
                            </p>
                            <p className="text-center">
                              Zostanie wysłany email w celu zresetowania hasła.
                            </p>
                            <div className="flex flex-row  gap-2 place-items-center justify-center">
                              <Button
                                onClick={() => {
                                  setConfirmResetPassword(true);
                                }}
                              >
                                Resetuj
                              </Button>
                              <Button
                                onClick={() => setConfirmResetPassword(false)}
                              >
                                Nie
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex flex-col w-96 bg-brownlight text-background rounded-md p-5 gap-5 items-center">
                              <img className="w-10" src={successIcon} />
                              <p className="text-center text-xl font-semibold">
                                Email został wysłany!
                              </p>
                              <p className="text-center">
                                Sprawdź skrzynkę pocztową!
                              </p>
                              <Button
                                onClick={() => {
                                  setIsSend(false);
                                  setConfirmResetPassword(false);
                                }}
                              >
                                OK
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="pl-12 pr-12 lg:pl-16 lg:pr-8 flex flex-col w-full h-auto justify-between">
                {metadata.slice(2, 4).map((data) => (
                  <div
                    key={data.name}
                    className="flex flex-col lg:mb-28 gap-3 pb-10"
                  >
                    <p className="text-lg uppercase">{data.name}</p>
                    <div className="flex flex-row justify-between">
                      <div className="text-graywhite  place-content-center">
                        {data.value === "Premium" &&
                        data.name === "Typ konta" ? (
                          <div className="flex flex-col gap-3">
                            <p>{data.value}</p>
                            <div className="flex sm:gap-1 gap-3 sm:flex-row ">
                              <p>Chcesz zrezygnować z subskrybcji Renovace+?</p>
                              <Button
                                className="underline"
                                onClick={() => setOpenModal(true)}
                              >
                                Kliknij tutaj
                              </Button>
                            </div>
                          </div>
                        ) : (
                          data.value
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {openModal && (
        <CancelSubcriptionModal
          closeModal={closeModal}
          setIsPremiumRole={setIsPremiumRole}
        />
      )}
    </>
  );
}
