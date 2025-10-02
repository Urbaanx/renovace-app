import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetApiUsersDecoratorId,
  usePatchApiUsersUpdateMetadataDecorator,
} from "../../../../api/endpoints/api";
import Button from "../../../../components/Button/Button";
import TextInput from "../../../../components/TextInput/TextInput";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";

interface DecoratorProfileProps {
  setIsSuccess: (value: boolean) => void;
  setIsFailed: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
}

export default function DecoratorProfile({
  setIsSuccess,
  setIsFailed,
  setErrorMessage,
  setSuccessMessage,
}: DecoratorProfileProps) {
  interface DecoratorData {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    description?: string;
    region?: string;
  }
  const { user } = useAuth0();

  const { data: decoratorData, isLoading, refetch } =
    useGetApiUsersDecoratorId<DecoratorData>(user?.sub || "");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
  });

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        email: decoratorData?.email || "",
        name: decoratorData?.name || "",
        surname: decoratorData?.surname || "",
        description: decoratorData?.description || "",
      });
    }
  }, [isLoading]);

  const patchDecoratorData = usePatchApiUsersUpdateMetadataDecorator();

  const handleSubmit = () => {
    if (validateForm()) {
      patchDecoratorData.mutateAsync(
        {
          data: {
            name: formData.name,
            surname: formData.surname,
            contactPhone: decoratorData?.phone,
            description: formData.description,
            contactEmail: formData.email,
            region: decoratorData?.region,
          },
        },
        {
          onSuccess: () => {
            setIsFailed(false);
            setSuccessMessage("Profil zaktualizowany.");
            setIsSuccess(true);
            refetch();
          },
          onError: (error) => {
            setErrorMessage("Wystąpił błąd! Spróbuj ponownie później");
            setIsFailed(true);
            console.error("Update metadata error:", error);
          },
        }
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if ((name === "name" || name === "surname") && /\d/.test(value)) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors: any = {};

    if (!formData.name) {
      formIsValid = false;
      newErrors.name = "Imię jest wymagane";
    } else if (/\d/.test(formData.name)) {
      formIsValid = false;
      newErrors.name = "Imię nie może zawierać cyfr";
    }

    if (!formData.surname) {
      formIsValid = false;
      newErrors.surname = "surname jest wymagane";
    } else if (/\d/.test(formData.surname)) {
      formIsValid = false;
      newErrors.surname = "surname nie może zawierać cyfr";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col w-full min-h-screen px-14 pt-10 text-background bg-graybrown items-center justify-center gap-5">
          <MoonLoader />
          <p className="text-xl pl-3">Ładowanie...</p>
        </div>
      ) : (
        <motion.div
          className="flex flex-col w-full min-h-screen px-14 pt-10 text-background bg-graybrown"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.6 }}
        >
          <p className="text-xl font-bold">Zbuduj zaufanie</p>
          <p className="text-md  text-wrap w-2/3 mt-3">
            Uzupełnij swoje dane, dodaj portfolio, opisz swój styl i
            doświadczenie.
          </p>
          <div className="bg-graybrown">
            <ul className="flex xl:flex-row flex-col gap-3 mt-5">
              <li>
                <span className="text-sm font-semibold">
                  <span className="text-red-500">*</span>Imię
                </span>
                <TextInput
                  type="text"
                  name="name"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Imię"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs pl-1">
                    {errors.name}
                  </span>
                )}
              </li>
              <li>
                <span className="text-sm font-semibold">
                  <span className="text-red-500">*</span>Nazwisko
                </span>
                <TextInput
                  type="text"
                  name="surname"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Nazwisko"
                  value={formData.surname}
                  onChange={handleChange}
                />
                {errors.surname && (
                  <span className="text-red-500 text-xs pl-1">
                    {errors.surname}
                  </span>
                )}
              </li>
              <li>
                <span className="flex flex-row text-sm font-semibold mt-1 gap-8 ">
                  <p>Email kontaktowy: </p>
                  <p className="text-sm font-normal  text-background">
                    Opcjonalnie (Jeśli chcesz umożliwić kontakt poza aplikacją)
                  </p>
                </span>
                <input
                  type="email"
                  name="email"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs pl-1">
                    {errors.email}
                  </span>
                )}
              </li>
            </ul>
            <div className="flex flex-col mt-5 bg-graybrown">
              <span className="text-sm font-bold mt-2 pb-5">
                Krótka informacja o Twojej działalności Co oferujesz, jakie masz
                doświadczenie?
              </span>
              <textarea
                className="rounded-md border-2 border-background bg-mainColorText min-h-40 pl-2"
                placeholder="..."
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex md:flex-row flex-col mt-5 gap-10  justify-between bg-graybrown xl:pb-10 pb-4">
              <p className="w-2/3">
                Po kliknięciu przycisku “Zapisz” twoje dane będa widoczne dla
                naszych klientów. Możesz w każdej chwili wrócić tutaj i
                zaktualizować dane.
              </p>
              <Button
                className="bg-background text-mainColorText px-14 py-2 rounded shadow-md hover:bg-opacity-80 lg:h-auto lg:w-auto md:items-start items-center h-1/4"
                onClick={handleSubmit}
              >
                Zapisz
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
