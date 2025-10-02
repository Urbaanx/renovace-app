import { useEffect, useState } from "react";
import Button from "../../../../components/Button/Button";
import TextInput from "../../../../components/TextInput/TextInput";
import {
  useGetApiUsersShopId,
  usePatchApiUsersUpdateMetadataShop,
} from "../../../../api/endpoints/api";
import { useAuth0 } from "@auth0/auth0-react";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";

interface ShopProfileProps {
  setIsSuccess: (value: boolean) => void;
  setIsFailed: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
  setSuccessMessage: (value: string) => void;
}

export default function ShopProfile({
  setIsSuccess,
  setIsFailed,
  setErrorMessage,
  setSuccessMessage,
}: ShopProfileProps) {
  interface ShopData {
    shopName?: string;
    street?: string;
    city?: string;
    postalCode?: string;
    number?: string;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
  }

  const { user } = useAuth0();

  const patchShopData = usePatchApiUsersUpdateMetadataShop();

  const { data: shopData, isLoading, refetch } = useGetApiUsersShopId<ShopData>(
    user?.sub || ""
  );

  const [formData, setFormData] = useState({
    email: "",
    shopName: "",
    street: "",
    streetNumber: "",
    city: "",
    postCode: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    shopName: "",
    street: "",
    streetNumber: "",
    city: "",
    postCode: "",
  });

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        email: shopData?.email || "",
        shopName: shopData?.shopName || "",
        street: shopData?.street || "",
        streetNumber: shopData?.number || "",
        city: shopData?.city || "",
        postCode: shopData?.postalCode || "",
      });
    }
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "streetNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    if (name === "name" || name === "surname") {
      if (!/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]*$/.test(value)) return;
    }

    if (name === "street") {
      if (!/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]*$/.test(value)) return;
    }

    if (name === "city") {
      if (!/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s-]*$/.test(value)) return;
    }

    if (name === "postCode") {
      if (!/^\d{0,2}-?\d{0,3}$/.test(value)) return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {
      email: "",
      shopName: "",
      street: "",
      streetNumber: "",
      city: "",
      postCode: "",
    };
    let isValid: boolean = true;

    if (!formData.shopName) {
      formErrors.shopName = "Nazwa sklepu jest wymagana";
      isValid = false;
    }
    if (!formData.streetNumber) {
      formErrors.streetNumber = "streetNumber jest wymagany";
      isValid = false;
    }
    if (!formData.street) {
      formErrors.street = "street jest wymagana";
      isValid = false;
    }
    if (!formData.city) {
      formErrors.city = "Miejscowość jest wymagana";
      isValid = false;
    }
    if (!formData.postCode) {
      formErrors.postCode = "Kod pocztowy jest wymagany";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      patchShopData.mutateAsync(
        {
          data: {
            name: shopData?.name,
            surname: shopData?.surname,
            contactPhone: shopData?.phone,
            shopName: formData.shopName,
            street: formData.street,
            number: formData.streetNumber,
            city: formData.city,
            code: formData.postCode,
            contactEmail: formData.email,
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
            Sklepy z kompletnym profilem i ciekawym opisem są 3x częściej
            wybierane przez użytkowników aplikacji.
          </p>
          <div className="bg-graybrown">
            <ul className="flex xl:flex-row flex-col gap-3 mt-5">
              <li>
                <span className="text-sm font-semibold">
                  {" "}
                  <span className="text-red-500">*</span>Nazwa Sklepu
                </span>
                <TextInput
                  type="text"
                  name="shopName"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Nazwa Sklepu"
                  value={formData.shopName}
                  onChange={handleChange}
                />
                {errors.shopName && (
                  <span className="text-red-500 text-xs">
                    {errors.shopName}
                  </span>
                )}
              </li>
              <li>
                {" "}
                <span className="flex flex-row text-sm font-semibold mt-1 gap-8 ">
                  <p>Email: </p>
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
                  <span className="text-red-500 text-xs">{errors.email}</span>
                )}
              </li>
              <li>
                <span className="text-sm font-semibold">
                  <span className="text-red-500">*</span>Ulica
                </span>
                <TextInput
                  type="text"
                  name="street"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Ulica"
                  value={formData.street}
                  onChange={handleChange}
                />
                {errors.street && (
                  <span className="text-red-500 text-xs">{errors.street}</span>
                )}
              </li>
              <li>
                <span className="flex flex-row text-sm font-semibold mt-1">
                  <span className="text-red-500">*</span>Numer
                </span>
                <input
                  type="text"
                  name="streetNumber"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Numer"
                  value={formData.streetNumber}
                  onChange={handleChange}
                />
                {errors.streetNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.streetNumber}
                  </span>
                )}
              </li>
              <li>
                <span className="flex flex-row text-sm font-semibold mt-1">
                  <span className="text-red-500">*</span>Miejscowość
                </span>
                <input
                  type="text"
                  name="city"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="Miejscowość"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && (
                  <span className="text-red-500 text-xs">{errors.city}</span>
                )}
              </li>
              <li>
                <span className="flex flex-row text-sm font-semibold mt-1">
                  <span className="text-red-500">*</span>Kod pocztowy
                </span>
                <input
                  type="text"
                  name="postCode"
                  className="w-full h-9 rounded-md border-2 border-background bg-mainColorText mt-2  pl-3"
                  placeholder="10-123"
                  value={formData.postCode}
                  onChange={handleChange}
                />
                {errors.postCode && (
                  <span className="text-red-500 text-xs">
                    {errors.postCode}
                  </span>
                )}
              </li>
            </ul>

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
